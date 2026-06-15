const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Change margin-top to -30px as requested by user
    html = html.replace(/margin-top:\s*-35px;/g, 'margin-top: -30px;');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Reverted margin on ' + f);
});

// Revert style.css font size back to 16px
let css = fs.readFileSync('assets/css/style.css', 'utf8');
css = css.replace(/\.nav-tab \{\s*color: white !important;\s*font-size: 18px;/g, '.nav-tab {\n    color: white !important;\n    font-size: 16px;');
fs.writeFileSync('assets/css/style.css', css, 'utf8');
console.log('Reverted style.css font size');
