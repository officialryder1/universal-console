import type { Plugin } from "vite";

/**
 * Vite plugin skeleton. This does not automatically strip code.
 * You can extend this to run a simple transform (e.g., using esbuild or babel)
 * to remove console.* calls at build time.
 */
export default function togglableConsoleVitePlugin(opts: { strip?: boolean } = {}): Plugin {
  return {
    name: "togglable-console-vite",
    enforce: "post",
    transform(code, id) {
      if (!opts.strip) return null;
      if (id.includes("node_modules")) return null;
      // naive: remove console.log(...) occurrences — prefer proper AST transform in production
      const replaced = code.replace(/\bconsole\.(log|debug|info|table)\s*\(/g, "void(");
      return {
        code: replaced,
        map: null
      };
    }
  };
}
