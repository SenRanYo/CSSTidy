import * as vscode from 'vscode';
import provider from './providers';

export function activate(context: vscode.ExtensionContext) {
	console.log('插件已激活');

	// 编辑器保存处理
	const handleOnSave = vscode.workspace.onWillSaveTextDocument((event) => {
		// 判断激活的文本编辑器对象是否存在
		if (!vscode.window.activeTextEditor) { return null; }

		const document = event.document;
		// const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

		const actions = provider(document, null).then(cssBlocks => {
			return cssBlocks?.map((cssBlock) => {
				return vscode.TextEdit.replace(cssBlock.range, cssBlock.css);
			});
		});
		event.waitUntil(actions);
	});

	context.subscriptions.push(handleOnSave);
}

// This method is called when your extension is deactivated
export function deactivate() { }
