const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace href="..." ... onclick="openDemoModal(event)" 
    content = content.replace(/href="[^"]*"([^>]*)onclick="openDemoModal\(event\)"/g, 'href="https://demo.streamplay.ai/"$1');
    
    // Replace onclick="openDemoModal(event)" ... href="..."
    content = content.replace(/onclick="openDemoModal\(event\)"([^>]*)href="[^"]*"/g, '$1href="https://demo.streamplay.ai/"');
    
    // Also remove trailing spaces before > if any got left behind
    content = content.replace(/ \>/g, '>');

    fs.writeFileSync(file, content);
});
console.log("Done updating HTML files.");
