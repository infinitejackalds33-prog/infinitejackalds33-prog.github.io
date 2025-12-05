// ===== ОСНОВНЫЕ ПЕРЕМЕННЫЕ =====
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const skipBtn = document.getElementById('skipBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const hint1 = document.getElementById('hint1');
const hint2 = document.getElementById('hint2');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const backgroundImage = document.getElementById('backgroundImage');

// Состояния анимации
let currentStep = 0;
let isAnimating = false;
let isMusicPlaying = false;

// ===== ФУНКЦИИ УПРАВЛЕНИЯ МУЗЫКОЙ =====
function toggleMusic() {
    if (!bgMusic) return;
    
    if (isMusicPlaying) {
        bgMusic.pause();
        if (musicControl) {
            musicControl.classList.add('muted');
            musicControl.innerHTML = '🔇';
        }
    } else {
        // Попытка воспроизведения музыки
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Музыка успешно запущена
                isMusicPlaying = true;
                if (musicControl) {
                    musicControl.classList.remove('muted');
                    musicControl.innerHTML = '♫';
                }
            }).catch(error => {
                // Автовоспроизведение заблокировано
                console.log('Автовоспроизведение заблокировано:', error);
                if (musicControl) {
                    musicControl.classList.add('muted');
                    musicControl.innerHTML = '🔇';
                }
                isMusicPlaying = false;
            });
        }
    }
    isMusicPlaying = !isMusicPlaying;
}

// Инициализация музыки после загрузки страницы
function initMusic() {
    if (!bgMusic) return;
    
    // Устанавливаем громкость
    bgMusic.volume = 0.2;
    
    // Пытаемся запустить музыку после взаимодействия пользователя
    document.addEventListener('click', function initMusicOnInteraction() {
        if (!isMusicPlaying && bgMusic) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    if (musicControl) {
                        musicControl.classList.remove('muted');
                        musicControl.innerHTML = '♫';
                    }
                }).catch(error => {
                    console.log('Автовоспроизведение заблокировано:', error);
                    if (musicControl) {
                        musicControl.classList.add('muted');
                        musicControl.innerHTML = '🔇';
                    }
                    isMusicPlaying = false;
                });
            }
        }
        // Удаляем обработчик после первого клика
        document.removeEventListener('click', initMusicOnInteraction);
    });
}

// ===== ФУНКЦИИ ОБРАБОТКИ ОШИБОК =====
function handleImageError(img) {
    console.error('Ошибка загрузки изображения:', img.src);
    img.style.display = 'none';
    
    const fallback = document.createElement('div');
    fallback.style.width = '100%';
    fallback.style.height = '100%';
    fallback.style.background = 'rgba(255,255,255,0.1)';
    fallback.style.borderRadius = img.classList.contains('avatar') ? '50%' : '0';
    fallback.style.display = 'flex';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.style.color = 'white';
    fallback.style.fontSize = '12px';
    fallback.textContent = 'IMG';
    
    img.parentNode.appendChild(fallback);
}

function handleBackgroundError() {
    console.error('Ошибка загрузки фонового изображения Media/Stars.jpg');
    if (!backgroundImage) return;
    
    // Создаем звездный фон через CSS как запасной вариант
    backgroundImage.style.background = 'radial-gradient(circle at center, #001122 0%, #000011 50%, #000000 100%)';
    backgroundImage.innerHTML = '';
    
    // Создаем звезды через JavaScript
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        backgroundImage.appendChild(star);
    }
    
    // Добавляем анимацию мерцания
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ===== ФУНКЦИИ АНИМАЦИИ =====
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }
        
        element.innerHTML = '';
        element.classList.add('typing');
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                resolve();
            }
        }
        type();
    });
}

function animatePassword(element, count = 6, speed = 200) {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }
        
        element.innerHTML = 'Password: <span class="password-stars"></span>';
        const starsContainer = element.querySelector('.password-stars');
        if (!starsContainer) {
            resolve();
            return;
        }
        
        starsContainer.innerHTML = '';
        
        let i = 0;
        function addStar() {
            if (i < count) {
                const star = document.createElement('span');
                star.className = 'password-star';
                star.textContent = '*';
                star.style.animationDelay = `${i * 100}ms`;
                starsContainer.appendChild(star);
                i++;
                setTimeout(addStar, speed);
            } else {
                resolve();
            }
        }
        addStar();
    });
}

// ===== СТЕПЕНИ АНИМАЦИИ ЗАГРУЗКИ =====
async function step1() {
    if (isAnimating) return;
    isAnimating = true;
    
    await typeWriter(line1, "Sudo Login MurkoLiveVT", 70);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Показываем вторую подсказку
    if (hint2) {
        hint2.style.display = 'block';
    }
    currentStep = 1;
    isAnimating = false;
}

