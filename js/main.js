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
        document.body.setAttribute('data-theme', 'ghibli');
        
        // 加载主题数据
        await loadThemes();
        
        // 加载工具数据
        await loadTools();
        
        // 初始化粒子背景
        updateParticlesColor();
        
        // 设置主题切换器悬停效果
        setupThemeSwitcher();
        
        // 设置搜索功能
        setupSearch();
        
        // 初始化机器人
        initRobot();
        
        // 注释或删除以下行来禁用鼠标跟随效果
        // setupCursorEffects();
    } catch (error) {
        console.error('初始化应用失败:', error);
    }
}

// 初始化机器人
function initRobot() {
    // 移除localStorage检查，让机器人每次刷新页面都显示
    
    const robotContainer = document.getElementById('robot-container');
    const robot = document.getElementById('robot');
    const closeButton = document.getElementById('robot-close');
    const robotSpeech = document.getElementById('robot-speech');
    
    // 显示机器人
    robotContainer.style.display = 'block';
    
    // 初始位置
    const initialX = Math.random() * (window.innerWidth - 100);
    const initialY = Math.random() * (window.innerHeight - 150);
    
    robotContainer.style.left = initialX + 'px';
    robotContainer.style.top = initialY + 'px';
    
    // 显示欢迎气泡
    setTimeout(() => {
        // 重置任何可能的内联样式
        robotSpeech.style = '';
        
        // 直接显示欢迎语
        robotSpeech.classList.add('show');
        
        // 3秒后隐藏欢迎气泡
        setTimeout(() => {
            robotSpeech.classList.remove('show');
        }, 3000);
    }, 500); // 延迟500ms显示，以便机器人先出现
    
    // 机器人笑声互动
    let clickCount = 0;
    let clickTimer = null;
    let danceModeActive = false; // 用于跟踪是否处于街舞模式
    
    // 点击机器人事件处理
    robot.addEventListener('click', function() {
        // 增加点击计数
        clickCount++;
        
        // 清除旧计时器
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        
        // 移除所有现有的动画类
        robot.classList.remove(
            'laughing', 'laughing-1', 'laughing-2', 'laughing-3',
            'breakdancing', 'breakdancing-1', 'breakdancing-2', 'breakdancing-3'
        );
        
        // 简化模式逻辑：双击切换模式（第2次，第4次，第6次...）
        if (clickCount % 2 === 0) {
            // 双击切换模式
            danceModeActive = !danceModeActive;
            
            // 清除可能影响动画的内联样式
            robot.style = '';
        }
        
        console.log("点击次数:", clickCount, "街舞模式:", danceModeActive); // 调试信息
        
        // 应用适当的动画类
        if (danceModeActive) {
            // 街舞模式
            robot.classList.add('breakdancing');
            
            // 固定使用较明显的街舞级别
            robot.classList.add('breakdancing-2');
            
            // 显示街舞提示
            robotSpeech.textContent = "看我街舞！";
            robotSpeech.classList.add('show');
            setTimeout(() => {
                robotSpeech.classList.remove('show');
            }, 1500);
        } else {
            // 大笑模式
            robot.classList.add('laughing');
            
            // 根据点击次数设置笑声级别
            if (clickCount < 5) {
                robot.classList.add('laughing-1');
            } else if (clickCount < 10) {
                robot.classList.add('laughing-2');
            } else {
                robot.classList.add('laughing-3');
            }
            
            // 切换回大笑时显示提示
            if (danceModeActive === false && clickCount % 2 === 0) {
                robotSpeech.textContent = "哈哈哈！";
                robotSpeech.classList.add('show');
                setTimeout(() => {
                    robotSpeech.classList.remove('show');
                }, 1500);
            }
        }
        
        // 设置重置计时器：3秒后重置计数
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 3000);
    });
    
    // 鼠标离开时停止动画
    robot.addEventListener('mouseleave', function() {
        robot.classList.remove(
            'laughing', 'laughing-1', 'laughing-2', 'laughing-3',
            'breakdancing', 'breakdancing-1', 'breakdancing-2', 'breakdancing-3'
        );
        clickCount = 0;
        danceModeActive = false;
        if (clickTimer) {
            clearTimeout(clickTimer);
        }
    });
    
    // 机器人行走
    let walkInterval;
    
    function startWalking() {
        walkInterval = setInterval(() => {
            // 获取当前位置
            const rect = robotContainer.getBoundingClientRect();
            let currentX = rect.left;
            let currentY = rect.top;
            
            // 随机决定下一步的方向
            const directionX = Math.random() > 0.5 ? 1 : -1;
            const directionY = Math.random() > 0.5 ? 1 : -1;
            
            // 计算新位置
            let newX = currentX + (directionX * (Math.random() * 50 + 10));
            let newY = currentY + (directionY * (Math.random() * 30 + 5));
            
            // 确保机器人不会走出屏幕
            newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 120));
            
            // 设置新位置
            robotContainer.style.left = newX + 'px';
            robotContainer.style.top = newY + 'px';
            
            // 根据移动方向翻转机器人
            if (directionX < 0) {
                robot.style.transform = 'scaleX(-1)';
            } else {
                robot.style.transform = 'scaleX(1)';
            }
            
        }, 3000); // 每3秒移动一次
    }
    
    // 停止行走
    function stopWalking() {
        clearInterval(walkInterval);
    }
    
    // 开始行走
    startWalking();
    
    // 关闭按钮
    closeButton.addEventListener('click', function() {
        stopWalking();
        robotContainer.style.display = 'none';
    });
    
    // 窗口大小改变时重新定位
    window.addEventListener('resize', function() {
        const rect = robotContainer.getBoundingClientRect();
        let x = rect.left;
        let y = rect.top;
        
        // 确保机器人不会在调整窗口大小后超出屏幕范围
        x = Math.max(0, Math.min(x, window.innerWidth - 80));
        y = Math.max(0, Math.min(y, window.innerHeight - 120));
        
        robotContainer.style.left = x + 'px';
        robotContainer.style.top = y + 'px';
    });
    
    // 鼠标悬停时暂停行走
    robot.addEventListener('mouseenter', function() {
        stopWalking();
    });
    
    // 鼠标移开时继续行走
    robot.addEventListener('mouseleave', function() {
        startWalking();
    });
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
            const isActive = themeKey === 'ghibli'; // 设置Ghibli主题为默认激活
            themeButton.className = `theme-btn ${themeKey}-theme${isActive ? ' active' : ''}`;
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
        // 使用Ghibli主题作为后备方案
        document.body.setAttribute('data-theme', 'ghibli');
        // 显示错误但不阻止用户使用网站
        themesContainer.innerHTML = '<div class="theme-btn ghibli-theme active" data-theme="ghibli"></div>';
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
        
        // 按sortOrder字段排序工具列表（值越小越靠前）
        const sortedTools = [...tools].sort((a, b) => {
            // 如果没有sortOrder字段，设置一个默认的高值
            const sortOrderA = a.sortOrder !== undefined ? a.sortOrder : 1000;
            const sortOrderB = b.sortOrder !== undefined ? b.sortOrder : 1000;
            return sortOrderA - sortOrderB;
        });
        
        sortedTools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'gallery-item';
            toolCard.onclick = function(event) {
                // 防止充值按钮点击事件冒泡
                if (!event.target.classList.contains('recharge-btn')) {
                    window.open(tool.url, '_self');
                }
            };
            
            // 构建基本卡片结构
            let cardContent = `
                <img src="${tool.image}" alt="${tool.name}">
                <div class="gallery-item-content">
                    <h2>${tool.name}</h2>
                    <p>${tool.description}</p>
                    <div class="btn-container">
                        <a href="${tool.url}" target="_self" class="btn">立即使用</a>
            `;
            
            // 如果有充值选项，添加购买按钮
            if (tool.hasRecharge) {
                cardContent += `
                        <a href="${tool.rechargeUrl}" target="_self" class="btn recharge-btn">购买</a>
                `;
            }
            
            // 关闭div标签
            cardContent += `
                    </div>
                </div>
            `;
            
            toolCard.innerHTML = cardContent;
            
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

