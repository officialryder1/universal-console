export type ConsoleMethod =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "debug"
  | "trace"
  | "table"
  | "group"
  | "groupCollapsed"
  | "groupEnd"
  | "time"
  | "timeEnd"
  | "assert"
  | "clear";

export interface DisableOptions {
  /**
   * Methods to keep enabled even when console is disabled.
   * Example: ['error','warn']
   */
  allow?: ConsoleMethod[];
}

export interface InitOptions extends DisableOptions {
  /**
   * Force environment (e.g., 'production'|'development'), if omitted will try common env vars.
   */
  env?: string;
}
