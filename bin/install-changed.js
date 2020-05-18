#!/usr/bin/env node

const watcher = require('../lib/main')

const optionsFromArgs = () => {
    const args = process.argv.slice(2)
    const options = {}


    for (let argIndex = 0; argIndex < args.length; argIndex++) {
        const arg = args[argIndex].split('=')
        const argName = arg[0]
        const argValue = arg.length > 0 && arg[1]
        switch (argName) {
            case '--command':
                if (argValue === false) {
                    console.warn('--command requires a value. Skipping argument...')
                }
                else {
                    options.command = argValue
                }
                break
            case '--hashFileName':
                if (argValue === false) {
                    console.warn('--hashFileName requires a value. Skipping argument...')
                }
                else {
                    options.hashFileName = argValue
                }
                break
            default:
                console.warn(`Unknown argument: '${argName}'`)
                break
        }
    }

    return options
}

watcher(optionsFromArgs())
