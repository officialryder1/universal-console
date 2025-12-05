#!/usr/bin/env node
import { disableConsole, enableConsole, resetConsoleState } from "./index";

const arg = process.argv[2];

function showHelp() {
  console.log("universal-consolejs CLI");
  console.log("Usage: universal-consolejs [on|off|reset]");
  console.log("  on     -> enable console (restore)");
  console.log("  off    -> disable console (no-op all methods)");
  console.log("  reset  -> restore and clear internal state");
  process.exit(0);
}

if (!arg) showHelp();

if (arg === "on") {
  enableConsole();
  console.log("Console enabled by universal-consolejs CLI.");
  process.exit(0);
}

if (arg === "off") {
  disableConsole({ allow: ["error", "warn"] }); // safe default: keep error/warn
  console.log("Console disabled by universal-consolejs CLI (errors & warns preserved).");
  process.exit(0);
}

if (arg === "reset") {
  resetConsoleState();
  console.log("universal-consolejs state reset.");
  process.exit(0);
}

showHelp();
