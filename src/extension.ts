import * as vscode from 'vscode';
import { groupTailwindClasses } from './utils/groupTailwindClasses';

/**
	* Activates the Tailwind Classifier extension and registers its commands.
	*/
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tailwind-classifier" is now active!');

	const disposable = vscode.commands.registerCommand('tailwind-classifier.groupClasses', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			if (
				document.languageId !== 'javascript' &&
				document.languageId !== 'typescript' &&
				document.languageId !== 'javascriptreact' &&
				document.languageId !== 'typescriptreact'
			) {
				vscode.window.showErrorMessage('This extension only works with JavaScript, TypeScript, or React files.');
				return;
			}

			const text = selection.isEmpty ? document.getText() : document.getText(selection);
			const formatted = formatCode(text);

			editor.edit((editBuilder) => {
				if (selection.isEmpty) {
					const fullRange = new vscode.Range(
						document.lineAt(0).range.start,
						document.lineAt(document.lineCount - 1).range.end
					);
					editBuilder.replace(fullRange, formatted);
				} else {
					editBuilder.replace(selection, formatted);
				}
			});
		}
	});

	context.subscriptions.push(disposable);
}

/**
	* Formats the provided code by reorganizing and grouping Tailwind class names.
	* @param text The code text to format.
	* @returns The formatted code.
	*/
function formatCode(text: string): string {
	const classNameRegex = /className\s*=\s*"([^"]+)"/g;

	text = text.replace(classNameRegex, (match, classNames) => {
		const formattedClasses = groupTailwindClasses(classNames.trim());
		if (formattedClasses.length === 1) {
			return `className="${formattedClasses[0]}"`;
		}
		return `className={clsx(${formattedClasses.map(cls => `"${cls}"`).join(", ")})}`;
	});

	return text;
}

/**
	* Cleans up resources when the extension is deactivated.
	*/
export function deactivate() { }
