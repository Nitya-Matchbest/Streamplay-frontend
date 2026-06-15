const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Change margin-top to -35px to move the nav up
    html = html.replace(/margin-top:\s*-20px;/g, 'margin-top: -35px;');
    // In case there is no margin-top, add it or adjust
    if (!html.includes('margin-top: -35px;')) {
        html = html.replace(/z-index:\s*100;?"?/g, 'z-index: 100; margin-top: -35px;"');
    }
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Updated ' + f);
});

// Update style.css
let css = fs.readFileSync('assets/css/style.css', 'utf8');
css = css.replace(/#streamplay-menu-new \.nav-tab/g, '.nav-tab');
css = css.replace(/\.nav-tab \{\s*color: white !important;\s*font-size: 16px;/g, '.nav-tab {\n    color: white !important;\n    font-size: 18px;');
fs.writeFileSync('assets/css/style.css', css, 'utf8');
console.log('Updated style.css');
