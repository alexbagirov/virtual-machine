var fs = require('fs');
var bruteforce = require('./bruteforce');
var hashCodesSum = require('./hash-codes-sum');
var hashCodesSumOfSquares = require('./hash-codes-squared-sum');
var hashRabinKarp = require('./hash-rabin-karp');
var utilities = require('./utilities')

if (typeof process.argv[2] === 'undefined') {
    utilities.throwError('Please provide text file name', 1);
}
var textFileName = process.argv[2];
if (typeof process.argv[3] === 'undefined') {
    utilities.throwError('Please provide substring file name', 2);
}
var substringFileName = process.argv[3];

try {
    // var text = fs.readFileSync(textFileName, 'binary');
    var text = 'aaaaaa';
} catch (exception) {
    utilities.throwError('Text reading exception: ' + exception, 3);
}
try {
    // var substring = fs.readFileSync(substringFileName, 'binary');
    var substring = 'a';
} catch (exception) {
    utilities.throwError('Substring reading exception: ' + exception, 4);
}

var flags = processFlags(process.argv);

if (flags.bruteforce) {
    console.log(makeAnswer(bruteforce.search(text, substring), flags, false));
}
if (flags.hashSums) {
    console.log(makeAnswer(hashCodesSum.search(text, substring), flags, true));
}
if (flags.hashSumsOfSquares) {
    console.log(makeAnswer(hashCodesSumOfSquares.search(text, substring), flags, true));
}
if (flags.rabinKarp) {
    console.log(makeAnswer(hashRabinKarp.search(text, substring), flags, true));
}

function processFlags(arguments) {
    var flags = {
        computeTime: false,
        bruteforce: false,
        hashSums: false,
        hashSumsOfSquares: false,
        rabinKarp: false,
        numberOfResults: false
    };
    var additionalArgs = process.argv.slice(4);

    for (var i = 0; i < additionalArgs.length; i++) {
        switch (additionalArgs[i]) {
            case '-t':
                flags.computeTime = true;
                continue;
            case '-b':
                flags.bruteforce = true;
                continue;
            case '--h1':
                flags.hashSums = true;
                continue;
            case '--h2':
                flags.hashSumsOfSquares = true;
                continue;
            case '--h3':
                flags.rabinKarp = true;
                continue;
            case '-n':
                flags.numberOfResults = +additionalArgs[i + 1];
                continue;
            default:
                continue;
        }
    }

    return flags;
}

function makeAnswer(array, flags, collision) {
    var answer = '';

    if (flags.numberOfResults) {
        array[0] = array[0].slice(0, flags.numberOfResults);
    }

    answer += array[0].join(', ') + '\r\n';

    if (collision) {
        answer += 'Collisions: ' + String(array[1]) + '\r\n';
    }

    if (flags.computeTime) {
        answer += 'Time: ' + String(array[2]) + 'ms\r\n'
    }

    return answer;
}