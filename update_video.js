const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let updated = false;
  
  if (h.includes('dQw4w9WgXcQ')) {
    h = h.replace(/dQw4w9WgXcQ/g, 'Rft3PZ85usk');
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(f, h);
    console.log('Updated video in ' + f);
  }
});
