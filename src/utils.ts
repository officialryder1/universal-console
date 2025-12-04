import type { ConsoleMethod } from "./types";

export const DEFAULT_METHODS: ConsoleMethod[] = [
  "log","info","warn","error","debug","trace",
  "table","group","groupCollapsed","groupEnd",
  "time","timeEnd","assert","clear"
];

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}

export function resolveEnv(env?: string): string | undefined {
  if (env) return env;
  // Node
  if (typeof process !== "undefined" && (process.env.NODE_ENV || (process.env as any).MODE)) {
    return process.env.NODE_ENV || (process.env as any).MODE;
  }
  // Browser common build-time flags (Vite)
  if (typeof (globalThis as any).__DEV__ !== "undefined") {
    return (globalThis as any).__DEV__ ? "development" : "production";
  }
  return undefined;
}
