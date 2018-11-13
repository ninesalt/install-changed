var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var exec = require('child_process').exec

// hashes a given file and returns the hex digest
const hashFile = (filepath) => {

    var hashSum = crypto.createHash('md5')
    var contents = fs.readFileSync(filepath, 'utf-8')
    var packageBlob = JSON.parse(contents)
    var interestingParts = [
        'dependencies',
        'devDependencies' ].reduce(function(acc, cur) {
            return packageBlob[cur]
                ? Object.assign(acc, packageBlob[cur])
                : acc
        }, {})
    var interestingJson = JSON.stringify(interestingParts)
    hashSum.update(new Buffer(interestingJson))

    return hashSum.digest('hex')
}

function findPackageJson() {
    var current = process.cwd()
    var last = current
    do {
        var search = path.join(current, "package.json")
        if (fs.existsSync(search)) {
            return search
        }
        last = current
        current = path.dirname(current)
    } while (current !== last)
}

// returns whether or not npm install should be executed
const watchFile = function () {

    let packagePath = findPackageJson()
    if (!packagePath) {
        console.error("Can't find package.json travelling up from current working directory")
    }
    let packageHashPath = path.join(path.dirname(packagePath), "packagehash.txt")
    let recentDigest = hashFile(packagePath)

    // if the hash file doesn't exist or if it does and the hash
    // is different
    if (!fs.existsSync(packageHashPath) || fs.readFileSync(packageHashPath, 'utf-8') !== recentDigest) {

        console.log('package.json modified. Installing...')

        exec('npm install', function callback(error, stdout, stderr) {

            if (!error) {
                fs.writeFileSync(packageHashPath, recentDigest)     // write to hash to file for future use
            }

            console.log(stdout)
            console.log(stderr)
        })

        return true
    }
    console.log('package.json not modified.')
    return false
}

module.exports = watchFile

