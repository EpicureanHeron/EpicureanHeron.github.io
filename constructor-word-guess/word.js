var letterConst = require("./letter.js")




var Word = function () {
    var letterImport = new letterConst()

    letterImport.checkLetter("AAA")

    this.wordValue = function () {
        console.log("Word function works!")
    }
}



module.exports = Word;