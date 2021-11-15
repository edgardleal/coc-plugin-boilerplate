/**
 * create-test-file-command.ts
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */
import { workspace } from 'coc.nvim';
import Logger from '../logs/logger';

const logger = Logger;

/**
 * Create a jest test file for current buffer
 */
export default async function dummyCommand(): Promise<void> {
  logger.info('dummy command');
  workspace.showMessage('dummy command');
}
