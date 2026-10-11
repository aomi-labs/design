#!/usr/bin/env node
// Converts Mermaid diagrams into iso-post specs: the scene description the post template builds from.
//
//   node mermaid-to-spec.mjs a.mmd [b.mmd …] > posts.js        (one post per diagram, in order)
//
// Supports flowchart/graph (any direction; nodes, shapes, edge labels, `&`, subgraphs, classes) and
// sequenceDiagram (participants/actors and messages). Everything else in the file is ignored.
// Each node gets a column (r) and row (k) on the iso grid, an icon and a colour guessed from its words;
// each edge gets a style (pipe, dotted, fail). Review the output: shorten labels, drop nodes that don't
// carry the point, and write the headline/sub/foot before rendering.
import fs from 'node:fs';

const FAIL = /\b(fail\w*|revert\w*|error\w*|reject\w*|denied|deny|attack\w*|risk\w*|drain\w*|exploit\w*|stale|invalid|block(ed)?\b(?!chain))/i;
const OKC = /\b(ok|pass\w*|success\w*|green|valid|approved?)\b/i;
// [pattern, icon, colour]; first match wins. Colours: sky (EVM / ours / passed), grn (Solana), rose (failure), white (actors)
const RULES = [
  [FAIL, 'x', 'rose'],
  [/\b(sol(ana)?|svm|litesvm|marinade|kamino|jupiter|swig)\b/i, 'sol', 'grn'],
  [/\b(wallet|safe|vault)\b/i, 'wallet', 'white'],
  [/\b(sign\w*|key|keys|custody|tee|enclave)\b/i, 'key', 'white'],
  [/\b(user|human|you|customer|trader|person)\b/i, 'user', 'white'],
  [/\b(model|llm|agent|claude|gpt|gemini|ai|intent|prompt)\b/i, 'spark', 'white'],
  [/\b(polic\w*|guard\w*|secur\w*|permission\w*|allow\w*|limit\w*|cap)\b/i, 'shield', 'sky'],
  [/\b(pay\w*|usdc|usdt|fee\w*|price\w*|x402|bill\w*|\$)\b/i, 'dollar', 'sky'],
  [/\b(swap\w*|trade\w*|exchange|bridge\w*|route\w*)\b/i, 'swap', 'sky'],
  [/\b(simulat\w*|fork\w*|sandbox|anvil|dry.?run|rehears\w*|test\w*)\b/i, 'check', 'sky'],
  [/\b(settle\w*|receipt\w*|confirm\w*|verif\w*|commit\w*|finali\w*)\b/i, 'check', 'sky'],
  [/\b(eth(ereum)?|evm|base|arbitrum|optimism|polygon|chain|block\w*|onchain|l1|l2)\b/i, 'eth', 'sky'],
  [/\b(db|database|state|storage|cache|index\w*|registry|ledger)\b/i, 'db', 'sky'],
  [/\b(read\w*|search\w*|query|fetch\w*|lookup|context|discover\w*)\b/i, 'search', 'sky'],
  [/\b(api|tool\w*|mcp|cli|server|backend|harness|runtime|aomi|sdk|rpc|node)\b/i, 'term', 'sky'],
  [/\b(write|build\w*|encode\w*|compos\w*|stag\w*|tx|transaction\w*|calldata|bundle\w*)\b/i, 'doc', 'sky'],
];
const guess = (text, cls = '') => { if (FAIL.test(cls)) return { icon: 'x', color: 'rose' };
  for (const [re, icon, color] of RULES) if (re.test(text)) return { icon, color: OKC.test(cls) && color === 'rose' ? 'sky' : color };
  return { icon: 'doc', color: 'sky' }; };
