const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'contact.html', 'testimonials.html'];
files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Completely remove display: flex; from the inline style of the nav menu
    html = html.replace(/<nav class="nav nav-menu" id="nav" style="display: flex; /g, '<nav class="nav nav-menu" id="nav" style="');
    
    // Bump the CSS version to force cache refresh
    html = html.replace(/mobile-responsive.css\?v=22/g, 'mobile-responsive.css?v=23');
    html = html.replace(/mobile-responsive.css\?v=23/g, 'mobile-responsive.css?v=24');
    html = html.replace(/style.css\?v=6/g, 'style.css?v=7');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Fixed ' + f);
});
