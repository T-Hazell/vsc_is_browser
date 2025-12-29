import * as vscode from 'vscode';

// Define the patterns to look for
const PATTERNS = [
    { regex: /browser\s*\(\s*\)/, label: 'browser()' },
    { regex: /options\s*\(\s*error\s*=\s*recover\s*\)/, label: 'options(error = recover)' }
];

let myStatusBarItem: vscode.StatusBarItem;
let firstMatchLine: number | null = null;

export function activate(context: vscode.ExtensionContext) {
    // Create the status bar item
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(myStatusBarItem);

    // Register the command to jump to the debugger call
    const jumpCommandId = 'rDebuggerWatcher.jumpToDebugger';
    context.subscriptions.push(vscode.commands.registerCommand(jumpCommandId, () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && firstMatchLine !== null) {
            const position = new vscode.Position(firstMatchLine, 0);
            editor.selection = new vscode.Selection(position, position);
            editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
        }
    }));

    // Register event listeners
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            updateStatusBar();
        }
    }));

    // Initial update
    updateStatusBar();
}

function updateStatusBar() {
    const editor = vscode.window.activeTextEditor;
    
    // 1. Only activate if an R file is open
    if (!editor || editor.document.languageId !== 'r') {
        myStatusBarItem.hide();
        return;
    }

    const text = editor.document.getText();
    let foundMatch = null;
    firstMatchLine = null;

    // Check for patterns
    for (const pattern of PATTERNS) {
        const match = text.match(pattern.regex);
        if (match && match.index !== undefined) {
            foundMatch = pattern;
            firstMatchLine = editor.document.positionAt(match.index).line;
            break; // Stop at first match found
        }
    }

    if (foundMatch) {
        // 3. Highlight the type of interactive debugger call
                                    myStatusBarItem.text = `$(bug) ${foundMatch.label}`;        myStatusBarItem.tooltip = "Click to jump to the debugger call";
        myStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        myStatusBarItem.color = undefined; // Reset text color to default (usually white on warning bg)
        myStatusBarItem.command = 'rDebuggerWatcher.jumpToDebugger';
    } else {
        // 2. Show a small, green B
        myStatusBarItem.text = "B";
        myStatusBarItem.tooltip = "No interactive debuggers detected";
        myStatusBarItem.backgroundColor = undefined; // Default background
        myStatusBarItem.color = '#55ff55'; // Bright Green text
        myStatusBarItem.command = undefined;
    }

    myStatusBarItem.show();
}

export function deactivate() {}
