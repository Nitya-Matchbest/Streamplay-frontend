const fs = require('fs');
const files = ['index.html'];
files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace(/main.js\?v=13/g, 'main.js?v=14');
    
    // Add custom CSS for mobile scrollbar hiding if not already there
    if (!html.includes('id="features-css"')) {
        const style = `\n    <style id="features-css">
      @media (max-width: 767px) {
        #features-player-container::-webkit-scrollbar { display: none; }
        #features-player-container { -ms-overflow-style: none; scrollbar-width: none; }
      }
    </style>\n</head>`;
        html = html.replace('</head>', style);
    }
    fs.writeFileSync(f, html);
});