// 设置搜索功能
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // 存储所有工具数据的引用，避免重复请求
    let allTools = [];
    
    // 加载所有工具数据
    async function loadAllTools() {
        if (allTools.length === 0) {
            allTools = await window.api.getTools();
        }
        return allTools;
    }
    
    // 搜索处理函数
    async function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const toolsContainer = document.getElementById('tools-container');
        
        // 获取所有工具
        const tools = await loadAllTools();
        
        if (searchTerm === '') {
            // 如果搜索框为空，显示所有工具
            displayFilteredTools(tools);
            return;
        }
        
        // 过滤工具
        const filteredTools = tools.filter(tool => {
            return tool.name.toLowerCase().includes(searchTerm) || 
                   tool.description.toLowerCase().includes(searchTerm);
        });
        
        // 显示过滤后的工具
        displayFilteredTools(filteredTools);
    }
    
    // 显示过滤后的工具
    function displayFilteredTools(filteredTools) {
        const toolsContainer = document.getElementById('tools-container');
        
        // 清空容器
        toolsContainer.innerHTML = '';
        
        if (filteredTools.length === 0) {
            // 没有搜索结果
            toolsContainer.innerHTML = '<div class="no-results">没有找到匹配的工具，请尝试其他搜索词</div>';
            return;
        }
        
        // 按sortOrder字段排序工具列表（值越小越靠前）
        const sortedTools = [...filteredTools].sort((a, b) => {
            const sortOrderA = a.sortOrder !== undefined ? a.sortOrder : 1000;
            const sortOrderB = b.sortOrder !== undefined ? b.sortOrder : 1000;
            return sortOrderA - sortOrderB;
        });
        
        // 重置容器样式以保持一致的布局
        toolsContainer.className = 'gallery-container';
        
        // 创建并添加工具卡片
        sortedTools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'gallery-item';
            toolCard.onclick = function(event) {
                // 防止充值按钮点击事件冒泡
                if (!event.target.classList.contains('recharge-btn')) {
                    window.open(tool.url, '_self');
                }
            };
            
            // 构建基本卡片结构
            let cardContent = `
                <img src="${tool.image}" alt="${tool.name}">
                <div class="gallery-item-content">
                    <h2>${tool.name}</h2>
                    <p>${tool.description}</p>
                    <div class="btn-container">
                        <a href="${tool.url}" target="_self" class="btn">立即使用</a>
            `;
            
            // 如果有充值选项，添加购买按钮
            if (tool.hasRecharge) {
                cardContent += `
                        <a href="${tool.rechargeUrl}" target="_self" class="btn recharge-btn">购买</a>
                `;
            }
            
            // 关闭div标签
            cardContent += `
                    </div>
                </div>
            `;
            
            toolCard.innerHTML = cardContent;
            toolsContainer.appendChild(toolCard);
        });
    }
    
    // 添加事件监听器
    searchBtn.addEventListener('click', handleSearch);
    
    // 键盘输入事件（按Enter键搜索）
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    
    // 添加输入实时搜索功能，使用防抖处理
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleSearch, 300); // 300ms防抖
    });
}

// 当文档加载完成时初始化应用
document.addEventListener('DOMContentLoaded', initApp);