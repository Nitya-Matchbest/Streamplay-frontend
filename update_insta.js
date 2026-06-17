const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const oldTag = '<a href="#" aria-label="Instagram">';
const newTag = '<a href="https://www.instagram.com/thestreamplay.ai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" aria-label="Instagram" target="_blank">';

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes(oldTag)) {
    h = h.replace(oldTag, newTag);
    fs.writeFileSync(f, h);
    console.log('Updated ' + f);
  }
});
