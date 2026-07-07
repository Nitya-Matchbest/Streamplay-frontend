const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let oldStr = '<div class="nav-center" style="position: absolute; left: 45%; top: 50%; transform: translate(-50%, -50%); display: flex; gap: 30px; align-items: center; z-index: 9999; margin-top: 0px;">';
  let newStr = '<div class="nav-center" style="position: absolute; left: 52%; top: 50%; transform: translate(-50%, -50%); display: flex; gap: 30px; align-items: center; z-index: 9999; margin-top: 0px;">';
  
  if (h.includes(oldStr)) {
    h = h.replace(oldStr, newStr);
    fs.writeFileSync(f, h);
    console.log('Updated nav centering in ' + f);
  }
});
