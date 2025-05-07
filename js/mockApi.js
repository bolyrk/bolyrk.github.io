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
                    ghibli: {
                        name: "Ghibli风格",
                        gradient: ["#8a4fff", "#b070ff", "#c38fff"]
                    },
                    dark: {
                        name: "经典深色",
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
                        image: "img/1.png",
                        sortOrder: 10,
                        tags: "AI对话,国外"
                    },
                    {
                        id: 2,
                        name: "Coze国际版",
                        description: "字节跳动推出的AI机器人创建平台，无需编程即可构建AI应用",
                        url: "https://www.coze.com/home",
                        image: "img/2.jpg",
                        sortOrder: 100,
                        tags: "AI机器人,国外"
                    },
                    {
                        id: 3,
                        name: "Claude",
                        description: "人性化的AI助手，擅长自然对话、创意写作与深度思考",
                        url: "https://claude.ai/",
                        image: "img/3.jpg",
                        sortOrder: 24,
                        tags: "AI对话,国外"
                    },
                    {
                        id: 4,
                        name: "问小白",
                        description: "基于DeepSeek满血版AI引擎，拥有强大知识库与推理能力",
                        url: "https://www.wenxiaobai.com/chat/tourist",
                        image: "img/4.jpg",
                        sortOrder: 50,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 5,
                        name: "通义千问",
                        description: "阿里云推出的大语言模型，擅长中文理解与内容创作",
                        url: "https://tongyi.aliyun.com/",
                        image: "img/5.jpg",
                        sortOrder: 51,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 6,
                        name: "Kimi",
                        description: "月之暗面推出的AI助手，擅长中文语境下的多轮对话与知识处理",
                        url: "https://kimi.moonshot.cn/",
                        image: "img/6.jpg",
                        sortOrder: 52,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 7,
                        name: "Gemini",
                        description: "谷歌推出的多模态AI助手，支持图像理解与强大的推理能力",
                        url: "https://gemini.google.com/",
                        image: "img/7.jpg",
                        sortOrder: 41,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 8,
                        name: "Grok",
                        description: "X.AI推出的幽默对话AI，具有实时网络知识和独特个性",
                        url: "https://x.ai/",
                        image: "img/8.jpg",
                        sortOrder: 31,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 9,
                        name: "Claude镜像1",
                        description: "Claude AI的第一个镜像站点，提供稳定的Claude人工智能服务访问",
                        url: "https://claudechn.com/pastel/#/login",
                        alternateUrl: "http://114.134.189.221:38300/",
                        image: "img/9.jpg",
                        sortOrder: 20,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 10,
                        name: "Claude镜像2",
                        description: "Claude AI的第二个镜像站点，备用镜像服务器，保障访问稳定性",
                        url: "https://c.gpt600.com/new",
                        image: "img/10.jpg",
                        hasRecharge: true,
                        rechargeUrl: "https://e.tb.cn/h.6oE4dvyYgjVOf1W?tk=ocDVVgIdlk0",
                        sortOrder: 21,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 11,
                        name: "Grok镜像站1",
                        description: "Grok AI的镜像站点，提供稳定快速的Grok人工智能服务访问",
                        url: "https://grok.aijp.top/sign-in",
                        image: "img/11.jpg",
                        hasRecharge: true,
                        rechargeUrl: "https://m.tb.cn/h.6VYF4WBsT4P8boC",
                        sortOrder: 30,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 12,
                        name: "OpenRouter官网",
                        description: "专业的AI模型路由平台，整合多种AI服务，提供统一接口访问各大模型",
                        url: "https://openrouter.ai/",
                        image: "img/12.jpg",
                        sortOrder: 3,
                        tags: "国产,API"
                    },
                    {
                        id: 13,
                        name: "DeepSeek",
                        description: "国内领先的开源大语言模型研发公司，提供强大的AI推理和生成能力",
                        url: "https://chat.deepseek.com/",
                        image: "img/13.jpg",
                        sortOrder: 51,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 14,
                        name: "Gemini 2.5 Pro",
                        description: "谷歌DeepMind最新多模态AI模型，具备先进推理能力和百万级长文本理解",
                        url: "https://aistudio.google.com/",
                        image: "img/14.jpg",
                        sortOrder: 40,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 15,
                        name: "Bolt",
                        description: "通过提示、运行、编辑和部署全栈网络和移动应用程序构建您想要的应用",
                        url: "https://bolt.new/",
                        image: "img/15.png",
                        sortOrder: 80,
                        tags: "国外,编程"
                    },
                    {
                        id: 16,
                        name: "Coze中文版",
                        description: "扣子是新一代AI 大模型智能体开发平台",
                        url: "https://www.coze.cn/",
                        image: "img/16.png",
                        sortOrder: 101,
                        tags: "国产,AI智能体"
                    },
                    {
                        id: 17,
                        name: "Dify",
                        description: "开源LLM应用开发平台，支持RAG引擎和AI工作流，比LangChain更适合生产环境",
                        url: "https://dify.ai/",
                        image: "img/17.png",
                        sortOrder: 102,
                        tags: "国产,AI智能体"
                    },
                    {
                        id: 18,
                        name: "Firebase Studio",
                        description: "全栈AI工作空间，将AI与开发平台融合，加速应用开发全生命周期",
                        url: "https://studio.firebase.google.com/",
                        image: "img/18.png",
                        sortOrder: 81,
                        tags: "国外,编程"
                    },
                    {
                        id: 19,
                        name: "Chatbox",
                        description: "开源AI聊天应用，支持多种模型接入，提供简洁高效的AI对话体验",
                        url: "https://web.chatboxai.app/",
                        image: "img/19.png",
                        sortOrder: 103,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 20,
                        name: "小爱AI",
                        description: "综合AI工具镜像站，提供多种AI服务的稳定访问与使用体验",
                        url: "https://xiaoai.shop/list/#/home",
                        image: "img/20.png",
                        sortOrder: 23,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 21,
                        name: "豆包",
                        description: "字节跳动旗下AI聊天助手，基于先进大语言模型，提供智能对话和创作服务",
                        url: "https://www.doubao.com/chat/",
                        image: "img/21.jpg",
                        sortOrder: 53,
                        tags: "国产,AI对话"
                    },
                    {
                        id: 22,
                        name: "Claude镜像3",
                        description: "Claude AI的第三个镜像站点，提供稳定可靠的Claude人工智能服务访问",
                        url: "https://cn2.ziling.cc/list/#/home",
                        alternateUrl: "https://ziling.cc/speed-test.html",
                        image: "img/22.png",
                        sortOrder: 22,
                        tags: "国外,AI对话"
                    },
                    {
                        id: 23,
                        name: "CopyCoder",
                        description: "为AI编码工具创建强大提示词的平台，可上传UI设计图快速生成代码提示",
                        url: "https://copycoder.ai/",
                        image: "img/23.png",
                        sortOrder: 82,
                        tags: "国外,编程"
                    },
                    {
                        id: 24,
                        name: "Lovable.dev",
                        description: "从想法到应用的个人全栈工程师服务，支持快速将设计转为功能完整的应用",
                        url: "https://lovable.dev/",
                        image: "img/24.png",
                        sortOrder: 83,
                        tags: "国外,编程"
                    },
                    {
                        id: 25,
                        name: "Perplexity",
                        description: "AI搜索引擎，能够实时从互联网获取信息并提供深度分析和准确答案",
                        url: "https://www.perplexity.ai/",
                        image: "img/25.png",
                        sortOrder: 4,
                        tags: "国外,搜索"
                    },
                    {
                        id: 26,
                        name: "v0.dev",
                        description: "Vercel的AI界面生成工具，使用简单提示快速创建精美的React组件和完整页面",
                        url: "https://v0.dev/",
                        image: "img/26.png",
                        sortOrder: 84,
                        tags: "国外,编程"
                    },
                    {
                        id: 90,
                        name: "银录录像局",
                        description: "专业的AI账号租赁平台，提供多种AI工具的账号服务",
                        url: "https://nf.video/",
                        image: "img/90.jpg",
                        sortOrder: 2,
                        tags: "国产,AI账号租赁"
                    },
                    {
                        id: 100,
                        name: "野卡",
                        description: "1键订阅AI支付平台，简化各类AI服务的付费流程",
                        url: "https://yeka.ai/pay-service",
                        image: "img/100.jpg",
                        sortOrder: 1,
                        tags: "国产,支付"
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
                        image: "https://via.placeholder.com/400x320/ff0000/ffffff?text=加载失败",
                        sortOrder: 999,
                        tags: "国产,示例"
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