const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const instaSVG = `                    <a href="https://www.instagram.com/thestreamplay.ai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" aria-label="Instagram" target="_blank">
                        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="ig-bg" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#f09433"/>
                                    <stop offset="25%" stop-color="#e6683c"/>
                                    <stop offset="50%" stop-color="#dc2743"/>
                                    <stop offset="75%" stop-color="#cc2366"/>
                                    <stop offset="100%" stop-color="#bc1888"/>
                                </linearGradient>
                            </defs>
                            <rect width="24" height="24" rx="6" fill="url(#ig-bg)"/>
                            <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" stroke-width="2"/>
                            <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" stroke-width="2"/>
                            <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
                        </svg>
                    </a>
`;

files.forEach(f => {
  if (f === 'index.html') return; // already has it
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes('aria-label="LinkedIn"') && !h.includes('aria-label="Instagram"')) {
    h = h.replace('<a href="#" aria-label="LinkedIn">', instaSVG + '                    <a href="#" aria-label="LinkedIn" style="margin-left: 10px;">');
    fs.writeFileSync(f, h);
    console.log('Injected Instagram to ' + f);
  }
});
