import * as vscode from 'vscode'
import * as path from 'path'

function openImageWebview (title: string, assetPath: string, imageNames: string[]) {
  // set panel
  const viewType: string = title.replace(/\s/g, '')
  const panel = vscode.window.createWebviewPanel(viewType, title,
    vscode.ViewColumn.Active, {
      localResourceRoots: [vscode.Uri.file(assetPath)],
      enableScripts: false
    }
  )

  // set content
  let html: string = ''
  for (const imageName of imageNames) {
    const filePath = vscode.Uri.file(path.join(assetPath, imageName)).with({ scheme: 'vscode-resource' })
    html += `<img src="${filePath}" />`
  }
  panel.webview.html = html
}

export function activate (context: vscode.ExtensionContext) {
  const assetPath = path.join(context.extensionPath, 'asset')

  const vueDisposable = vscode.commands.registerCommand('extension.openVuePdf', () => {
    openImageWebview('Vue Cheatsheet Vue', assetPath, [
      'Vue-Essentials-Cheat-Sheet-1.jpg',
      'Vue-Essentials-Cheat-Sheet-2.jpg'
    ])
  })

  context.subscriptions.push(vueDisposable)
}

export function deactivate () {}
