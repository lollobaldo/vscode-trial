import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('myExtension.sayHello', async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
      const editor = vscode.window.activeTextEditor;

      const line = editor.selection.active.line;
      const inset = vscode.window.createWebviewTextEditorInset(editor, line - 1, 10);
      inset.webview.onDidReceiveMessage(
        message => {
          vscode.window.showErrorMessage(message.id);
          return;
        },
        undefined,
        context.subscriptions
      );
      inset.onDidDispose(() => {
        console.log('WEBVIEW disposed...:(');
      });
      inset.webview.html = getWebviewContent();

      await (ms => new Promise(resolve => setTimeout(resolve, ms)))(1000);

      inset.webview.html = getWebviewContent();
      console.log(inset);
    })
  );
}

function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
  }
  
