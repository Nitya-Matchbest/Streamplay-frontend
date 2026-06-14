const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'contact.html', 'testimonials.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Check if it has jquery.min.js
    if (!html.includes('jquery.min.js')) {
        // Inject jquery before main.js
        html = html.replace(/<script src="assets\/js\/main.js/g, '<script src="https://d3p5e262x57lj.cloudfront.net/js/jquery.min.js"></script>\n    <script src="assets/js/main.js');
        fs.writeFileSync(f, html, 'utf8');
        console.log('Added jQuery to ' + f);
    } else {
        console.log('jQuery already exists in ' + f);
    }
});
