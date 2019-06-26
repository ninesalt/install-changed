const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const execSync = require('child_process').execSync

// hashes a given file and returns the hex digest
const hashFile = (filepath) => {
  const hashSum = crypto.createHash('md5')
  const contents = fs.readFileSync(filepath, 'utf-8')
  const packageBlob = JSON.parse(contents)

  const dependencies = {
    dependencies: packageBlob['dependencies'] || {},
    devDependencies: packageBlob['devDependencies'] || {}
  }
  const depsJson = JSON.stringify(dependencies)
  hashSum.update(Buffer.from(depsJson))
  return hashSum.digest('hex')
}

const findPackageJson = () => {
  let current = process.cwd()
  let last = current
  do {
    const search = path.join(current, 'package.json')
    if (fs.existsSync(search)) {
      return search
    }
    last = current
    current = path.dirname(current)
  } while (current !== last)
}

// returns whether or not npm install should be executed
const watchFile = () => {
  const packagePath = findPackageJson()

  if (!packagePath) {
    console.error('Cannot find package.json. Travelling up from current working directory')
  }
  const packageHashPath = path.join(path.dirname(packagePath), 'packagehash.txt')
  const recentDigest = hashFile(packagePath)

  // if the hash file doesn't exist or if it does and the hash
  // is different
  if (!fs.existsSync(packageHashPath) || fs.readFileSync(packageHashPath, 'utf-8') !== recentDigest) {
    console.log('package.json has been modified. Installing...')

    try {
      execSync('npm install')
      fs.writeFileSync(packageHashPath, recentDigest) // write to hash to file for future use
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
