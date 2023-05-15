import Basic from './basic';
import * as vscode from 'vscode';
import { Configs, CssBlock } from '@/types';


export default class Embedded extends Basic {
  constructor(
    document: vscode.TextDocument,
    selection: vscode.Selection | null,
    public readonly syntax: string,
    configs: Configs
  ) {
    super(document, selection, syntax, configs);
  }
}
