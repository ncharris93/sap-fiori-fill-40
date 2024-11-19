const fs = require('fs');

// Read the contents of fill-time-sheet.js
const fillTimeSheetCode = fs.readFileSync('fill-time-sheet.js', 'utf8');

// Function to minify the JavaScript code
function minify(code) {
  // Remove whitespace and comments
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multiline comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/\n/g, '') // Remove new lines
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();
}

// Write the bookmarklet code to the arc-extension
fs.writeFileSync('arc-extension/bookmarklet.js', minify(fillTimeSheetCode));

// Update the README to include the new bookmarklet code
const readmeFilePath = 'README.md';
let readmeContent = fs.readFileSync(readmeFilePath, 'utf8');

const bookmarkletCode = `javascript:(function() {${minify(
  fillTimeSheetCode
)}})();`;

// Replace everything between the ```s with the new bookmarklet code
readmeContent = readmeContent.replace(
  /```markdown\n[\s\S]*?\n```/,
  `\`\`\`markdown\n${bookmarkletCode}\n\`\`\``
);

// Write the updated README content back to the file
fs.writeFileSync(readmeFilePath, readmeContent);

// Output the bookmarklet code to the console for reference
console.log(bookmarkletCode);
