// 分辨率设置功能
class ResolutionSettings {
    constructor() {
        this.currentResolution = 'standard'; // 默认标准模式
        this.contextMenu = null;
        this.galleryContainer = null;
        this.init();
    }

    init() {
        this.contextMenu = document.getElementById('context-menu');
        this.galleryContainer = document.getElementById('tools-container');

        // 从localStorage加载保存的分辨率设置
        const savedResolution = localStorage.getItem('display-resolution');
        if (savedResolution) {
            this.currentResolution = savedResolution;
        }

        this.setupEventListeners();
        this.applyResolution(this.currentResolution);
        this.updateActiveOption();
    }

    setupEventListeners() {
        // 右键菜单事件
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        // 点击其他地方关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideContextMenu();
            }

            // Ctrl/Cmd + 数字键快速切换分辨率
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.setResolution('compact');
                        break;
                    case '2':
                        e.preventDefault();
                        this.setResolution('standard');
                        break;
                    case '3':
                        e.preventDefault();
                        this.setResolution('large');
                        break;
                    case '4':
                        e.preventDefault();
                        this.setResolution('ultra');
                        break;
                }
            }
        });

        // 分辨率选项点击事件
        const resolutionOptions = document.querySelectorAll('.resolution-option');
        resolutionOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const resolution = option.getAttribute('data-resolution');
                this.setResolution(resolution);
                this.hideContextMenu();
            });
        });
    }

    showContextMenu(x, y) {
        // 确保菜单不会超出屏幕边界
        const menuWidth = 280;
        const menuHeight = 300;

        let posX = x;
        let posY = y;

        if (x + menuWidth > window.innerWidth) {
            posX = window.innerWidth - menuWidth - 10;
        }

        if (y + menuHeight > window.innerHeight) {
            posY = window.innerHeight - menuHeight - 10;
        }

        this.contextMenu.style.left = posX + 'px';
        this.contextMenu.style.top = posY + 'px';
        this.contextMenu.classList.add('show');
    }

    hideContextMenu() {
        this.contextMenu.classList.remove('show');
    }

    setResolution(resolution) {
        this.currentResolution = resolution;
        this.applyResolution(resolution);
        this.updateActiveOption();

        // 保存到localStorage
        localStorage.setItem('display-resolution', resolution);

        // 触发自定义事件，通知其他组件分辨率已改变
        const event = new CustomEvent('resolutionChanged', {
            detail: { resolution: resolution }
        });
        document.dispatchEvent(event);

        // 显示提示信息
        this.showResolutionToast(resolution);
    }

    applyResolution(resolution) {
        if (this.galleryContainer) {
            // 移除所有分辨率类
            this.galleryContainer.removeAttribute('data-resolution');
            // 添加新的分辨率类
            this.galleryContainer.setAttribute('data-resolution', resolution);

            // 添加过渡动画
            this.galleryContainer.style.transition = 'all 0.3s var(--ease-out-quart)';

            // 重新触发卡片动画
            setTimeout(() => {
                this.animateCards();
            }, 100);
        }
    }

    updateActiveOption() {
        const options = document.querySelectorAll('.resolution-option');
        options.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-resolution') === this.currentResolution) {
                option.classList.add('active');
            }
        });
    }

    animateCards() {
        const cards = document.querySelectorAll('.gallery-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.4s var(--ease-out-quart)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    showResolutionToast(resolution) {
        // 创建提示信息
        const toast = document.createElement('div');
        toast.className = 'resolution-toast';

        const resolutionNames = {
            compact: '紧凑模式',
            standard: '标准模式',
            large: '大屏模式',
            ultra: '超大模式'
        };

        const resolutionIcons = {
            compact: '📱',
            standard: '💻',
            large: '🖥️',
            ultra: '📺'
        };

        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${resolutionIcons[resolution]}</span>
                <span class="toast-text">已切换到 ${resolutionNames[resolution]}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 3秒后自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // 获取当前分辨率
    getCurrentResolution() {
        return this.currentResolution;
    }

    // 获取分辨率信息
    getResolutionInfo(resolution = this.currentResolution) {
        const resolutionData = {
            compact: {
                name: '紧凑模式',
                minCardWidth: 220,
                cardHeight: 280,
                columns: '5-6列',
                icon: '📱'
            },
            standard: {
                name: '标准模式',
                minCardWidth: 320,
                cardHeight: 320,
                columns: '3-4列',
                icon: '💻'
            },
            large: {
                name: '大屏模式',
                minCardWidth: 420,
                cardHeight: 380,
                columns: '2-3列',
                icon: '🖥️'
            },
            ultra: {
                name: '超大模式',
                minCardWidth: 520,
                cardHeight: 440,
                columns: '1-2列',
                icon: '📺'
            }
        };

        return resolutionData[resolution] || resolutionData.standard;
    }
}

// 初始化分辨率设置
document.addEventListener('DOMContentLoaded', function() {
    window.resolutionSettings = new ResolutionSettings();
});
