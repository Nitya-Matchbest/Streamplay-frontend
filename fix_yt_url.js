const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let updated = false;
  
  if (h.includes('Rft3PZ85usk?&rel=')) {
    h = h.replace(/Rft3PZ85usk\?&rel=/g, 'Rft3PZ85usk?rel=');
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(f, h);
    console.log('Fixed malformed YouTube URL in ' + f);
  }
});