async function step2() {
    if (isAnimating) return;
    isAnimating = true;
    
    await animatePassword(line2, 6, 150);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Показываем прогресс-бар
    if (progressBar) {
        progressBar.style.opacity = '1';
    }
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    // Ждем завершения анимации прогресс-бара
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // ПЛАВНЫЙ ПЕРЕХОД С АНИМАЦИЕЙ ЗАТУХАНИЯ
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.classList.add('smooth-appear');
                }, 50);
            }
        }, 1200);
    }
    
    currentStep = 2;
    isAnimating = false;
}

// ===== ОБРАБОТЧИКИ ВЗАИМОДЕЙСТВИЯ =====
function handleInteraction() {
    if (isAnimating) return;
    
    if (currentStep === 0) {
        // Первый клик - убираем первую подсказку и начинаем первую анимации
        if (hint1) {
            hint1.style.opacity = '0';
            setTimeout(() => {
                hint1.style.display = 'none';
                step1();
            }, 500);
        }
    } else if (currentStep === 1) {
        // Второй клик - убираем вторую подсказку и начинаем вторую анимацию
        if (hint2) {
            hint2.style.opacity = '0';
            setTimeout(() => {
                hint2.style.display = 'none';
                step2();
            }, 500);
        }
    }
}

function skipAnimation() {
    if (isAnimating) return;
    
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.classList.add('smooth-appear');
                }, 50);
            }
        }, 600);
    }
}

// ===== ПАСХАЛКИ =====
function showRickroll() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
}

function handleMobileEasterEgg() {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
}

// ===== ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
function preloadImages() {
    const imageUrls = [
        'Media/MurkoLive.jpg',
        'Media/Stars.jpg',
        'Media/Telegram.png', 
        'Media/YouTube.png',
        'Media/Twitch.png',
        'Media/TikTok.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onerror = () => console.error(`Ошибка загрузки изображения: ${url}`);
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ СЛУЧАЙНЫХ ЧАСТИЦ =====
function initParticles() {
    document.querySelectorAll('.particle').forEach(particle => {
        const randomX = (Math.random() - 0.5) * 60;
        const randomY = (Math.random() - 0.5) * 60;
        const randomScale = 0.8 + Math.random() * 1.2;
        const randomDelay = Math.random() * 0.3;
        
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        particle.style.transitionDelay = `${randomDelay}s`;
    });
}

// ===== ОБРАБОТЧИКИ ОШИБОК ИЗОБРАЖЕНИЙ =====
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            img.onerror = function() {
                handleImageError(this);
            };
        }
    });
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function init() {
    // Обработчики событий
    document.addEventListener('keydown', handleInteraction);
    
    if (loadingScreen) {
        loadingScreen.addEventListener('click', handleInteraction);
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', skipAnimation);
    }
    
    if (musicControl) {
        musicControl.addEventListener('click', toggleMusic);
    }

    // Инициализация после загрузки страницы
    window.addEventListener('load', function() {
        if (bgMusic) {
            initMusic();
        }
        preloadImages();
        initParticles();
        initImageErrorHandling();
        
        // Проверяем загрузку фонового изображения
        if (backgroundImage) {
            const bgImg = new Image();
            bgImg.src = 'Media/Stars.jpg';
            bgImg.onload = function() {
                console.log('Фоновое изображение успешно загружено');
            };
            bgImg.onerror = handleBackgroundError;
        }
    });
}

