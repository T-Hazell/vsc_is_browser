# R Debugger Watcher

A VSCode extension that helps you keep track of interactive debugger calls in your R code, to prevent interrupting runs of `source()` when you've accidentally left a call to `browser()` in the file.

## Features

- **Status Bar Indicator:**
  - Shows a small green **"B"** when your R code is clean of interactive debugger calls.
  - Changes to an **orange warning** when `browser()` or `options(error = recover)` is detected.
- **Quick Navigation:** Clicking the status bar warning jumps immediately to the first detected debugger call.
- **Lightweight:** Only activates when editing R files.

## Installation

### Option 1: Build from Source
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run compile` to build the extension.
4. Press `F5` to launch a Debug instance of VSCode with the extension active.

### Option 2: Install via VSIX
1. Install `vsce` globally: `npm install -g @vscode/vsce`
2. Package the extension: `vsce package`
3. In VSCode, go to Extensions -> "..." -> "Install from VSIX..." and select the generated file.

## Credits

This extension was built with the assistance of the Gemini CLI.
