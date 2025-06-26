// 高级视觉特效和交互增强
class AdvancedEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallaxEffects();
        this.setupMagneticButtons();
        this.setupTextAnimations();
        this.setupScrollEffects();
        this.setupCursorTrail();
        this.setupCardTiltEffect();
        this.setupThemeTransitions();
        this.setupLoadingAnimations();
    }

    // 视差滚动效果
    setupParallaxEffects() {
        const header = document.querySelector('.header');
        const cards = document.querySelectorAll('.gallery-item');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (header) {
                header.style.transform = `translateY(${rate}px)`;
            }
            
            cards.forEach((card, index) => {
                const cardRate = scrolled * (0.1 + index * 0.02);
                card.style.transform = `translateY(${cardRate}px)`;
            });
        });
    }

    // 磁性按钮效果
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .theme-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.3;
                const moveY = y * 0.3;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    // 文字动画效果
    setupTextAnimations() {
        const title = document.querySelector('.header h1');
        const subtitle = document.querySelector('.subtitle');
        
        if (title) {
            this.typewriterEffect(title, title.textContent, 100);
        }
        
        if (subtitle) {
            setTimeout(() => {
                this.fadeInWords(subtitle);
            }, 1000);
        }
    }

    // 打字机效果
    typewriterEffect(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // 单词淡入效果
    fadeInWords(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.6s ease';
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // 滚动触发动画
    setupScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.addSparkleEffect(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
    }

    // 闪烁特效
    addSparkleEffect(element) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-effect';
                sparkle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #fff, transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleFloat 1s ease-out forwards;
                `;
                
                const rect = element.getBoundingClientRect();
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    }

    // 鼠标轨迹效果
    setupCursorTrail() {
        const trail = [];
        const trailLength = 20;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(var(--gradient-1-rgb), 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        document.addEventListener('mousemove', (e) => {
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                    dot.style.opacity = (trailLength - index) / trailLength;
                    dot.style.transform = `scale(${(trailLength - index) / trailLength})`;
                }, index * 10);
            });
        });
    }

    // 卡片倾斜效果
    setupCardTiltEffect() {
        const cards = document.querySelectorAll('.gallery-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // 主题切换动画
    setupThemeTransitions() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.createThemeRipple(button);
                this.animateThemeChange();
            });
        });
    }

    // 主题波纹效果
    createThemeRipple(button) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(var(--gradient-1-rgb), 0.3), transparent);
            transform: scale(0);
            animation: themeRipple 0.8s ease-out;
            pointer-events: none;
            z-index: 9999;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(window.innerWidth, window.innerHeight) * 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    // 主题变化动画
    animateThemeChange() {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 800);
    }

    // 加载动画增强
    setupLoadingAnimations() {
        const loadingElement = document.querySelector('.loading');
        
        if (loadingElement) {
            this.createLoadingParticles(loadingElement);
        }
    }

    // 加载粒子效果
    createLoadingParticles(container) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--gradient-1);
                border-radius: 50%;
                animation: loadingParticle 2s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            container.appendChild(particle);
        }
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes themeRipple {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes loadingParticle {
        0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.7;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 初始化高级特效
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedEffects();
});
