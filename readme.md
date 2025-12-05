# Universal Console

[![npm version](https://badge.fury.io/js/universal-consolejs.svg)](https://www.npmjs.com/package/universal-consolejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A smart console wrapper that automatically disables console methods in production and enables them in development. Perfect for keeping your production environment clean while maintaining debugging capabilities during development.

## Features

- 🚀 **Automatic environment detection** (NODE_ENV based)
- 🔧 **Customizable configuration** per method
- 🎯 **Log levels** support (DEBUG, LOG, INFO, WARN, ERROR, NONE)
- 🔄 **Easy enable/disable** at runtime
- 📦 **Namespaced loggers** for better organization
- ⚡ **Lightweight** with zero dependencies
- 🛡️ **TypeScript** support included

## Installation

```bash
npm install universal-consolejs
# or
yarn add universal-consolejs

##Usage

### Automatic init (NODE_ENV)
```js
import { initConsole } from 'universal-consolejs'
initConsole(); # will disable if NODE_ENV === 'production'

### Manuel toggle
import { disableConsole, enableConsole } from "universal-consolejs";
disableConsole({ allow: ['error','warn'] });
enableConsole();

### LogOnce
import { logOnce } from "universal-consolejs";
logOnce('unique-key', 'warn', 'This prints once');

### Temporarily enable
import { withConsole } from "universal-consolejs";
await withConsole(async () => {
  console.log('visible even if disabled');
});

### CLI
npx universal-consolejs off
npx universal-consolejs on
npx universal-consolejs reset
