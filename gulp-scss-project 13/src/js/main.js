// Основний JavaScript файл

// Плавна прокрутка для навігаційних посилань
document.addEventListener('DOMContentLoaded', function () {
    // Отримати всі навігаційні посилання
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Додати ефекти при наведенні на картки
    const cards = document.querySelectorAll('.cartoon-card, .character-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Проста анімація для геройської секції
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';

        setTimeout(() => {
            hero.style.transition = 'all 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }

    // Повідомлення в консоль
    console.log('🎬 Сайт мультфільмів завантажено!');
});