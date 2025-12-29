# R Debugger Watcher

A VSCode extension that helps you keep track of interactive debugger calls in your R code, to prevent interrupting runs of `source()` when you've accidentally left a call to `browser()` in the file.

## Features

- **Real-time Monitoring**: Scans your active R file for `browser()` and `options(error = recover)` calls.
- **Status Bar Indicator**:
  - **Clean**: Shows a customizable indicator (default: green "B") when no debuggers are found.
  - **Warning**: Turns red/warning color and shows the detected debugger type (e.g., `$(bug) browser()`) when found.
- **Smart Detection**: Ignores debugger calls that are commented out (lines starting with `#`).
- **Quick Navigation**: Click the status bar warning to jump directly to the first detected debugger call.

## Configuration

You can customize the appearance of the status bar item when no debuggers are detected:

- `rDebuggerWatcher.cleanStateText`: The text or icon to display (default: "B"). You can use VS Code icons like `$(check)`.
- `rDebuggerWatcher.cleanStateColor`: The color of the text/icon (default: "#55ff55").

## Requirements

- VS Code
- An R file open in the editor


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
