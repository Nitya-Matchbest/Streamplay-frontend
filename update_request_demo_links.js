const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalUpdated = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /(<a[^>]*href=")https:\/\/demo\.streamplay\.ai\/("[^>]*>\s*Request Demo)/gi;
    
    if(regex.test(content)) {
        content = content.replace(regex, '$1request-demo.html$2');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
        totalUpdated++;
    }
});
console.log(`Finished updating ${totalUpdated} files.`);
