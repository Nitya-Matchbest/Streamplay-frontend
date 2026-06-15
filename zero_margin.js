const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Change margin-top to 0px as requested by user
    html = html.replace(/margin-top:\s*-30px;/g, 'margin-top: 0px;');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Set margin-top to 0px on ' + f);
});
