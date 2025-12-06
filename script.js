// ===== MURKO'S WARM CORNER - ГЛАВНЫЙ СКРИПТ =====
// Создано с заботой и теплом для самого уютного комьюнити

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

// Состояния нашего уютного уголка
let currentStep = 0;
let isAnimating = false;
let isMusicPlaying = false;
let isMusicInitialized = false;

// ===== МУЗЫКА ДЛЯ ДУШИ =====
function initMusic() {
    if (!bgMusic || isMusicInitialized) return;
    
    console.log('🎵 Настраиваем музыку для нашего уголка...');
    bgMusic.volume = 0.18; // Негромко, чтобы не мешать
    
    // Ждём, когда пользователь проявит интерес
    const initMusicOnInteraction = () => {
        if (!isMusicPlaying) {
            const playPromise = bgMusic.play();
            
            playPromise.then(() => {
                isMusicPlaying = true;
                if (musicControl) {
                    musicControl.classList.remove('muted');
                    musicControl.innerHTML = '♫';
                    musicControl.title = 'Музыка играет - в нашем уголке уютно';
                }
                console.log('🎶 Музыка зазвучала, как тёплый плед');
            }).catch(error => {
                console.log('🎧 Ждём, когда ты разрешишь музыку...');
                if (musicControl) {
                    musicControl.classList.add('muted');
                    musicControl.innerHTML = '🔇';
                    musicControl.title = 'Нажми, чтобы включить музыку';
                }
                isMusicPlaying = false;
            });
        }
        
        // Больше не слушаем каждый клик
        document.removeEventListener('click', initMusicOnInteraction);
        document.removeEventListener('keydown', initMusicOnInteraction);
        isMusicInitialized = true;
    };
    
    // Слушаем и клики, и клавиши
    document.addEventListener('click', initMusicOnInteraction);
    document.addEventListener('keydown', initMusicOnInteraction);
}

function toggleMusic() {
    if (!bgMusic) return;
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicControl.innerHTML = '🔇';
        musicControl.classList.add('muted');
        musicControl.title = 'Тихо, но всё ещё уютно';
    } else {
        bgMusic.play().then(() => {
            musicControl.innerHTML = '♫';
            musicControl.classList.remove('muted');
            musicControl.title = 'Музыка согревает наш уголок';
        }).catch(error => {
            console.log('🎧 Что-то пошло не так с музыкой...');
            musicControl.innerHTML = '❌';
            musicControl.title = 'Музыка не может играть...';
        });
    }
    
    isMusicPlaying = !isMusicPlaying;
}

// ===== ЗАБОТА О КАРТИНКАХ =====
function handleImageError(img) {
    console.warn('🖼️ Картинка потерялась по дороге:', img.src);
    
    // Создаём уютную заглушку
    const parent = img.parentNode;
    if (!parent) return;
    
    img.style.display = 'none';
    
    const fallback = document.createElement('div');
    fallback.style.width = '100%';
    fallback.style.height = '100%';
    fallback.style.background = 'linear-gradient(135deg, #001122, #003344)';
    fallback.style.borderRadius = img.classList.contains('avatar') ? '50%' : '12px';
    fallback.style.display = 'flex';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.style.color = '#88ccff';
    fallback.style.fontSize = img.classList.contains('avatar') ? '16px' : '12px';
    fallback.style.textAlign = 'center';
    fallback.style.padding = '10px';
    fallback.style.fontFamily = "'Comfortaa', cursive";
    fallback.textContent = img.classList.contains('avatar') 
        ? 'Здесь должен быть Мурко 💙' 
        : 'Картинка спряталась...';
    
    parent.appendChild(fallback);
}

