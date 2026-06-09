// Blog Listing JavaScript
const API_BASE_URL = 'https://streamplay-gaming.onrender.com/api';

let currentPage = 1;
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
    setupFilters();
});

// Load blogs from API
async function loadBlogs(page = 1, category = 'all') {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '<div class="loading">Loading articles...</div>';

    try {
        const categoryParam = category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
        const response = await fetch(`${API_BASE_URL}/blogs?page=${page}&limit=9${categoryParam}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            renderBlogs(data.data);
            renderPagination(data.currentPage, data.totalPages);
        } else {
            blogGrid.innerHTML = '<div class="loading">No articles found</div>';
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
        blogGrid.innerHTML = '<div class="loading">Failed to load articles. Please try again later.</div>';
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

// Render blog cards
function renderBlogs(blogs) {
    const blogGrid = document.getElementById('blogGrid');
    
    const html = blogs.map(blog => {
        const date = new Date(blog.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="blog-card" onclick="window.location.href='blog-detail.html?slug=${blog.slug}'">
                <img src="${getImageUrl(blog.featuredImage)}" alt="${blog.title}" class="blog-card-image" loading="lazy">
                <div class="blog-card-content">
                    <span class="blog-card-category">${blog.category}</span>
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-excerpt">${blog.excerpt}</p>
                    <div class="blog-card-date">${date}</div>
                </div>
            </div>
        `;
    }).join('');

    blogGrid.innerHTML = html;
}

// Render pagination
function renderPagination(current, total) {
    const pagination = document.getElementById('pagination');
    
    if (total <= 1) {
        pagination.innerHTML = '';
        return;
    }

    const html = `
        <button ${current <= 1 ? 'disabled' : ''} onclick="changePage(${current - 1})">Previous</button>
        <span class="page-info">Page ${current} of ${total}</span>
        <button ${current >= total ? 'disabled' : ''} onclick="changePage(${current + 1})">Next</button>
    `;

    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    currentPage = page;
    loadBlogs(page, currentCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and load blogs
            const category = button.getAttribute('data-category');
            currentCategory = category;
            currentPage = 1;
            loadBlogs(1, category);
        });
    });
}
