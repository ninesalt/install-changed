#!/usr/bin/env node

const { program } = require('commander')

const watcher = require('../lib/main')

program
  .option('--install-command [command]', 'The command to run when dependencies need to be installed/updated')
  .option('--hash-filename [filename]', 'Filename where hash of dependencies will be written to')
  .option('--hash-only', 'Only update the hash')

program.parse(process.argv)

watcher({
  installCommand: program.installCommand,
  hashFilename: program.hashFilename,
  isHashOnly: program.hashOnly
})
