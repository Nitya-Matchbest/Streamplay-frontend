const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let updated = false;
  
  if (h.includes('Rft3PZ85usk?autoplay=1')) {
    h = h.replace(/Rft3PZ85usk\?autoplay=1/g, 'Rft3PZ85usk?');
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(f, h);
    console.log('Updated video autoplay to false in ' + f);
  }
});
