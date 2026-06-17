const fs = require('fs');
const path = require('path');
const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const modalHTML = `
<!-- =========================================
     VIDEO DEMO MODAL (for hero CTA)
     ========================================= -->
<div class="video-modal-overlay" id="video-modal-overlay" onclick="closeDemoModal()">
   <div class="video-modal-box" onclick="event.stopPropagation()">
      <button class="video-modal-close" onclick="closeDemoModal()" aria-label="Close video">&times;</button>
      <div class="video-modal-header">
         <span class="video-modal-tag">👁 StreamPlay Platform Overview</span>
         <h3 class="video-modal-title">See the Full Platform in 3 Minutes</h3>
         <p class="video-modal-sub">Live streaming, cloud gaming, DRM security, analytics &amp; more — all in one walkthrough.</p>
      </div>
      <div class="video-modal-embed">
         <iframe
           id="hero-demo-iframe"
           width="100%"
           height="420"
           src=""
           data-src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
           title="StreamPlay Gaming Platform Demo"
           frameborder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen>
         </iframe>
      </div>
      <div class="video-modal-footer">
         <p>Want a personalized walkthrough?</p>
         <a href="contact.html" class="video-modal-cta">Book a Live Demo with Our Team &rarr;</a>
      </div>
   </div>
</div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Inject modal if it doesn't exist
    if (!content.includes('id="video-modal-overlay"')) {
        content = content.replace('</body>', modalHTML + '\n</body>');
    }
    
    // Replace href for 'Request Demo' buttons in navbar/mobile nav
    // We target #sales-header, .mob-cta-primary
    content = content.replace(/href="contact\.html"([^>]*title="Request Demo")/g, 'href="javascript:void(0)" onclick="openDemoModal(event)"$1');
    content = content.replace(/href="contact\.html"([^>]*)>(\s*)Request Demo/g, 'href="javascript:void(0)" onclick="openDemoModal(event)"$1>$2Request Demo');
    
    fs.writeFileSync(file, content);
});
console.log('Done');
