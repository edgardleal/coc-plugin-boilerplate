/**
 *
 */
import { commands, CompleteResult, ExtensionContext, listManager, sources, workspace } from 'coc.nvim';
import Logger from './logs/logger';
import DemoList from './lists';
import dummyCommand from './commands/dummy-command';

export async function activate(context: ExtensionContext): Promise<void> {
  Logger.info('Starting plugin...');
  context.subscriptions.push(
    commands.registerCommand('coc-plugin.Command', async (name: string) => {
      workspace.showMessage(`coc-plugin Commands works!`);
      return name;
    }),

    commands.registerCommand('coc-plugin.test', dummyCommand),

    listManager.registerList(new DemoList(workspace.nvim)),

    sources.createSource({
      name: 'coc-plugin completion source', // unique id
      shortcut: '[CS]', // [CS] is custom source
      priority: 1,
      triggerCharacters: [':'],
      triggerPatterns: [/[\s$]:[^:]+:?/], // RegExp pattern
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      },
    }),

    workspace.registerKeymap(
      ['n'],
      'ed',
      async () => {
        const buffer = await workspace.nvim.buffer;
        buffer.append('Teste');
        workspace.showMessage(`registerKeymap`);
      },
      { sync: true, cancel: true, silent: false }
    ),
    workspace.registerAutocmd({
      pattern: 'tested',
      event: 'InsertLeave',
      request: true,
      callback: () => {
        workspace.showMessage(`registerAutocmd on InsertLeave`);
      },
    })
  );
}

async function getCompletionItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        abbr: 'tst',
        word: 'test',
      },
    ],
  };
}