// Запускаем инициализацию
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== МОДУЛЬ АРХИВА ФОТОГРАФИЙ =====
const archive = (function() {
    // Конфигурация
    const TOTAL_PHOTOS = 91;
    const PHOTOS_PATH = 'Media/MurkoArchive/';
    
    // Состояние
    let currentPhotos = [];
    let currentModalIndex = 0;
    let loadedCount = 0;
    
    // DOM элементы
    let photosGrid, photoCounter, modalOverlay, modalImage, modalCaption;
    
    // ===== ОСНОВНЫЕ ФУНКЦИИ =====
    
    // Инициализация архива
    function init() {
        console.log('Инициализация архива фотографий...');
        
        // Находим DOM элементы
        photosGrid = document.getElementById('photosGrid');
        photoCounter = document.getElementById('photoCounter');
        modalOverlay = document.getElementById('modalOverlay');
        modalImage = document.getElementById('modalImage');
        modalCaption = document.getElementById('modalCaption');
        
        // Загружаем фотографии
        loadPhotos();
        
        // Назначаем обработчики клавиш
        document.addEventListener('keydown', handleKeydown);
        
        // Закрытие по клику на оверлей
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });
        }
        
        console.log('Архив инициализирован');
    }
    
    // Загрузка фотографий
    function loadPhotos() {
        if (!photosGrid) return;
        
        // Очищаем сетку
        photosGrid.innerHTML = '';
        currentPhotos = [];
        loadedCount = 0;
        
        // Создаем элементы для каждой фотографии
        for (let i = 1; i <= TOTAL_PHOTOS; i++) {
            createPhotoElement(i);
        }
    }
    
    // Создание элемента фотографии
    function createPhotoElement(index) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.dataset.index = index - 1;
        
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = `Фотография MurkoLiveVT №${index}`;
        
        // Обработка загрузки
        img.onload = function() {
            loadedCount++;
            updatePhotoCounter();
            
            // Добавляем анимацию появления
            photoItem.style.opacity = '0';
            photoItem.style.transform = 'translateY(20px)';
            setTimeout(() => {
                photoItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                photoItem.style.opacity = '1';
                photoItem.style.transform = 'translateY(0)';
            }, 50);
        };
        
        // Обработка ошибок
        img.onerror = function() {
            // Пробуем другие расширения
            const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
            let extIndex = 1;
            
            function tryNextExtension() {
                if (extIndex < extensions.length) {
                    img.src = `${PHOTOS_PATH}${index}${extensions[extIndex]}`;
                    extIndex++;
                } else {
                    // Заглушка если фото не найдено
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMxMTExMTEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+0J7RiNC40LHQutCwINC60LDQttC00L7QvDwvdGV4dD48L3N2Zz4=';
                    loadedCount++;
                    updatePhotoCounter();
                }
            }
            
            img.onerror = tryNextExtension;
            tryNextExtension();
        };
        
        // Устанавливаем источник
        img.src = `${PHOTOS_PATH}${index}.jpg`;
        
        // Номер фото
        const number = document.createElement('div');
        number.className = 'photo-number';
        number.textContent = index;
        
        // Клик для открытия
        photoItem.onclick = function() {
            openModal(index - 1);
        };
        
        // Собираем элемент
        photoItem.appendChild(img);
        photoItem.appendChild(number);
        photosGrid.appendChild(photoItem);
        currentPhotos.push(photoItem);
    }
    
    // Обновление счетчика
    function updatePhotoCounter() {
        if (!photoCounter) return;
        
        photoCounter.textContent = `Загружено: ${loadedCount} из ${TOTAL_PHOTOS} фото`;
        
        if (loadedCount === TOTAL_PHOTOS) {
            photoCounter.style.color = 'var(--neon-green)';
            photoCounter.innerHTML = `✅ Все ${TOTAL_PHOTOS} фотографий загружены!`;
        }
    }
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    
    function openModal(index) {
        currentModalIndex = index;
        
        if (!modalOverlay || !modalImage || !modalCaption) return;
        
        // Показываем фото
        modalImage.src = `${PHOTOS_PATH}${index + 1}.jpg`;
        modalImage.alt = `Фотография MurkoLiveVT №${index + 1}`;
        modalCaption.textContent = `Фото ${index + 1} из ${TOTAL_PHOTOS}`;
        
        // Показываем модальное окно
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Предзагрузка соседних фото
        preloadAdjacentPhotos(index);
    }
    
    function closeModal() {
        if (!modalOverlay) return;
        
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function prevPhoto() {
        currentModalIndex = (currentModalIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
        openModal(currentModalIndex);
    }
    
    function nextPhoto() {
        currentModalIndex = (currentModalIndex + 1) % TOTAL_PHOTOS;
        openModal(currentModalIndex);
    }
    
    // Предзагрузка соседних фото для плавной навигации
    function preloadAdjacentPhotos(currentIndex) {
        const indices = [
            (currentIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS,
            (currentIndex + 1) % TOTAL_PHOTOS
        ];
        
        indices.forEach(index => {
            const img = new Image();
            img.src = `${PHOTOS_PATH}${index + 1}.jpg`;
        });
    }
    
    // ===== ОБРАБОТКА КЛАВИАТУРЫ =====
    
    function handleKeydown(e) {
        // Только если модальное окно открыто
        if (modalOverlay && modalOverlay.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    prevPhoto();
                    break;
                case 'ArrowRight':
                    nextPhoto();
                    break;
            }
        }
    }
    
    // ===== ПУБЛИЧНЫЙ ИНТЕРФЕЙС =====
    return {
        init: init,
        openModal: openModal,
        closeModal: closeModal,
        prevPhoto: prevPhoto,
        nextPhoto: nextPhoto
    };
})();

// ===== ГЛОБАЛЬНЫЙ ДОСТУП К ФУНКЦИЯМ АРХИВА =====
// (для вызова из HTML onclick)
window.archive = archive;