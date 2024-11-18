const fs = require('fs')

// Read the contents of fill-time-sheet.js
const fillTimeSheetCode = fs.readFileSync('fill-time-sheet.js', 'utf8')

// Function to minify the JavaScript code
function minify(code) {
  // Remove whitespace and comments
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multiline comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim()
}

//.replace(/\n/g, '') // Remove new lines
// Format the code as a bookmarklet
const bookmarkletCode = `javascript:(function() {${minify(
  fillTimeSheetCode
)}})();`

// Write the bookmarklet code to copy-me.js
fs.writeFileSync('copy-me.js', bookmarkletCode)

// Output the bookmarklet code to the console for reference
console.log(bookmarkletCode)
