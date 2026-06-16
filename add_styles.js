const fs = require('fs');
const file = 'c:\\Users\\GCV\\Desktop\\Streamplay-frontend\\streamplay-admin\\manage-testimonials.html';
let html = fs.readFileSync(file, 'utf8');

if (!html.includes('.btn-edit { background-color')) {
    const style = `
    <style>
        .btn-edit { background-color: #3498db; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; transition: background-color 0.2s; }
        .btn-edit:hover { background-color: #2980b9; }
        .btn-delete { background-color: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; transition: background-color 0.2s; }
        .btn-delete:hover { background-color: #c0392b; }
        .btn-secondary { background-color: #95a5a6; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
        .btn-secondary:hover { background-color: #7f8c8d; }
    </style>
`;
    html = html.replace('</head>', style + '</head>');
    fs.writeFileSync(file, html, 'utf8');
}
