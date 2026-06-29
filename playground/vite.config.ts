import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The playground imports the design system straight from ../src so edits to
// tokens or components hot-reload instantly.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
});
