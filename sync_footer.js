const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const footerStart = '<footer class="sp-footer">';
const footerEnd = '</footer>';

const startIndex = indexHtml.indexOf(footerStart);
const endIndex = indexHtml.indexOf(footerEnd, startIndex) + footerEnd.length;

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find footer in index.html");
  process.exit(1);
}

const masterFooter = indexHtml.substring(startIndex, endIndex);
console.log("Master footer length:", masterFooter.length);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const fileStart = content.indexOf(footerStart);
  if (fileStart !== -1) {
    const fileEnd = content.indexOf(footerEnd, fileStart) + footerEnd.length;
    content = content.substring(0, fileStart) + masterFooter + content.substring(fileEnd);
    fs.writeFileSync(f, content);
    console.log("Synced footer in", f);
  } else {
    console.log("No sp-footer found in", f);
  }
});
