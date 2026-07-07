const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// This regex will match the current footer bottom
const oldFooterRegex = /<div class="sp-footer-bottom">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/g;

const newFooterBottom = `        <div class="sp-footer-bottom">
            <p style="font-style: italic; font-size: 11px; color: rgba(255,255,255,0.6); margin: 0;">&copy; 2026 StreamPlay Gaming Play. All rights reserved.</p>
            <div class="sp-footer-legal" style="text-align: right; max-width: 50%;">
                <p style="font-style: italic; color: rgba(255,255,255,0.6); margin: 0; font-size: 11px;">Disclaimer: e-gaming Unit is a specialized B2B vertical of StreamPlay, built for premium OTT e-gaming delivery.</p>
            </div>
        </div>
    </div>
</footer>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.match(oldFooterRegex)) {
        content = content.replace(oldFooterRegex, newFooterBottom);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
