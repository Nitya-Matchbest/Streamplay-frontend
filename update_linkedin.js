const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const newLink = '<a href="https://www.linkedin.com/company/streamplayai/" aria-label="LinkedIn" target="_blank"';

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let updated = false;
  
  if (h.includes('<a href="#" aria-label="LinkedIn"')) {
    h = h.replace(/<a href="#" aria-label="LinkedIn"/g, newLink);
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(f, h);
    console.log('Updated LinkedIn in ' + f);
  }
});
