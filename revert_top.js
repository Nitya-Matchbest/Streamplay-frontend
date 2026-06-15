const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Change top: 30%; back to top: 50%;
    html = html.replace(/top:\s*30%;/g, 'top: 50%;');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Reverted top to 50% on ' + f);
});
