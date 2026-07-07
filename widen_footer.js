const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  let updated = false;
  
  if (h.includes('<div class="container" style="max-width: 1200px;">')) {
    // Only replace inside footer context if possible, but it's likely unique to footer or fine globally
    let footerIndex = h.indexOf('<footer class="sp-footer">');
    if (footerIndex !== -1) {
      let targetStr = '<div class="container" style="max-width: 1200px;">';
      let targetIndex = h.indexOf(targetStr, footerIndex);
      if (targetIndex !== -1 && targetIndex - footerIndex < 200) {
        h = h.substring(0, targetIndex) + '<div class="container" style="max-width: 1350px;">' + h.substring(targetIndex + targetStr.length);
        updated = true;
      }
    }
  }
  
  if (updated) {
    fs.writeFileSync(f, h);
    console.log('Widened footer container in ' + f);
  }
});
