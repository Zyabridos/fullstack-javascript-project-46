// @ts-check
/* eslint-disable no-console */

import { program } from 'commander';

const join = (first, second, connector = '') => `${first}${connector}${second}`;

program
  .name('string-util')
  .description('Инструмент для работы со строками')
  .version('1.0.0');

program.command('join');
//   .description('Команда соединяет две строки в одну')
//   .argument('<first>', 'первая строка')
//   .argument('<second>', 'вторая строка')
//   .option('-c, --connector <type>', 'соединительная строка', '')
//   .action((first, second, options) => {
//     // BEGIN (write your solution here)
//     console.log(join(first, second, options.connector));
//     // END
//   });

program.parse();
