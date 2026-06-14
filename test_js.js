const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('pricing.html', 'utf8');
const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable"
});

// Mock some APIs if needed
dom.window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
dom.window.matchMedia = () => ({ matches: false });
dom.window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Catch errors
dom.window.addEventListener('error', (event) => {
    console.error("JSDOM Error:", event.error);
});

try {
    const scriptEl = dom.window.document.createElement('script');
    scriptEl.textContent = mainJs;
    dom.window.document.body.appendChild(scriptEl);
    console.log("Successfully ran main.js without thrown exceptions");
} catch(e) {
    console.error("Exception thrown:", e);
}
