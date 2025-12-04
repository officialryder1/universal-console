import type { ConsoleMethod, DisableOptions, InitOptions } from "./types";
import { DEFAULT_METHODS, isBrowser, resolveEnv } from "./utils";

type ConsoleLike = Record<string, any>;

const globalConsole: ConsoleLike = (typeof console !== "undefined") ? console : (globalThis as any).console || {};

let originalConsole: Partial<ConsoleLike> | null = null;
let disabled = false;

/**
 * Save originals if not already saved
 */
function saveOriginals() {
  if (originalConsole) return;
  originalConsole = {};
  for (const m of DEFAULT_METHODS) {
    if (m in globalConsole) originalConsole[m] = globalConsole[m];
  }
}

/**
 * Replace methods with noop
 */
function applyNoop(allow: ConsoleMethod[] = []) {
  saveOriginals();
  const keep = new Set(allow || []);
  for (const m of DEFAULT_METHODS) {
    if (!keep.has(m) && m in globalConsole) {
      // assign noop in a safe way
      try {
        globalConsole[m] = () => {};
      } catch (err) {
        // some environments lock console - ignore
      }
    }
  }
  disabled = true;
}

/**
 * Restore original console methods
 */
function restoreOriginals() {
  if (!originalConsole) return;
  for (const key of Object.keys(originalConsole)) {
    try {
      (globalConsole as any)[key] = (originalConsole as any)[key];
    } catch (err) {
      // ignore
    }
  }
  disabled = false;
}

/**
 * Disable console globally. Use allow to keep some methods.
 */
export function disableConsole(options: DisableOptions = {}) {
  applyNoop(options.allow || []);
}

/**
 * Enable console globally (restores saved originals).
 */
export function enableConsole() {
  restoreOriginals();
}

/**
 * Initialize based on env heuristic
 */
export function initConsole(options: InitOptions = {}) {
  const env = resolveEnv(options.env);
  if (env === "production") {
    disableConsole(options);
  } else {
    // If we don't have originals saved yet, ensure we do (so toggles work)
    saveOriginals();
    enableConsole();
  }
}

/**
 * Return whether console is currently disabled by this library
 */
export function isDisabled() {
  return disabled;
}

/**
 * logOnce: prints a message only the first time the exact key shows up.
 * key can be string or object (we stringify)
 */
const seenKeys = new Set<string>();
export function logOnce(key: any, method: ConsoleMethod = "log", ...args: any[]) {
  let k: string;
  try {
    k = typeof key === "string" ? key : JSON.stringify(key);
  } catch {
    k = String(key);
  }
  if (seenKeys.has(k)) return;
  seenKeys.add(k);
  (originalConsole && (originalConsole[method] as any) ? (originalConsole[method] as any) : globalConsole[method])?.(...args);
}

/**
 * Temporarily enable console within an async function (works in node & browser).
 * Usage:
 * await withConsole(async () => {
 *   console.log('this runs even if console disabled');
 * }, { allow: ['error'] })
 */
export async function withConsole<T>(fn: () => Promise<T> | T, options: DisableOptions = {}): Promise<T> {
  const wasDisabled = disabled;
  const savedOriginal = originalConsole;
  try {
    // Restore originals (enable)
    if (savedOriginal) {
      restoreOriginals();
    }
    return await Promise.resolve(fn());
  } finally {
    // Re-disable if previously disabled
    if (wasDisabled) {
      applyNoop(options.allow || []);
    } else if (savedOriginal) {
      // keep originals as they were
      originalConsole = savedOriginal;
    }
  }
}

/**
 * Forcefully clear saved originals and restore to native environment console if present.
 * Use with care.
 */
export function resetConsoleState() {
  restoreOriginals();
  originalConsole = null;
  seenKeys.clear();
  disabled = false;
}
