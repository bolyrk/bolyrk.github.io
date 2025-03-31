// 初始化应用
async function initApp() {
    try {
        // 动态时间显示功能
        function updateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            document.getElementById('current-time').textContent = 
                `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
        }

        // 初始化时间并每秒更新
        updateTime();
        setInterval(updateTime, 1000);
        
        // 初始默认主题
        document.body.setAttribute('data-theme', 'dark');
        
        // 加载主题数据
        await loadThemes();
        
        // 加载工具数据
        await loadTools();
        
        // 初始化粒子背景
        updateParticlesColor();
        
        // 设置主题切换器悬停效果
        setupThemeSwitcher();
        
        // 注释或删除以下行来禁用鼠标跟随效果
        // setupCursorEffects();
    } catch (error) {
        console.error('初始化应用失败:', error);
    }
}

// 新增：设置主题切换器悬停效果的函数
function setupThemeSwitcher() {
    const themeHoverArea = document.querySelector('.theme-hover-area');
    const themeSwitcher = document.querySelector('.theme-switcher');
    
    if (themeHoverArea && themeSwitcher) {
        // 显示主题切换器的提示按钮
        const themeIndicator = document.createElement('div');
        themeIndicator.className = 'theme-indicator';
        themeHoverArea.appendChild(themeIndicator);
        
        // 添加悬停事件
        themeHoverArea.addEventListener('mouseenter', function() {
            themeSwitcher.style.transform = 'translateX(0)';
        });
        
        themeSwitcher.addEventListener('mouseleave', function() {
            themeSwitcher.style.transform = 'translateX(100%)';
        });
        
        console.log('主题切换器设置完成');
    } else {
        console.error('找不到主题切换器元素');
    }
}

// 从API加载主题数据并生成主题按钮
async function loadThemes() {
    const themesContainer = document.getElementById('theme-buttons-container');
    
    try {
        const themes = await window.api.getThemes();
        themesContainer.innerHTML = '';
        
        if (!themes || Object.keys(themes).length === 0) {
            throw new Error('没有获取到主题数据');
        }
        
        // 获取主题键名的数组
        const themeKeys = Object.keys(themes);
        
        themeKeys.forEach((themeKey, index) => {
            const theme = themes[themeKey];
            const themeButton = document.createElement('div');
            themeButton.className = `theme-btn ${themeKey}-theme${index === 0 ? ' active' : ''}`;
            themeButton.setAttribute('data-theme', themeKey);
            themesContainer.appendChild(themeButton);
            
            // 添加事件监听器
            themeButton.addEventListener('click', function() {
                // 移除所有按钮的active类
                document.querySelectorAll('.theme-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // 给当前点击的按钮添加active类
                this.classList.add('active');
                
                // 获取并设置主题
                const selectedTheme = this.getAttribute('data-theme');
                document.body.setAttribute('data-theme', selectedTheme);
                
                // 更新粒子颜色
                updateParticlesColor();
            });
            
            // 添加悬停效果显示主题名称
            themeButton.addEventListener('mouseenter', function() {
                document.querySelector('.theme-label').textContent = theme.name;
            });
        });
    } catch (error) {
        console.error('加载主题失败:', error);
        // 使用默认主题作为后备方案
        document.body.setAttribute('data-theme', 'dark');
        // 显示错误但不阻止用户使用网站
        themesContainer.innerHTML = '<div class="theme-btn dark-theme active" data-theme="dark"></div>';
        document.querySelector('.theme-label').textContent = '主题加载失败';
    }
}

// 从API加载工具数据并生成工具卡片
async function loadTools() {
    const toolsContainer = document.getElementById('tools-container');
    
    try {
        // 显示加载状态
        toolsContainer.innerHTML = '<div class="loading">加载中...</div>';
        
        const tools = await window.api.getTools();
        
        // 清除加载提示
        toolsContainer.innerHTML = '';
        
        if (!tools || tools.length === 0) {
            throw new Error('没有获取到工具数据');
        }
        
        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'gallery-item';
            toolCard.onclick = function() {
                location.href = tool.url;
            };
            
            toolCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}">
                <div class="gallery-item-content">
                    <h2>${tool.name}</h2>
                    <p>${tool.description}</p>
                    <a href="${tool.url}" class="btn">立即使用</a>
                </div>
            `;
            
            toolsContainer.appendChild(toolCard);
        });
        
        // 注释或删除以下行来禁用工具卡片的鼠标效果
        // setupCursorItemEffects();
        
    } catch (error) {
        console.error('加载工具失败:', error);
        toolsContainer.innerHTML = 
            `<div class="error">加载失败: ${error.message || '未知错误'}，请刷新页面重试</div>`;
    }
}

// 更新粒子颜色的函数
function updateParticlesColor() {
    // 获取当前主题的粒子颜色
    const computedStyle = getComputedStyle(document.documentElement);
    const particleColor = computedStyle.getPropertyValue('--particle-color').trim();

    // 重新初始化粒子系统
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: particleColor,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// 设置自定义鼠标跟随效果
function setupCursorEffects() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
}

// 为工具卡片设置悬停效果
function setupCursorItemEffects() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });

        item.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
}

// 当文档加载完成时初始化应用
document.addEventListener('DOMContentLoaded', initApp);