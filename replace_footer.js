const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newFooterBottom = `        <div class="sp-footer-bottom">
            <p>&copy; 2026 StreamPlay Drama Play. All rights reserved.</p>
            <div class="sp-footer-legal">
                <p style="font-style: italic; color: rgba(255,255,255,0.6); margin: 0;">Disclaimer: Drama Unit is a specialized B2B vertical of StreamPlay, built for premium OTT drama delivery.</p>
            </div>
        </div>
    </div>
</footer>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const regex = /<div class="sp-footer-bottom">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/g;
  content = content.replace(regex, newFooterBottom);
  fs.writeFileSync(f, content);
});

console.log('Footer updated in all HTML files.');
