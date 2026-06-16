const fs = require('fs');
const files = ['index.html', 'pricing.html', 'blogs.html', 'blog-detail.html', 'testimonials.html', 'contact.html'];
const svgIcon = `<i><svg xmlns="http://www.w3.org/2000/svg" width="6.531" height="11.457" viewBox="0 0 6.531 11.457"><g id="arrow-down-sign-to-navigate" transform="translate(-97.141 11.457) rotate(-90)"><path id="Path_155693" data-name="Path 155693" d="M5.729,103.671a.8.8,0,0,1-.567-.235L.236,98.51A.8.8,0,1,1,1.37,97.375l4.359,4.359,4.359-4.359a.8.8,0,0,1,1.134,1.135L6.3,103.436A.8.8,0,0,1,5.729,103.671Z" transform="translate(0)" fill="#fff"></path></g></svg></i>`;

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace big arrow SVG in Request Demo button context
    html = html.replace(/(<a[^>]*>)(\s*Request Demo\s*)<svg class="arroww"[\s\S]*?<\/svg>([\s\n]*<\/a>)/gi, (match, p1, p2, p3) => {
        return `${p1}${p2}${svgIcon}${p3}`;
    });
    // Replace another big arrow shape without class arroww if present
    html = html.replace(/(<a[^>]*>)(\s*Request Demo\s*)<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="23\.091" height="17" viewBox="0 0 23\.091 17">[\s\S]*?<\/svg>([\s\n]*<\/a>)/gi, (match, p1, p2, p3) => {
        return `${p1}${p2}${svgIcon}${p3}`;
    });

    fs.writeFileSync(file, html);
});
