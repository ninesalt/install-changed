var fs = require('fs')
var crypto = require('crypto')
var exec = require('child_process').exec

// hashes a given file and returns the hex digest
const hashFile = (filepath) => {

    var hashSum = crypto.createHash('md5')
    var contents = fs.readFileSync(filepath)
    hashSum.update(contents)

    return hashSum.digest('hex')
}


// returns whether or not npm install should be executed
const watchFile = function () {

    let packagePath = __dirname + '/../../../package.json'
    let packageHashPath = __dirname + '/../../../packagehash.txt'
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
        });

        return true
    }
    console.log('package.json not modified.')
    return false
}

module.exports = watchFile

