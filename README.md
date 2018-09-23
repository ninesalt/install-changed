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

  You can also do this programatically:

```
let installChanged = require('install-changed')

let isModified = installChanged.watchPackage()  
```

The function above does exactly the same thing, additonally it also returns a boolean value which you might find useful.