function handleBackgroundError() {
    console.warn('🌌 Фоновые звёзды решили спрятаться...');
    
    if (!backgroundImage) return;
    
    // Создаём звёзды вручную - ещё уютнее!
    backgroundImage.style.background = 'radial-gradient(ellipse at center, #001122 0%, #000811 70%, #000000 100%)';
    
    // Очищаем и создаём новые звёзды
    backgroundImage.innerHTML = '';
    
    // Больше звёзд - уютнее!
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = Math.random() > 0.7 ? '#aaddff' : '#ffffff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.9 + 0.1;
        star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite alternate ${Math.random() * 2}s`;
        
        backgroundImage.appendChild(star);
    }
    
    // Добавляем анимацию мерцания
    if (!document.querySelector('#twinkle-animation')) {
        const style = document.createElement('style');
        style.id = 'twinkle-animation';
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0.5; transform: scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ВОЛШЕБНЫЕ АНИМАЦИИ =====
function typeWriter(element, text, speed = 60) {
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

function animatePassword(element, count = 6, speed = 180) {
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
                setTimeout(resolve, 500);
            }
        }
        addStar();
    });
}

// ===== ШАГИ ВХОДА В НАШ УГОЛОК =====
async function step1() {
    if (isAnimating) return;
    isAnimating = true;
    
    await typeWriter(line1, "Sudo Login MurkoliveVT", 70);
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
    await new Promise(resolve => setTimeout(resolve, 600));
    
    
    if (progressBar) {
        progressBar.style.opacity = '1';
    }
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    await new Promise(resolve => setTimeout(resolve, 1600));
    
    // Плавный переход в наш уголок
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.classList.add('smooth-appear');
                    console.log('Добро пожаловть!');
                }, 50);
            }
        }, 1200);
    }
    
    currentStep = 2;
    isAnimating = false;
}

// ===== ВЗАИМОДЕЙСТВИЕ С ЗАБОТОЙ =====
function handleInteraction() {
    if (isAnimating) return;
    
    if (currentStep === 0) {
        if (hint1) {
            hint1.style.opacity = '0';
            setTimeout(() => {
                hint1.style.display = 'none';
                step1();
            }, 400);
        }
    } else if (currentStep === 1) {
        if (hint2) {
            hint2.style.opacity = '0';
            setTimeout(() => {
                hint2.style.display = 'none';
                step2();
            }, 400);
        }
    }
}

function skipAnimation() {
    if (isAnimating) return;
    
    console.log('⏭️ Ты всегда можешь вернуться и посмотреть волшебство позже');
    
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

// ===== ТЁПЛЫЕ ПАСХАЛКИ =====
function showRickroll() {
    console.log('🎭 Кто-то нашёл нашу маленькую шутку...');
    
    // Мобильные устройства просто покажут сообщение
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        alert('Мурко гордился бы твоей наблюдательностью! 💙');
        return;
    }
    
    // На десктопе - классика
    const newWindow = window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    if (newWindow) {
        setTimeout(() => {
            newWindow.close();
            alert('Просто хотел подарить тебе улыбку! Мурко одобрил бы эту шутку 😊');
        }, 3000);
    }
}

function handleMobileEasterEgg() {
    alert('Нашёл спрятанное послание! Мурко бы улыбнулся твоей внимательности ✨');
}

// ===== ЗАБОТЛИВАЯ ПРЕДЗАГРУЗКА =====
function preloadImages() {
    const imageUrls = [
        'Media/MurkoLive.jpg',
        'Media/Stars.jpg',
        'Media/Telegram.png', 
        'Media/YouTube.png',
        'Media/Twitch.png',
        'Media/TikTok.png'
    ];
    
    let loaded = 0;
    const total = imageUrls.length;
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            loaded++;
            console.log(`🖼️ Загружено ${loaded}/${total}: ${url.split('/').pop()}`);
        };
        img.onerror = () => console.warn(`🖼️ Не удалось загрузить: ${url}`);
    });
}

// ===== ЧАСТИЦЫ ТЕПЛА =====
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    if (!particles.length) return;
    
    particles.forEach(particle => {
        const randomX = (Math.random() - 0.5) * 80;
        const randomY = (Math.random() - 0.5) * 80;
        const randomScale = 0.7 + Math.random() * 1.5;
        const randomDelay = Math.random() * 0.5;
        
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        particle.style.transitionDelay = `${randomDelay}s`;
        particle.style.opacity = '0.3';
    });
}

// ===== АРХИВ С ТЕПЛОМ И ЗАБОТОЙ =====
const archive = (function() {
    const TOTAL_PHOTOS = 91;
    const PHOTOS_PATH = 'Media/MurkoArchive/';
    
    let currentPhotos = [];
    let currentModalIndex = 0;
    let loadedCount = 0;
    
    let photosGrid, photoCounter, modalOverlay, modalImage, modalCaption;
    
    function init() {
        console.log('📸 Открываем альбом с тёплыми воспоминаниями...');
        
        photosGrid = document.getElementById('photosGrid');
        photoCounter = document.getElementById('photoCounter');
        modalOverlay = document.getElementById('modalOverlay');
        modalImage = document.getElementById('modalImage');
        modalCaption = document.getElementById('modalCaption');
        
        if (!photosGrid) {
            console.error('📸 Не нашёл сетку для фото...');
            return;
        }
        
        loadPhotos();
        
        document.addEventListener('keydown', handleKeydown);
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });
        }
        
        console.log(`📸 Альбом готов принять ${TOTAL_PHOTOS} тёплых моментов`);
    }
    
    function loadPhotos() {
        photosGrid.innerHTML = '';
        currentPhotos = [];
        loadedCount = 0;
        
        for (let i = 1; i <= TOTAL_PHOTOS; i++) {
            createPhotoElement(i);
        }
    }
    
 function createPhotoElement(index) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.dataset.index = index - 1;
    
    // Создаём placeholder сначала (серый квадрат)
    const placeholder = document.createElement('div');
    placeholder.style.width = '100%';
    placeholder.style.height = '100%';
    placeholder.style.background = 'linear-gradient(45deg, #1a2b3c, #2a3b4c)';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.color = '#6699cc';
    placeholder.style.fontSize = '14px';
    placeholder.textContent = 'Загружаю...';
    
    photoItem.appendChild(placeholder);
    
    // Создаём реальное изображение, но не загружаем сразу
    const img = new Image();
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = `Тёплый момент с Мурко №${index}`;
    
    // Когда изображение загрузится, заменяем placeholder
    img.onload = function() {
        loadedCount++;
        updatePhotoCounter();
        
        // Плавная замена placeholder на изображение
        placeholder.style.transition = 'opacity 0.5s ease';
        placeholder.style.opacity = '0';
        
        setTimeout(() => {
            placeholder.remove();
            
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '0';
            
            photoItem.appendChild(img);
            
            // Плавное появление изображения
            setTimeout(() => {
                img.style.opacity = '1';
            }, 50);
            
            // Анимация появления блока
            photoItem.style.opacity = '0';
            photoItem.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => {
                photoItem.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                photoItem.style.opacity = '1';
                photoItem.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, 300);
    };
    
    img.onerror = function() {
        // Если изображение не загрузилось, оставляем красивый placeholder
        placeholder.innerHTML = '❤️<br><small>Момент спрятался</small>';
        placeholder.style.color = '#ff6b9d';
        loadedCount++;
        updatePhotoCounter();
    };
    
    // Начинаем загрузку (ленивую)
    img.src = `${PHOTOS_PATH}${index}.png`;
    
    // Номер фото
    const number = document.createElement('div');
    number.className = 'photo-number';
    number.textContent = index;
    
    photoItem.appendChild(number);
    photoItem.onclick = () => openModal(index - 1);
    photosGrid.appendChild(photoItem);
    currentPhotos.push(photoItem);
}
    
    function getFallbackImage(number) {
        const svg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#112233"/>
            <circle cx="200" cy="150" r="60" fill="#334455"/>
            <path d="M120 280 Q200 340 280 280" stroke="#556677" stroke-width="4" fill="none"/>
            <text x="200" y="370" text-anchor="middle" fill="#88ccff" font-family="Comfortaa" font-size="22">
                Момент №${number}
            </text>
            <text x="200" y="320" text-anchor="middle" fill="#6699cc" font-family="Comfortaa" font-size="16">
                ждёт своего часа
            </text>
        </svg>`;
        return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    }
    
    function updatePhotoCounter() {
        if (!photoCounter) return;
        
        photoCounter.textContent = `Собрано воспоминаний: ${loadedCount} из ${TOTAL_PHOTOS}`;
        
        if (loadedCount === TOTAL_PHOTOS) {
            photoCounter.style.color = 'var(--neon-green)';
            photoCounter.innerHTML = `🎉 Все ${TOTAL_PHOTOS} тёплых моментов с нами!`;
        }
    }
    
    function openModal(index) {
        currentModalIndex = index;
        
        if (!modalOverlay || !modalImage || !modalCaption) return;
        
        modalImage.src = `${PHOTOS_PATH}${index + 1}.png`;
        modalImage.alt = `Тёплый момент с Мурко №${index + 1}`;
        modalCaption.textContent = `Тёплый момент ${index + 1} из ${TOTAL_PHOTOS}`;
        
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
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
    
    function preloadAdjacentPhotos(currentIndex) {
        const indices = [
            (currentIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS,
            (currentIndex + 1) % TOTAL_PHOTOS
        ];
        
        indices.forEach(index => {
            const img = new Image();
            img.src = `${PHOTOS_PATH}${index + 1}.png`;
        });
    }
    
    function handleKeydown(e) {
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
    
    return {
        init: init,
        openModal: openModal,
        closeModal: closeModal,
        prevPhoto: prevPhoto,
        nextPhoto: nextPhoto
    };
})();

// ===== НАЧАЛО НАШЕГО УЮТНОГО ПУТИ =====
function init() {
    console.log('💙 Начинаем наше тёплое путешествие...');
    
    // Заботливые обработчики
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
    
    // Когда всё загрузится
    window.addEventListener('load', function() {
        console.log('🌟 Всё готово для уютного вечера');
        
        initMusic();
        preloadImages();
        initParticles();
        
        // Проверяем фон
        if (backgroundImage) {
            const bgImg = new Image();
            bgImg.src = 'Media/Stars.jpg';
            bgImg.onload = () => console.log('🌌 Фоновые звёзды зажглись');
            bgImg.onerror = handleBackgroundError;
        }
        
        // Плавное появление
        setTimeout(() => {
            document.body.style.opacity = 1;
        }, 100);
    });
    
    // Обработка ошибок картинок
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            img.onerror = function() {
                handleImageError(this);
            };
        }
    });
}

// ===== ЗАПУСК С ЗАБОТОЙ =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== ДЕЛИМСЯ ТЕПЛОМ =====
window.archive = archive;
window.showRickroll = showRickroll;
window.handleMobileEasterEgg = handleMobileEasterEgg;
window.handleImageError = handleImageError;
console.log('💖 Весь код написан с теплом и заботой о нашем комьюнити');