const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Change z-index: 100 to z-index: 9999 for nav-center
    html = html.replace(/z-index:\s*100;/g, 'z-index: 9999;');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Bumped z-index on ' + f);
});

let css = fs.readFileSync('assets/css/style.css', 'utf8');
// Also bump z-index of .nav-tab just in case
css = css.replace(/\.nav-tab \{([\s\S]*?)z-index: 101;/g, '.nav-tab {$1z-index: 9999;');
fs.writeFileSync('assets/css/style.css', css, 'utf8');

