#!/usr/bin/env node
import { disableConsole, enableConsole, resetConsoleState } from "./index";

const arg = process.argv[2];

function showHelp() {
  console.log("togglable-console CLI");
  console.log("Usage: togglable-console [on|off|reset]");
  console.log("  on     -> enable console (restore)");
  console.log("  off    -> disable console (no-op all methods)");
  console.log("  reset  -> restore and clear internal state");
  process.exit(0);
}

if (!arg) showHelp();

if (arg === "on") {
  enableConsole();
  console.log("Console enabled by togglable-console CLI.");
  process.exit(0);
}

if (arg === "off") {
  disableConsole({ allow: ["error", "warn"] }); // safe default: keep error/warn
  console.log("Console disabled by togglable-console CLI (errors & warns preserved).");
  process.exit(0);
}

if (arg === "reset") {
  resetConsoleState();
  console.log("togglable-console state reset.");
  process.exit(0);
}

showHelp();
