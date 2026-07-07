const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/assets\/images\/streamplay-logo-transparent\.png/g, 'assets/images/9 1.png');
  fs.writeFileSync(f, content);
});
console.log('Logos replaced successfully in all HTML files.');
