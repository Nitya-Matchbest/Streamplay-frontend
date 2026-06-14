const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'contact.html', 'testimonials.html'];
files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace(/<nav class="nav nav-menu" id="nav" style="display: flex !important;/g, '<nav class="nav nav-menu" id="nav" style="display: flex;');
    fs.writeFileSync(f, html, 'utf8');
    console.log('Fixed ' + f);
});
