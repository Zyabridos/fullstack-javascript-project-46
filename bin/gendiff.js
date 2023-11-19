#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file');
// .action((filepath1, filepath2) => {
//   Here will be genDiffFunc eventually and hopefully
// });

program.parse();
