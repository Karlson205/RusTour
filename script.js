document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const menuClose = document.getElementById('menuClose');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    
    menuBtn.addEventListener('click', function() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    menuClose.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Animate menu button
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
// JavaScript для работы фильтрации
document.addEventListener('DOMContentLoaded', function() {
    // Элементы фильтрации
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortSelect = document.querySelector('.sort-select');
    const routeCards = document.querySelectorAll('.route-card');
    
    // Обработчики для кнопок фильтра
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterTabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            filterRoutes(filterValue);
        });
    });
    
    // Обработчик для сортировки
    sortSelect.addEventListener('change', function() {
        sortRoutes(this.value);
    });
    
    // Функция фильтрации маршрутов
    function filterRoutes(filter) {
        routeCards.forEach(card => {
            const cardType = card.dataset.type; // data-type="culture" у карточки
            
            if (filter === 'all' || cardType === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Функция сортировки маршрутов
    function sortRoutes(sortBy) {
        const container = document.querySelector('.routes-grid');
        const cards = Array.from(routeCards);
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'price-asc':
                    return getPrice(a) - getPrice(b);
                case 'price-desc':
                    return getPrice(b) - getPrice(a);
                case 'duration':
                    return getDuration(a) - getDuration(b);
                default:
                    return 0; // По популярности (исходный порядок)
            }
        });
        
        // Перезаписываем карточки в новом порядке
        cards.forEach(card => container.appendChild(card));
    }
    
    // Вспомогательные функции
    function getPrice(card) {
        const priceText = card.querySelector('.route-price').textContent;
        return parseInt(priceText.replace(/\D/g, ''));
    }
    
    function getDuration(card) {
        const durationText = card.querySelector('.route-meta span:first-child').textContent;
        return parseInt(durationText.replace(/\D/g, ''));
    }
});
