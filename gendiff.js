import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<first>', 'первая строка')
  .argument('<second>', 'вторая строка');

program.command('Here will be commands eventually');

program.parse();
