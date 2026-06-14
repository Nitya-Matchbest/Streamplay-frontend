const fs = require('fs');

const targetFiles = [
    'pricing.html',
    'blogs.html',
    'blog-detail.html',
    'contact.html',
    'testimonials.html'
];

const indexHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '<header class="header" id="streamplay-menu-new">';
const endMarker = '<!-- Mobile Nav Menu -->';
const realEndMarker = '</header>';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(realEndMarker, startIndex) + realEndMarker.length;

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find header boundaries in index.html");
    process.exit(1);
}

const perfectHeader = indexHtml.substring(startIndex, endIndex);

targetFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`Skipping ${file}, not found.`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    const targetStart = content.indexOf(startMarker);
    const targetEnd = content.indexOf(realEndMarker, targetStart) + realEndMarker.length;
    
    if (targetStart !== -1 && targetEnd !== -1) {
        let newHeader = perfectHeader;
        
        // Remove active class from all tabs first
        newHeader = newHeader.replace(/class="nav-tab active"/g, 'class="nav-tab"');
        
        // Add active class to the correct tab
        if (file === 'pricing.html') {
            newHeader = newHeader.replace(/id="pricing-nav" class="nav-tab"/, 'id="pricing-nav" class="nav-tab active"');
        } else if (file === 'blogs.html' || file === 'blog-detail.html') {
            newHeader = newHeader.replace(/id="blog-nav" class="nav-tab"/, 'id="blog-nav" class="nav-tab active"');
        } else if (file === 'testimonials.html') {
            newHeader = newHeader.replace(/id="testimonials-nav" class="nav-tab"/, 'id="testimonials-nav" class="nav-tab active"');
        }
        
        content = content.substring(0, targetStart) + newHeader + content.substring(targetEnd);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Successfully updated ${file}`);
    } else {
        console.log(`Could not find header boundaries in ${file}`);
    }
});
