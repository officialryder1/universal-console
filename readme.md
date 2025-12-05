# Universal Console

[![npm version](https://badge.fury.io/js/universal-consolejs.svg)](https://www.npmjs.com/package/universal-consolejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight utility that lets you globally enable or disable all console.* logs at runtime.
Perfect for preventing accidental logs in production while keeping all logs fully available during development.

No more manually removing console.log() everywhere.
No more surprises in production logs.

## Features

- 🔥  **One command to disable all console logs
- 🔧 **Allow-list support (keep console.error and console.warn, etc.)
- 🎯 **Restore original console behavior anytime
- 🔄 **logOnce() — ensures a message only logs a single time
- 📦 **withConsole() — temporary console enabling inside a function block
- ⚡ **Works in Node & Browser
- 🛡️ **TypeScript** support included
- 🛠️ **Zero dependencies
- 🔧 **Includes CLI & Vite plugin skeleton


## Installation

```bash
npm install universal-consolejs
# or

yarn add universal-consolejs
# or

pnpm add universal-consolejs

## Usage

### Automatic init (NODE_ENV)
```js
import { initConsole } from 'universal-consolejs'
initConsole(); 
# will disable if NODE_ENV === 'production'

## You can override the environment manually:
initConsole({ env: "production" });   # force disable
initConsole({ env: "development" }); # force enable

### Manuel toggle

##Disable console
import { disableConsole} from "universal-consolejs";
disableConsole();
#All methods (log, info, debug, table, etc.) become no-ops.

## Allow-list some methods
disableConsole({ allow: ["error", "warn"] });

##Enable console
import { enableConsole } from "universal-consolejs";

enableConsole();
# Restores every method to its original behavior.

### LogOnce

# Guarantees a log only prints once even if called repeatedly.
import { logOnce } from "universal-consolejs";
logOnce('unique-key', 'warn', 'This prints once');

### Temporarily enable
import { withConsole } from "universal-consolejs";
await withConsole(async () => {
  console.log('visible even if disabled');
});

## Reset internal state

### Only use this for debugging library behavior.
import { resetConsoleState } from "togglable-console";

resetConsoleState();
# This clears the stored original methods and reactivates all console functionality.

### CLI
npx universal-consolejs off
npx universal-consolejs on
npx universal-consolejs reset

## How it Works

- When first imported, the library stores original console.* methods.

- When disabled, each console method is replaced with a safe no-op.

- When enabled, all original methods are restored exactly.

- Works in Node and browser environments.

- Resistant to environments that lock the console object.

## Why It Exists

Accidentally shipping debugging logs into production is extremely common.
Most devs comment them out manually… until they forget.

This package solves that issue permanently:

- You keep all your logs in development.

- They disappear in production — automatically.

- No code changes. No extra config.

# License

MIT License — free to use, modify, and contribute.