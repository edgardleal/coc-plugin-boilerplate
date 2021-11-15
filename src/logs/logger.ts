/**
 * Logger.ts
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const fileName = path.join(__dirname, '../../', 'logs.log');

const Logger = pino(fs.createWriteStream(fileName));

export default Logger;
