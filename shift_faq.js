const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find FAQ section
const faqStart = html.indexOf('<section id="faq-block"');
const faqEndStr = '</section>';
let currentSearchIdx = faqStart;
let faqEnd = -1;

// Since we know the FAQ section ends at the next </section> after its content...
// Actually, there are no nested <section> in FAQ. Let's find the first </section> after faqStart.
const firstSectionEnd = html.indexOf('</section>', faqStart);
faqEnd = firstSectionEnd + '</section>'.length;

const faqBlock = html.substring(faqStart, faqEnd);
// Remove FAQ block from original place
html = html.substring(0, faqStart) + html.substring(faqEnd);

// Find ROI section
const roiStart = html.indexOf('<!-- =========================================\r\n     ROI CALCULATOR');
// if \r\n not found, try \n
let actualRoiStart = roiStart !== -1 ? roiStart : html.indexOf('<!-- =========================================\n     ROI CALCULATOR');

const roiEndStr = '</section>';
const roiEnd = html.indexOf('</section>', html.indexOf('<section class="roi-section', actualRoiStart)) + '</section>'.length;

// Insert FAQ block after ROI section
html = html.substring(0, roiEnd) + '\n\n' + faqBlock + '\n\n' + html.substring(roiEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Shifted FAQ block after ROI block successfully!");
