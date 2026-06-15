const fs = require('fs');
const path = require('path');

const footerHtml = `
<!-- =========================================
     GLOBAL FOOTER
     ========================================= -->
<footer class="sp-footer">
    <div class="container">
        <div class="sp-footer-top">
            <div class="sp-footer-brand">
                <a href="index.html" class="footer-logo">
                    <img src="assets/images/streamplay-logo-transparent.png" alt="StreamPlay" width="160">
                </a>
                <p>The ultimate white-label platform for esports, cloud gaming, and live streaming. Own your audience and keep 100% of your revenue.</p>
                <div class="sp-footer-social">
                    <a href="#" aria-label="Twitter">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.957.567-2.016.978-3.127 1.195a4.916 4.916 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.557z"/></svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                </div>
            </div>
            
            <div class="sp-footer-links">
                <div class="sp-footer-col">
                    <h4 class="sp-footer-title">Platform</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="blogs.html">Blog</a></li>
                        <li><a href="testimonials.html">Testimonials</a></li>
                    </ul>
                </div>
                <div class="sp-footer-col">
                    <h4 class="sp-footer-title">Contact</h4>
                    <ul>
                        <li><a href="contact.html">Request Demo</a></li>
                        <li><a href="contact.html">Contact Sales</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="sp-footer-bottom">
            <p>&copy; <script>document.write(new Date().getFullYear())</script> StreamPlay. All rights reserved.</p>
            <div class="sp-footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
`;

const footerCss = `
/* =========================================
   STREAMPLAY MODERN FOOTER
   ========================================= */
.sp-footer {
    background-color: #080808;
    color: #a3a3a3;
    padding: 80px 0 30px;
    border-top: 1px solid rgba(255,255,255,0.05);
    font-family: "inter", "proxima-nova", sans-serif;
    margin-top: 60px;
    position: relative;
    z-index: 10;
}
.sp-footer-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 60px;
}
.sp-footer-brand {
    flex: 0 0 100%;
    max-width: 400px;
}
@media (min-width: 992px) {
    .sp-footer-brand {
        flex: 0 0 40%;
    }
}
.sp-footer-brand p {
    margin: 20px 0;
    line-height: 1.6;
    font-size: 15px;
    color: #a3a3a3;
}
.sp-footer-social {
    display: flex;
    gap: 15px;
}
.sp-footer-social a {
    color: #a3a3a3;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
}
.sp-footer-social a:hover {
    color: #fff;
    background: rgba(144, 19, 254, 0.8);
    transform: translateY(-3px);
}
.sp-footer-links {
    display: flex;
    flex: 1;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
}
@media (min-width: 768px) {
    .sp-footer-links {
        justify-content: flex-end;
        gap: 80px;
    }
}
.sp-footer-col {
    flex: 1;
    min-width: 140px;
}
@media (min-width: 768px) {
    .sp-footer-col {
        flex: none;
    }
}
.sp-footer-title {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 25px;
    position: relative;
    padding-bottom: 10px;
}
.sp-footer-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background: #9013fe;
}
.sp-footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.sp-footer-col ul li {
    margin-bottom: 15px;
}
.sp-footer-col ul li a {
    color: #a3a3a3;
    text-decoration: none;
    font-size: 15px;
    transition: color 0.3s ease;
}
.sp-footer-col ul li a:hover {
    color: #9013fe;
}
.sp-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 30px;
    border-top: 1px solid rgba(255,255,255,0.05);
    font-size: 14px;
    gap: 20px;
}
.sp-footer-bottom p {
    margin: 0;
}
.sp-footer-legal {
    display: flex;
    gap: 20px;
}
.sp-footer-legal a {
    color: #a3a3a3;
    text-decoration: none;
    transition: color 0.3s ease;
}
.sp-footer-legal a:hover {
    color: #fff;
}
`;

const cssPath = path.join(__dirname, 'assets', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.sp-footer')) {
    fs.appendFileSync(cssPath, '\n' + footerCss);
    console.log('Appended footer CSS to style.css');
}

const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];

files.forEach(f => {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) return;
    
    let html = fs.readFileSync(p, 'utf8');
    
    // Bump style.css cache
    html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=' + Date.now());
    
    if (!html.includes('<footer class="sp-footer">')) {
        // Find a good place to inject.
        // We will inject it right before the first occurrence of:
        // <div class="demo-popup" OR <script src="https://cdnjs OR <script src="assets/js/jquery OR <script type="application/ld+json" OR <script src="https://d3p5e262x57lj OR <script src="assets/js/main.js
        
        let injectIndex = -1;
        const searchStrings = [
            '<div class="demo-popup"',
            '<script src="https://cdnjs',
            '<script src="assets/js/jquery',
            '<script src="https://d3p5e262x57lj',
            '<script type="application/ld+json"',
            '<script src="assets/js/main.js',
            '</body>'
        ];
        
        for (let str of searchStrings) {
            const idx = html.lastIndexOf(str);
            if (idx !== -1) {
                // If it's </body>, lastIndexOf is correct.
                // But for scripts, we want the FIRST of these bottom scripts.
                // Actually, let's just use lastIndexOf to find the bottom section, then walk back to the start of that script block.
                // A simpler way: we know these scripts are at the bottom.
                // Let's just find the last occurrence of the main container or section and put it after.
            }
        }
        
        // Let's just do a regex replace to insert before the bottom script block.
        // The bottom script block usually starts with <script src="https://cdnjs or <script src="assets/js/jquery or similar.
        // Let's find the position of the last </section> or </div> before the scripts? No, that's brittle.
        
        // Let's just insert it right before the first <script tag that appears AFTER the last </section> or main content.
        // Actually, replacing '</body>' with footerHtml + '\n</body>' is safe because modals are absolute/fixed and scripts don't care!
        // But what if there are elements that rely on being the last child of body? Rarely.
        // Let's insert right before the first modal, or if no modal, before the first script at the bottom.
        
        // Let's find the index of the first bottom script.
        const bottomContentMatch = html.match(/(<div class="demo-popup"|<div class="video-modal-overlay"|<script src="https:\/\/cdnjs|<script src="assets\/js\/jquery|<script src="https:\/\/d3p5e262x57lj|<script type="application\/ld\+json"|<script src="assets\/js\/main\.js)/);
        
        if (bottomContentMatch) {
            html = html.substring(0, bottomContentMatch.index) + footerHtml + '\n' + html.substring(bottomContentMatch.index);
            fs.writeFileSync(p, html);
            console.log('Injected footer into ' + f);
        } else {
            // Fallback
            html = html.replace('</body>', footerHtml + '\n</body>');
            fs.writeFileSync(p, html);
            console.log('Injected footer into ' + f + ' (fallback)');
        }
    } else {
        console.log('Footer already exists in ' + f);
        // still update cache
        fs.writeFileSync(p, html);
    }
});
