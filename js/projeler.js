// Proje görselleri için veri yapısı
const PROJECT_IMAGE_MAP = {
    'bein-tisan': [
        'WhatsApp Image 2025-06-21 at 12.09.10.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.51.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.52.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.53.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.56.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.57.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.58.jpeg',
        'WhatsApp Image 2025-06-21 at 12.09.59.jpeg'
    ],
    'hill-garden': [
        'WhatsApp Image 2025-06-19 at 19.42.00.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.01.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.03.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.04.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.06.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.07.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.08.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.09.jpeg',
        'WhatsApp Image 2025-06-19 at 19.42.10.jpeg'
    ],
    'lotus-park': [
        'WhatsApp Image 2025-06-21 at 12.03.00.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.01.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.02.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.03.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.05.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.06.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.07.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.08.jpeg',
        'WhatsApp Image 2025-06-21 at 12.03.09.jpeg'
    ],
    'saya-house': [
        'WhatsApp Image 2025-06-19 at 19.30.54 (1)_1750355295128.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.54 (2)_1750355295129.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.54 (3)_1750355295129.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.54 (4)_1750355295129.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.54_1750355295129.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.55 (1)_1750366761589.jpeg',
        'WhatsApp Image 2025-06-19 at 19.30.55_1750355295132.jpeg',
        'WhatsApp Image 2025-06-19 at 19.34.40_1750355295131.jpeg'
    ],
    'saya-park': [
        'WhatsApp Image 2025-07-09 at 21.19.31.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.32.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.33.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.34.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.35.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.36.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.37.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.38.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.310.jpeg',
        'WhatsApp Image 2025-07-09 at 21.19.312.jpeg'
    ],
    'sezin-hanim': [
        'WhatsApp Image 2025-06-19 at 19.27.02.jpeg',
        'WhatsApp Image 2025-06-19 at 19.27.03.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.11.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.12.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.13.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.15.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.16.jpeg',
        'WhatsApp Image 2025-06-19 at 19.28.7.jpeg'
    ]
};

const PROJECT_TITLES = {
    'bein-tisan': 'Bien Tisan',
    'hill-garden': 'Hill Garden',
    'lotus-park': 'Lotus Park',
    'saya-house': 'Saya House',
    'saya-park': 'Saya Park',
    'sezin-hanim': 'Sezin Hanım'
};

let currentProject = '';
let currentImageIndex = 0;

// Klasör içindeki tüm görsel dosyalarını al
async function getProjectImages(projectName) {
    try {
        return PROJECT_IMAGE_MAP[projectName] || [];
    } catch (error) {
        console.error('Görseller yüklenirken hata:', error);
        return [];
    }
}

// Görselleri yükle
async function loadProjectImages() {
    const projects = ['bein-tisan', 'hill-garden', 'lotus-park', 'saya-house', 'saya-park', 'sezin-hanim'];
    
    for (const project of projects) {
        await loadImagesForProject(project);
    }
}

async function loadImagesForProject(projectName) {
    const gallery = document.getElementById(projectName + '-gallery');
    if (!gallery) return;
    
    const images = await getProjectImages(projectName);
    
    // İlk 4 görseli galeriye ekle
    const displayImages = images.slice(0, 4);
    
    const projectTitle = PROJECT_TITLES[projectName] || projectName;

    displayImages.forEach((imageName, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        const openHandler = () => openImageModal(projectName, index);
        galleryItem.onclick = openHandler;
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('aria-label', `${projectTitle} proje görseli ${index + 1}`);

        galleryItem.addEventListener('keypress', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openHandler();
            }
        });
        
        const img = document.createElement('img');
        img.src = `görseller/projeler/${projectName}/${imageName}`;
        img.alt = `${projectTitle} proje görseli ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        
        img.onerror = () => {
            // Görsel yüklenemezse placeholder göster
            img.src = createPlaceholder();
            img.alt = `${projectTitle} görseli yüklenemedi`;
        };
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });

    const card = gallery.closest('.project-card');
    const countElement = card?.querySelector('[data-stat="image-count"]');
    if (countElement) {
        countElement.textContent = images.length;
    }
}

function createPlaceholder() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkfDtnJzZWwgWcO8a2xlbml5b3I8L3RleHQ+PC9zdmc+';
}

function openProjectModal(projectName) {
    currentProject = projectName;
    currentImageIndex = 0;
    updateModalImage();
    document.getElementById('imageModal').style.display = 'block';
    updateModalTitle();
}

function openImageModal(projectName, imageIndex) {
    currentProject = projectName;
    currentImageIndex = imageIndex;
    updateModalImage();
    document.getElementById('imageModal').style.display = 'block';
    updateModalTitle();
}

function updateModalImage() {
    const modalImg = document.getElementById('modalImg');
    const images = PROJECT_IMAGE_MAP[currentProject];
    
    if (images && images[currentImageIndex]) {
        modalImg.src = `görseller/projeler/${currentProject}/${images[currentImageIndex]}`;
        const projectTitle = PROJECT_TITLES[currentProject] || currentProject;
        modalImg.alt = `${projectTitle} proje görseli ${currentImageIndex + 1}`;
    }
}

function changeImage(direction) {
    const images = PROJECT_IMAGE_MAP[currentProject];
    if (!images || images.length === 0) return;
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    
    updateModalImage();
    updateModalTitle();
}

// Modal kapatma
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function updateModalTitle() {
    const modalTitle = document.getElementById('modalTitle');
    if (!modalTitle) return;
    const projectTitle = PROJECT_TITLES[currentProject] || currentProject;
    modalTitle.textContent = `${projectTitle} proje galerisi`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProjectImages();
    
    // Modal kapatma event'leri
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.onclick = closeModal;
    }
    
    window.onclick = (event) => {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Klavye ile navigasyon
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('imageModal');
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') closeModal();
        }
    });
});
