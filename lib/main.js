const execSync = require('child_process').execSync
const { isPackageChanged } = require('package-changed')

// returns whether or not npm install should be executed
const watchFile = ({
  hashFilename = 'packagehash.txt',
  installCommand = 'npm install',
  isHashOnly = false
}) => {
  // if the hash file doesn't exist or if it does and the hash is different
  const {
    hash,
    writeHash
  } = isPackageChanged({
    hashFilename
  })

  if (hash) {
    console.log('package.json has been modified.')

    if (isHashOnly) {
      console.log('Updating hash only because --hash-only is true.')
      writeHash()
      return true
    }

    console.log('Installing and updating hash.')

    try {
      execSync(
        installCommand,
        {
          stdio: 'inherit'
        }
      )
      writeHash() // write to hash to file for future use
    }
    catch (error) {
      console.log(error)
    }
    return true
  }
  console.log('package.json has not been modified.')
  return false
}

module.exports = watchFile
