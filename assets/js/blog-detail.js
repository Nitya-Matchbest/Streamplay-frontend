// Blog Detail JavaScript
const API_BASE_URL = 'http://localhost:5000/api';
const BACKEND_URL = 'http://localhost:5000';

// Get slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (slug) {
        loadBlogDetail(slug);
    } else {
        window.location.href = 'blogs.html';
    }
});

// Load blog detail
async function loadBlogDetail(slug) {
    const articleContainer = document.getElementById('blogArticle');
    articleContainer.innerHTML = '<div class="loading">Loading article...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
            renderBlogDetail(data.data);
            renderRelatedArticles(data.data.relatedArticles);

            // Update page title and meta
            document.getElementById('pageTitle').textContent = `${data.data.title} - StreamPlay`;
            if (data.data.metaDescription) {
                document.getElementById('pageDescription').setAttribute('content', data.data.metaDescription);
            }
        } else {
            articleContainer.innerHTML = '<div class="loading">Article not found</div>';
        }
    } catch (error) {
        console.error('Error loading blog:', error);
        articleContainer.innerHTML = '<div class="loading">Failed to load article. Please try again later.</div>';
    }
}

// Helper function to get full image URL
function getImageUrl(imagePath) {
    // If path starts with /api/image/ (MongoDB GridFS)
    if (imagePath.startsWith('/api/image/')) {
        return BACKEND_URL + imagePath;
    }
    // If path starts with /uploads/ (old local storage)
    if (imagePath.startsWith('/uploads/')) {
        return BACKEND_URL + imagePath;
    }
    // If path starts with http, it's already a full URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    // Otherwise, it's a relative path (old assets)
    return imagePath;
}

// Render blog detail
function renderBlogDetail(blog) {
    const articleContainer = document.getElementById('blogArticle');
    
    const date = new Date(blog.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Render content sections
    const contentSections = blog.content.map(section => `
        <div class="article-section">
            <h2 class="section-title">${section.sectionTitle}</h2>
            <div class="section-content">
                ${section.sectionContent.split('\n').map(para => `<p>${para}</p>`).join('')}
            </div>
        </div>
    `).join('');

    const html = `
        <div class="article-header">
            <span class="article-category">${blog.category}</span>
            <h1 class="article-title">${blog.title}</h1>
            <div class="article-meta">
                <span>📅 ${date}</span>
                <span>👁️ ${blog.views} views</span>
            </div>
        </div>
        <img src="${getImageUrl(blog.featuredImage)}" alt="${blog.title}" class="article-featured-image">
        <div class="article-content">
            ${contentSections}
        </div>
    `;

    articleContainer.innerHTML = html;
}

// Render related articles
function renderRelatedArticles(relatedArticles) {
    const relatedContainer = document.getElementById('relatedArticles');
    
    if (!relatedArticles || relatedArticles.length === 0) {
        relatedContainer.innerHTML = '';
        return;
    }

    const html = `
        <h2>Related Articles</h2>
        <div class="related-grid">
            ${relatedArticles.map(article => {
                const date = new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return `
                    <div class="blog-card" onclick="window.location.href='blog-detail.html?slug=${article.slug}'">
                        <img src="${getImageUrl(article.featuredImage)}" alt="${article.title}" class="blog-card-image" loading="lazy">
                        <div class="blog-card-content">
                            <span class="blog-card-category">${article.category}</span>
                            <h3 class="blog-card-title">${article.title}</h3>
                            <p class="blog-card-excerpt">${article.excerpt}</p>
                            <div class="blog-card-date">${date}</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    relatedContainer.innerHTML = html;
}