const clean = s => (s || '').replace(/^["'`]|["'`]$/g, '').replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
const SANDBOX = /\b(fork|sandbox|simulat\w*|test\w*|rehears\w*|anvil|litesvm)\b/i;

function parseFlowchart(lines) {
  const nodes = new Map(), edges = [], groups = [], stack = [], classOf = {}, order = [];
  const node = (tok) => {
    const m = tok.trim().match(/^([A-Za-z0-9_\-.]+)\s*(\[\(|\(\(|\(\[|\[\[|\{\{|\[\/|\[\\|\[|\(|\{|>)?([\s\S]*?)(\)\]|\)\)|\]\)|\]\]|\}\}|\/\]|\\\]|\]|\)|\})?\s*(?::::(\w+))?$/);
    if (!m) return null; const [, id, open, label, , cls] = m;
    if (!nodes.has(id)) { nodes.set(id, { id, label: id, shape: 'box', group: stack.at(-1) || null }); order.push(id); }
    const n = nodes.get(id); if (open) { n.label = clean(label); n.shape = open === '[(' ? 'db' : open === '((' ? 'circle' : open === '{' ? 'decision' : 'box'; }
    if (cls) classOf[id] = cls; if (stack.length && !n.group) n.group = stack.at(-1); return id; };
  for (let raw of lines) {
    const line = raw.replace(/%%.*$/, '').trim(); if (!line) continue;
    let m;
    if ((m = line.match(/^subgraph\s+(?:([A-Za-z0-9_\-.]+)\s*)?(?:\[(.+?)\]|"(.+?)"|(.+))?$/))) { const id = m[1] || `g${groups.length}`, label = clean(m[2] || m[3] || m[4] || m[1] || ''); groups.push({ id, label }); stack.push(id); continue; }
    if (line === 'end') { stack.pop(); continue; }
    if ((m = line.match(/^class\s+([\w,\s-]+?)\s+(\w+);?$/))) { m[1].split(',').forEach(id => { classOf[id.trim()] = m[2]; }); continue; }
    if (/^(classDef|style|linkStyle|click|direction|accTitle|accDescr)\b/.test(line)) continue;
    const norm = line.replace(/;$/, '')
      .replace(/--\s+([^->|][^>|]*?)\s+-->/g, '-->|$1|').replace(/-\.\s+([^.]+?)\s+\.->/g, '-.->|$1|').replace(/==\s+([^=>]+?)\s+==>/g, '==>|$1|');
    const parts = norm.split(/\s*(<-->|-\.->|-\.-|-->|---|==>|===|--x|--o|~~~)\s*(?:\|([^|]*)\|)?\s*/);
    // parts: [nodes, op, label, nodes, op, label, nodes, …]
    let prev = parts[0].split('&').map(node).filter(Boolean);
    for (let i = 1; i < parts.length; i += 3) {
      const op = parts[i], label = clean(parts[i + 1] || ''), next = (parts[i + 2] || '').split('&').map(node).filter(Boolean);
      if (op !== '~~~') prev.forEach(a => next.forEach(b => edges.push({ from: a, to: b, label, style: op.startsWith('-.') ? 'dotted' : op === '--x' ? 'fail' : 'pipe' })));
      prev = next;
    }
  }
  // columns: longest path from the sources, ignoring edges that close a cycle
  const ids = order, out = Object.fromEntries(ids.map(i => [i, []])), seen = new Set(), onStack = new Set(), back = new Set();
  edges.forEach((e, i) => out[e.from]?.push([e.to, i]));
  const dfs = v => { seen.add(v); onStack.add(v); for (const [w, i] of out[v]) { if (onStack.has(w)) back.add(i); else if (!seen.has(w)) dfs(w); } onStack.delete(v); };
  ids.forEach(v => { if (!seen.has(v)) dfs(v); });
  const r = Object.fromEntries(ids.map(i => [i, 0]));
  for (let pass = 0; pass < ids.length; pass++) edges.forEach((e, i) => { if (!back.has(i) && r[e.to] < r[e.from] + 1) r[e.to] = r[e.from] + 1; });
  // rows: within a column, keep groups together, then first appearance
  const cols = {}; ids.forEach(i => (cols[r[i]] ||= []).push(i));
  const gi = g => (g ? groups.findIndex(x => x.id === g) : groups.length);
  const k = {}; Object.values(cols).forEach(c => { c.sort((a, b) => gi(nodes.get(a).group) - gi(nodes.get(b).group) || order.indexOf(a) - order.indexOf(b)); c.forEach((id, j) => { k[id] = j - (c.length - 1) / 2; }); });
  // a very long chain won't fit one row across the banner: fold it into a snake
  const maxR = Math.max(...ids.map(i => r[i])), chain = Object.values(cols).every(c => c.length === 1);
  if (chain && maxR >= 7) { const w = Math.ceil((maxR + 1) / 2); ids.forEach(i => { const row = Math.floor(r[i] / w), c = r[i] % w; r[i] = row % 2 ? w - 1 - c : c; k[i] = row * 1.3; }); } // fold long chains into a snake of rows
  return {
    kind: 'flow',
    nodes: ids.map(id => { const n = nodes.get(id), cls = classOf[id] || ''; return { id, label: n.label, ...guess(`${n.label} ${id} ${n.shape === 'db' ? 'db' : ''}`, cls), r: r[id], k: k[id], group: n.group }; }),
    edges: edges.map((e, i) => ({ ...e, style: e.style === 'pipe' && (FAIL.test(e.label) || /fail|error|bad/i.test(classOf[e.to] || '')) ? 'fail' : e.style, back: back.has(i) || undefined })),
    groups: groups.filter(g => ids.some(id => nodes.get(id).group === g.id)).map(g => ({ ...g, glass: SANDBOX.test(g.label) })),
  };
}

function parseSequence(lines) {
  const parts = [], msgs = [], add = (id, label) => { if (!parts.some(p => p.id === id)) parts.push({ id, label: clean(label || id) }); };
  for (let raw of lines) {
    const line = raw.replace(/%%.*$/, '').trim(); let m;
    if ((m = line.match(/^(?:participant|actor)\s+([^\s]+)(?:\s+as\s+(.+))?$/))) { add(m[1], m[2]); continue; }
    if ((m = line.match(/^([^\s\-+]+?)\s*(-{1,2}>>|-{1,2}>|-{1,2}x|-{1,2}\))\s*[+-]?\s*([^\s:]+?)\s*:\s*(.*)$/))) {
      add(m[1]); add(m[3]); const label = clean(m[4]);
      msgs.push({ from: m[1], to: m[3], label, style: m[2].endsWith('x') || FAIL.test(label) ? 'fail' : m[2].startsWith('--') ? 'dotted' : 'pipe' });
    }
  }
  return { kind: 'sequence', nodes: parts.map((p, i) => ({ id: p.id, label: p.label, ...guess(`${p.label} ${p.id}`), r: i, k: 0, group: null })), edges: msgs, groups: [] };
}

const specs = process.argv.slice(2).map(f => {
  const lines = fs.readFileSync(f, 'utf8').replace(/^```mermaid\s*|```\s*$/gm, '').split('\n'), head = lines.find(l => l.trim() && !l.trim().startsWith('%%'))?.trim() || '';
  const body = /^sequenceDiagram/.test(head) ? parseSequence(lines.slice(1)) : /^(flowchart|graph)\b/.test(head) ? parseFlowchart(lines.slice(1)) : null;
  if (!body) { console.error(`${f}: only flowchart/graph and sequenceDiagram are supported (got "${head}")`); process.exit(1); }
  if (body.nodes.length > 9) console.error(`${f}: ${body.nodes.length} nodes; a post reads best with 5–8, so collapse or drop some`);
  return { source: f, headline: 'TODO one-line headline', sub: 'TODO one mono line', foot: '', labels: true, ...body };
});
process.stdout.write(`// Post specs for iso-posts (generated by mermaid-to-spec.mjs, then edited by hand).\nwindow.POST_SPECS = ${JSON.stringify(specs, null, 2)};\n`);
