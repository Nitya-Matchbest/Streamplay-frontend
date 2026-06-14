const fs = require('fs');
const files = ['index.html', 'pricing.html', 'testimonials.html', 'blogs.html', 'blog-detail.html', 'contact.html'];

files.forEach(f => {
    if(!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');
    
    // Add to mobile nav
    content = content.replace(/<li><a href="blogs.html">Blog<\/a><\/li>/g, '<li><a href="blogs.html">Blog</a></li>\n         <li><a href="testimonials.html">Testimonials</a></li>');
    
    // Add to footer
    const footerReplacement = `<div class="footer-links" style="margin-bottom: 10px;">
                        <a href="blogs.html" style="color: white; text-decoration: none; margin-right: 15px;">Blog</a>
                        <a href="testimonials.html" style="color: white; text-decoration: none;">Testimonials</a>
                    </div>
                    <p> © 2026. All Rights Reserved. </p>`;
                    
    content = content.replace(/<p>\s*Â?© 2026.\s*All Rights Reserved.\s*<\/p>/g, footerReplacement);
    
    fs.writeFileSync(f, content);
    console.log(`Updated ${f}`);
});
