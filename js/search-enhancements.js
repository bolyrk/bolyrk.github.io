// 搜索框增强功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const placeholderElement = document.querySelector('.placeholder-text');
    const searchBtn = document.getElementById('search-btn');
    
    // 动态占位符文字轮换
    if (placeholderElement) {
        const placeholderTexts = [
            placeholderElement.getAttribute('data-text'),
            placeholderElement.getAttribute('data-alt1'),
            placeholderElement.getAttribute('data-alt2'),
            placeholderElement.getAttribute('data-alt3')
        ];
        
        let currentIndex = 0;
        
        function rotatePlaceholder() {
            if (searchInput && !searchInput.value && document.activeElement !== searchInput) {
                placeholderElement.style.opacity = '0';
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % placeholderTexts.length;
                    placeholderElement.textContent = placeholderTexts[currentIndex];
                    placeholderElement.style.opacity = '0.7';
                }, 200);
            }
        }
        
        // 每4秒轮换一次占位符
        setInterval(rotatePlaceholder, 4000);
    }
    
    // 搜索输入框焦点效果
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // 输入时隐藏占位符
        searchInput.addEventListener('input', function() {
            const placeholder = this.parentElement.querySelector('.search-placeholder');
            if (placeholder) {
                placeholder.style.opacity = this.value ? '0' : '0.7';
            }
        });
    }
    
    // 搜索按钮波纹效果
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            const ripple = this.querySelector('.search-btn-ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                setTimeout(() => {
                    ripple.style.width = '40px';
                    ripple.style.height = '40px';
                }, 10);
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 300);
            }
        });
    }
    
    // 卡片动画延迟加载
    function animateCards() {
        const cards = document.querySelectorAll('.gallery-item');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // 监听工具加载完成
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // 检查是否有新的卡片添加
                const newCards = Array.from(mutation.addedNodes).filter(node => 
                    node.classList && node.classList.contains('gallery-item')
                );
                if (newCards.length > 0) {
                    setTimeout(animateCards, 100);
                }
            }
        });
    });
    
    const container = document.getElementById('tools-container');
    if (container) {
        observer.observe(container, { childList: true });
    }
});

// 主题切换增强
function enhanceThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const previewName = document.querySelector('.theme-preview-name');
    const previewColors = document.querySelectorAll('.preview-color');
    
    if (!themeSwitcher) return;
    
    // 主题名称映射
    const themeNames = {
        'ghibli-theme': '吉卜力',
        'dark-theme': '深色',
        'blue-theme': '海洋蓝',
        'green-theme': '自然绿',
        'purple-theme': '紫色',
        'black-theme': '极简黑',
        'orange-theme': '日落橙',
        'light-theme': '纯净白'
    };
    
    themeButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const themeName = this.className.split(' ').find(cls => cls.endsWith('-theme'));
            if (themeName && previewName) {
                previewName.textContent = themeNames[themeName] || '主题预览';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (previewName) {
                previewName.textContent = '选择主题';
            }
        });
    });
}

// 页面加载动画
function initPageAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.transition = 'all 0.6s ease-out';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    });
}

// 初始化所有增强功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        enhanceThemeSwitcher();
        initPageAnimation();
    });
} else {
    enhanceThemeSwitcher();
    initPageAnimation();
}