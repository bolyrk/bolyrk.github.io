// 模拟API服务器
class MockApi {
    constructor() {
        this.data = null;
        this.loadData();
    }

    // 加载JSON数据
    async loadData() {
        try {
            // 直接定义内联数据而不是通过fetch加载
            this.data = {
                themes: {
                    dark: {
                        name: "深色主题",
                        gradient: ["#ff4d94", "#ff9b4d", "#4dffff"]
                    },
                    blue: {
                        name: "蓝色主题",
                        gradient: ["#00b4d8", "#4361ee", "#7209b7"]
                    },
                    green: {
                        name: "绿色主题",
                        gradient: ["#38b000", "#70e000", "#ccff33"]
                    },
                    purple: {
                        name: "紫色主题",
                        gradient: ["#7b2cbf", "#c77dff", "#e0aaff"]
                    },
                    orange: {
                        name: "橙色主题",
                        gradient: ["#ff7700", "#ff9500", "#ffc300"]
                    },
                    light: {
                        name: "亮色主题",
                        gradient: ["#007bff", "#6c5ce7", "#00cec9"]
                    }
                },
                tools: [
                    {
                        id: 1,
                        name: "ChatGPT",
                        description: "强大的AI对话助手，解答问题、创作内容、辅助工作",
                        url: "https://chatgpt.com/",
                        image: "img/1.jpg"
                    },
                    {
                        id: 2,
                        name: "Coze",
                        description: "字节跳动推出的AI机器人创建平台，无需编程即可构建AI应用",
                        url: "https://www.coze.com/home",
                        image: "img/2.jpg"
                    },
                    {
                        id: 3,
                        name: "Claude",
                        description: "人性化的AI助手，擅长自然对话、创意写作与深度思考",
                        url: "https://claude.ai/",
                        image: "img/3.jpg"
                    },
                    {
                        id: 4,
                        name: "问小白",
                        description: "基于DeepSeek满血版AI引擎，拥有强大知识库与推理能力",
                        url: "https://www.wenxiaobai.com/chat/tourist",
                        image: "img/4.jpg"
                    },
                    {
                        id: 5,
                        name: "通义千问",
                        description: "阿里云推出的大语言模型，擅长中文理解与内容创作",
                        url: "https://tongyi.aliyun.com/",
                        image: "img/5.jpg"
                    },
                    {
                        id: 6,
                        name: "Kimi",
                        description: "月之暗面推出的AI助手，擅长中文语境下的多轮对话与知识处理",
                        url: "https://kimi.moonshot.cn/",
                        image: "img/6.jpg"
                    },
                    {
                        id: 7,
                        name: "Gemini",
                        description: "谷歌推出的多模态AI助手，支持图像理解与强大的推理能力",
                        url: "https://gemini.google.com/",
                        image: "img/7.jpg"
                    },
                    {
                        id: 8,
                        name: "Grok",
                        description: "X.AI推出的幽默对话AI，具有实时网络知识和独特个性",
                        url: "https://x.ai/",
                        image: "img/8.jpg"
                    },
                    {
                        id: 9,
                        name: "Claude镜像1",
                        description: "Claude AI的第一个镜像站点，提供稳定的Claude人工智能服务访问",
                        url: "https://claudechn.com/pastel/#/login",
                        image: "img/9.jpg"
                    },
                    {
                        id: 10,
                        name: "Claude镜像2",
                        description: "Claude AI的第二个镜像站点，备用镜像服务器，保障访问稳定性",
                        url: "https://pro.restai.fun",
                        image: "img/10.jpg",
                        hasRecharge: true,
                        rechargeUrl: "https://m.tb.cn/h.6VYF4WBsT4P8boC  "
                    },
                    {
                        id: 11,
                        name: "Grok镜像站1",
                        description: "Grok AI的镜像站点，提供稳定快速的Grok人工智能服务访问",
                        url: "https://grok.aijp.top/sign-in",
                        image: "img/11.jpg",
                        hasRecharge: true,
                        rechargeUrl: "https://m.tb.cn/h.6VYF4WBsT4P8boC"
                    },
                    {
                        id: 12,
                        name: "OpenRouter官网",
                        description: "专业的AI模型路由平台，整合多种AI服务，提供统一接口访问各大模型",
                        url: "https://openrouter.ai/",
                        image: "img/12.jpg"
                    },
                    {
                        id: 13,
                        name: "DeepSeek",
                        description: "国内领先的开源大语言模型研发公司，提供强大的AI推理和生成能力",
                        url: "https://chat.deepseek.com/",
                        image: "img/13.jpg"
                    },
                    {
                        id: 14,
                        name: "Gemini 2.5 Pro",
                        description: "谷歌DeepMind最新多模态AI模型，具备先进推理能力和百万级长文本理解",
                        url: "https://aistudio.google.com/",
                        image: "img/14.jpg"
                    },
                    {
                        id: 90,
                        name: "银录录像局",
                        description: "专业的AI账号租赁平台，提供多种AI工具的账号服务",
                        url: "https://nf.video/",
                        image: "img/90.jpg"
                    },
                    {
                        id: 100,
                        name: "野卡",
                        description: "1键订阅AI支付平台，简化各类AI服务的付费流程",
                        url: "https://yeka.ai/pay-service",
                        image: "img/100.jpg"
                    }
                ]
            };
            console.log('数据加载成功');
        } catch (error) {
            console.error('加载数据出错:', error);
            // 设置一个默认的最小数据集以防止整个应用崩溃
            this.data = {
                themes: {
                    dark: { name: "默认主题", gradient: ["#333", "#666", "#999"] }
                },
                tools: [
                    {
                        id: 0,
                        name: "示例工具",
                        description: "数据加载失败，这是一个示例工具",
                        url: "#",
                        image: "https://via.placeholder.com/400x320/ff0000/ffffff?text=加载失败"
                    }
                ]
            };
        }
    }

    // 获取所有主题数据
    async getThemes() {
        await this.ensureDataLoaded();
        await this.delay(300); // 模拟网络延迟
        return this.data.themes;
    }

    // 获取所有工具数据
    async getTools() {
        await this.ensureDataLoaded();
        await this.delay(500); // 模拟网络延迟
        return this.data.tools;
    }

    // 确保数据已加载
    async ensureDataLoaded() {
        if (!this.data) {
            await this.loadData();
        }
    }

    // 模拟网络延迟
    delay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 创建全局API实例
window.api = new MockApi(); 