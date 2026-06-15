const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    // Remove <section class="footer"> ... </section>
    html = html.replace(/<section class="footer">[\s\S]*?<\/section>/g, '');
    
    // Remove <footer class="blog-footer"> ... </footer>
    html = html.replace(/<footer class="blog-footer">[\s\S]*?<\/footer>/g, '');
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Cleaned old footers from ' + f);
});
