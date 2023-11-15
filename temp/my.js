#!/usr/bin/env node

// file: my.js

import { program } from 'commander';

const hello = (name) => `Hello, ${name}!`;

const command = (names, lower, upper) => {
  for (const name of names) {
    const msg = hello(name);
    if (lower) {
      console.log(msg.toLowerCase());
    } else if (upper) {
      console.log(msg.toUpperCase());
    } else {
      console.log(msg);
    }
  }
};

program
  .option('-l, --lower', 'only use lowercase letters')
  .option('-u, --upper', 'only use uppercase letters')
  .parse(process.argv);

const { args } = program;
const options = program.opts();
const { lower, upper } = options;

command(args, lower, upper);
