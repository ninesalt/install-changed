# Install-changed

This package is a quick and easy way of figuring out whether or not `package.json` has been modified. It executes `npm install` if the file has been modified, otherwise it does nothing.

## Install

You can find this package on `npm` and can install it with `npm install install-changed`

## Usage
You can use it as follows. In your `package.json`, add a new script to run:
```
  "scripts": {
    "pre-run": "install-changed",
    "other-scripts: "whatever.js"
  },
  ```
  Then when you run `npm run pre-run` it will automatically figure out what needs to happen.


**Programatically**

```
const installChanged = require('install-changed')

const isModified = installChanged.watchPackage({
  hashFilename: '.packagehash',
  installCommand: 'npm ci'
})
```

### Options

**CLI**

install-changed --help
```
Usage: install-changed [options]

Options:
  --install-command [command]  The command to run when dependencies need to be installed/updated
  --hash-filename [filename]   Filename where hash of dependencies will be written to
  --hash-only                  Only update the hash
  -h, --help                   display help for command
```

Example
```
install-changed --hash-filename .packagehash --install-command "npm ci"
```
This will use the file `.packagehash` to store a hash of the installed dependencies and run `npm ci` instead of `npm install` when packages need to be installed / updated.

There may be some cases you just only want to update the hash. For example, when you are installing a new package you don't want the script to install the package again later. You can use the `---hash-only` for that.
