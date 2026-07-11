const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('assets/images/streamplay-icon.png')) {
        content = content.replace(/assets\/images\/streamplay-icon\.png/g, 'assets/images/Frame-1116606591.png');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
