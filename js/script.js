// 底部导航板块切换
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 检查当前点击的导航项是否已经是激活状态
        if (this.classList.contains('active')) {
            return; // 如果已经是激活状态，不执行任何操作
        }
        
        // 移除所有导航项的active类
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // 添加当前导航项的active类
        this.classList.add('active');
        
        // 隐藏所有板块
        sections.forEach(section => section.classList.remove('active'));
        
        // 显示当前导航项对应的板块
        const sectionId = this.getAttribute('data-section');
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');
        
        // 控制顶部海报的显示/隐藏
        const topPoster = document.getElementById('top-poster');
        if (sectionId === 'works' || sectionId === 'business' || sectionId === 'fans') {
            topPoster.style.display = 'block';
        } else {
            topPoster.style.display = 'none';
        }
        
        // 如果切换到作品板块，重置所有电视剧项目为初始界面
        if (sectionId === 'works') {
            const platformToggles = document.querySelectorAll('[data-toggle="platform"]');
            platformToggles.forEach(toggle => {
                const originalContent = toggle.querySelector('.original-content');
                const platformContent = toggle.querySelector('.platform-content');
                if (originalContent && platformContent) {
                    originalContent.classList.remove('hidden');
                    platformContent.classList.add('hidden');
                }
            });
        }
        
        // 直接滚动到页面顶部
        window.scrollTo(0, 0);
    });
});

// 作品分类标签切换
const workTabs = document.querySelectorAll('.work-tab');
const workContents = document.querySelectorAll('.work-content');

workTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // 检查当前点击的标签是否已经是激活状态
        if (this.classList.contains('active')) {
            return; // 如果已经是激活状态，不执行任何操作
        }
        
        // 移除所有标签的active类
        workTabs.forEach(t => t.classList.remove('active', 'bg-primary', 'text-light'));
        workTabs.forEach(t => t.classList.add('bg-gray-200', 'hover:bg-primary', 'hover:text-light'));
        
        // 添加当前标签的active类
        this.classList.add('active', 'bg-primary', 'text-light');
        this.classList.remove('bg-gray-200', 'hover:bg-primary', 'hover:text-light');
        
        // 隐藏所有内容
        workContents.forEach(content => content.classList.add('hidden'));
        workContents.forEach(content => content.classList.remove('active'));
        
        // 显示当前标签对应的内容
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(`${tabId}-content`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
        
        // 重置排序
        document.getElementById('sort-select').value = 'desc';
        sortWorks(tabId);
        
        // 清空搜索框
        searchInput.value = '';
        searchSuggestions.classList.add('hidden');
        

    });
});



// 商务分类标签切换
const businessTabs = document.querySelectorAll('.business-tab');
const businessContents = document.querySelectorAll('.business-content');
const magazineFilter = document.getElementById('magazine-filter');

// 杂志筛选功能
const magazineSelect = document.getElementById('magazine-select');

// 解析杂志日期格式（如"2023年10月刊"）为日期对象
function parseMagazineDate(dateString) {
    const match = dateString.match(/(\d+)年(\d+)月刊/);
    if (match) {
        const year = parseInt(match[1]);
        const month = parseInt(match[2]);
        return new Date(year, month - 1, 1);
    }
    return new Date(0); // 默认返回一个很早的日期
}

// 排序杂志（按日期由近到远）
function sortMagazines() {
    const magazineContainer = document.querySelector('#magazine-content div.grid');
    const magazineItems = Array.from(document.querySelectorAll('#magazine-content div.bg-white'));
    
    // 按日期排序
    magazineItems.sort((a, b) => {
        const dateA = parseMagazineDate(a.querySelector('p.text-gray-600').textContent);
        const dateB = parseMagazineDate(b.querySelector('p.text-gray-600').textContent);
        return dateB - dateA; // 降序排序（由近到远）
    });
    
    // 重新排列元素
    magazineItems.forEach(item => magazineContainer.appendChild(item));
}

function filterMagazines() {
    const selectedMagazine = magazineSelect.value;
    const magazineItems = document.querySelectorAll('#magazine-content div.bg-white');
    
    magazineItems.forEach(item => {
        const magazineName = item.querySelector('h4').textContent.trim();
        if (selectedMagazine === 'all' || magazineName === selectedMagazine) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

if (magazineSelect) {
    magazineSelect.addEventListener('change', function() {
        filterMagazines();
        sortMagazines();
    });
    
    // 页面加载时排序
    sortMagazines();
}

businessTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // 检查当前点击的标签是否已经是激活状态
        if (this.classList.contains('active')) {
            return; // 如果已经是激活状态，不执行任何操作
        }
        
        // 移除所有标签的active类
        businessTabs.forEach(t => t.classList.remove('active', 'bg-primary', 'text-light'));
        businessTabs.forEach(t => t.classList.add('bg-gray-200', 'hover:bg-primary', 'hover:text-light'));
        
        // 添加当前标签的active类
        this.classList.add('active', 'bg-primary', 'text-light');
        this.classList.remove('bg-gray-200', 'hover:bg-primary', 'hover:text-light');
        
        // 隐藏所有内容
        businessContents.forEach(content => content.classList.add('hidden'));
        businessContents.forEach(content => content.classList.remove('active'));
        
        // 显示当前标签对应的内容
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(`${tabId}-content`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
        
        // 显示或隐藏筛选框
        if (tabId === 'magazine') {
            magazineFilter.classList.remove('hidden');
            // 切换到杂志汇总时排序
            sortMagazines();
        } else {
            magazineFilter.classList.add('hidden');
        }
        

    });
});

// 粉丝分类标签切换
const fanTabs = document.querySelectorAll('.fan-tab');
const fanContents = document.querySelectorAll('.fan-content');

fanTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // 检查当前点击的标签是否已经是激活状态
        if (this.classList.contains('active')) {
            return; // 如果已经是激活状态，不执行任何操作
        }
        
        // 移除所有标签的active类
        fanTabs.forEach(t => t.classList.remove('active', 'bg-primary', 'text-light'));
        fanTabs.forEach(t => t.classList.add('bg-gray-200', 'hover:bg-primary', 'hover:text-light'));
        
        // 添加当前标签的active类
        this.classList.add('active', 'bg-primary', 'text-light');
        this.classList.remove('bg-gray-200', 'hover:bg-primary', 'hover:text-light');
        
        // 隐藏所有内容
        fanContents.forEach(content => content.classList.add('hidden'));
        fanContents.forEach(content => content.classList.remove('active'));
        
        // 显示当前标签对应的内容
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(`${tabId}-content`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
        

    });
});

// 互动区分类标签切换
const interactionTabs = document.querySelectorAll('.interaction-tab');
const interactionContents = document.querySelectorAll('.interaction-content');

interactionTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // 检查当前点击的标签是否已经是激活状态
        if (this.classList.contains('active')) {
            return; // 如果已经是激活状态，不执行任何操作
        }
        
        // 移除所有标签的active类
        interactionTabs.forEach(t => t.classList.remove('active', 'bg-primary', 'text-light'));
        interactionTabs.forEach(t => t.classList.add('bg-gray-200', 'hover:bg-primary', 'hover:text-light'));
        
        // 添加当前标签的active类
        this.classList.add('active', 'bg-primary', 'text-light');
        this.classList.remove('bg-gray-200', 'hover:bg-primary', 'hover:text-light');
        
        // 隐藏所有内容
        interactionContents.forEach(content => content.classList.add('hidden'));
        interactionContents.forEach(content => content.classList.remove('active'));
        
        // 显示当前标签对应的内容
        const tabId = this.getAttribute('data-tab');
        const activeContent = document.getElementById(`${tabId}-content`);
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
        

    });
});

// 初始化互动区，默认显示杨幂语录并直接显示弹窗
window.addEventListener('DOMContentLoaded', function() {
    const quoteTab = document.querySelector('.interaction-tab[data-tab="语录"]');
    if (quoteTab) {
        quoteTab.click();
        // 直接创建弹窗，不使用setTimeout，避免动态跳出效果
        createQuoteModal();
    }
});

// 作品搜索功能
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchSuggestions = document.getElementById('search-suggestions');

// 获取当前分类的作品标题
function getAllWorkTitles() {
    // 获取当前活跃的分类
    const activeTab = document.querySelector('.work-tab.active');
    const tabId = activeTab.getAttribute('data-tab');
    const contentContainer = document.getElementById(`${tabId}-content`);
    const workItems = contentContainer.querySelectorAll('div.bg-white');
    
    const titles = [];
    workItems.forEach(item => {
        const title = item.querySelector('h3.font-bold').textContent.trim();
        titles.push(title);
    });
    return titles;
}

// 显示搜索建议
function showSuggestions(input) {
    const inputValue = input.value.trim().toLowerCase();
    const allTitles = getAllWorkTitles();
    
    if (inputValue.length === 0) {
        searchSuggestions.classList.add('hidden');
        return;
    }
    
    const matchedTitles = allTitles.filter(title => 
        title.toLowerCase().includes(inputValue)
    );
    
    if (matchedTitles.length > 0) {
        // 清空之前的建议
        searchSuggestions.innerHTML = '';
        
        // 添加新的建议
        matchedTitles.forEach(title => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
            suggestionItem.textContent = title;
            
            // 点击建议项
            suggestionItem.addEventListener('click', function() {
                searchInput.value = title;
                searchSuggestions.classList.add('hidden');
                performSearch();
            });
            
            searchSuggestions.appendChild(suggestionItem);
        });
        
        searchSuggestions.classList.remove('hidden');
    } else {
        searchSuggestions.classList.add('hidden');
    }
}

// 执行搜索
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        // 遍历所有作品卡片，按照页面显示顺序
        const workItems = document.querySelectorAll('.work-content div.bg-white');
        let foundItems = [];
        
        // 首先收集所有匹配的作品
        workItems.forEach(item => {
            const title = item.querySelector('h3.font-bold').textContent.trim().toLowerCase();
            if (title.includes(searchTerm)) {
                foundItems.push(item);
            }
        });
        
        if (foundItems.length > 0) {
            // 滚动到第一个匹配的作品（按照页面显示顺序）
            foundItems[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            // 高亮显示所有匹配的作品
            foundItems.forEach(item => {
                item.classList.add('ring-2', 'ring-primary');
                // 3秒后移除高亮
                setTimeout(() => {
                    item.classList.remove('ring-2', 'ring-primary');
                }, 3000);
            });
        } else {
            alert('未找到匹配的作品');
        }
        
        // 隐藏建议框
        searchSuggestions.classList.add('hidden');
    }
}

// 输入事件触发搜索建议
searchInput.addEventListener('input', function() {
    showSuggestions(this);
});

// 点击搜索按钮触发搜索
searchBtn.addEventListener('click', performSearch);

// 回车键触发搜索
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 点击页面其他地方隐藏建议框
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.add('hidden');
    }
});

// 作品排序功能
const sortSelect = document.getElementById('sort-select');

sortSelect.addEventListener('change', function() {
    // 获取当前活跃的标签
    const activeTab = document.querySelector('.work-tab.active');
    const tabId = activeTab.getAttribute('data-tab');
    sortWorks(tabId);
});

function sortWorks(tabId) {
    const contentContainer = document.getElementById(`${tabId}-content`);
    const gridContainer = contentContainer.querySelector('div');
    const workItems = Array.from(gridContainer.children);
    const sortOrder = document.getElementById('sort-select').value;
    
    // 按日期排序
    workItems.sort((a, b) => {
        const dateA = new Date(a.querySelector('.text-gray-600').textContent);
        const dateB = new Date(b.querySelector('.text-gray-600').textContent);
        
        if (sortOrder === 'desc') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
    
    // 重新排列元素
    workItems.forEach(item => gridContainer.appendChild(item));
}

// 杨幂语录功能
const quoteElement = document.getElementById('quote');

const quotes = [
    "你可以不喜欢我的性格，不喜欢我的样子，不喜欢我说的话，包括我的一切，你都可以不喜欢，没关系。但请你不要来告诉我怎么去做，因为我是我，你是你。",
    "这个世界，对于心态好的人，就是个大游乐场，越刺激越好玩。对于胆小鬼，那就是地狱，随时随地都会受伤。所以，你觉得自己在什么样的世界里，取决于你是个什么样的人。",
    "我不需要别人的认同，我只需要做我自己。",
    "每个人都有自己的故事，每个人都有自己的经历，所以请不要随便去评价一个人。",
    "人生没有彩排，每天都是现场直播，所以我要努力做好每一件事。",
    "我不是人民币，做不到让每个人都喜欢我。",
    "与其在意别人的看法，不如专注于自己的成长。",
    "成功不是偶然，而是必然，只要你足够努力。",
    "人生就像一场戏，主角是自己，导演也是自己。",
    "无论遇到什么困难，都要保持微笑，因为微笑是最好的武器。"
];

// 创建弹窗
function createQuoteModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.id = 'quote-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg p-4 max-w-sm w-[90%]';
    modalContent.style.position = 'relative';
    
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'text-lg font-bold mb-3 text-primary';
    modalTitle.textContent = '杨幂语录';
    
    const modalQuote = document.createElement('p');
    modalQuote.className = 'text-base italic mb-10';
    const randomIndex = Math.floor(Math.random() * quotes.length);
    modalQuote.textContent = `"${quotes[randomIndex]}"`;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'bg-primary text-light py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors';
    closeBtn.textContent = '关闭';
    closeBtn.style.position = 'absolute';
    closeBtn.style.bottom = '10px';
    closeBtn.style.right = '10px';
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalQuote);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

// 探索作品链接处理
document.getElementById('explore-works').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 显示底部导航
    document.getElementById('bottom-nav').classList.remove('hidden');
    
    // 显示顶部海报
    const topPoster = document.getElementById('top-poster');
    topPoster.style.display = 'block';
    
    // 显示作品板块
    const worksSection = document.getElementById('works');
    const homeSection = document.getElementById('home');
    
    // 移除所有板块的active类
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    
    // 添加作品板块的active类
    worksSection.classList.add('active');
    
    // 移除英雄区
    homeSection.style.display = 'none';
    
    // 滚动到顶部
    window.scrollTo(0, 0);
});

// 平滑滚动 - 仅适用于非导航项的锚点链接
document.querySelectorAll('a[href^="#"]:not(.nav-item):not(#explore-works)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // 如果是导航项对应的板块，通过导航项点击事件处理
        if (targetId === '#works' || targetId === '#business' || targetId === '#fans' || targetId === '#interaction') {
            const sectionId = targetId.substring(1); // 移除#符号
            const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
            if (navItem) {
                navItem.click();
            }
        } else {
            // 其他锚点链接的平滑滚动
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 弹幕功能
const danmakuContainer = document.getElementById('danmaku-container');
const danmakuMessages = [
    "1.幂幂，你是我永远的女神！",
    "2.期待你的新作品，永远支持你！",
    "3.幂姐的演技越来越棒了，爱你！",
    "4.希望幂幂永远开心快乐，我们一直在！",
    "5.幂幂的笑容是我每天的动力！",
    "6.杨幂你是最棒的！",
    "7.永远支持大幂幂！",
    "8.幂幂的每部作品都很精彩！",
    "9.杨幂的演技真的越来越好！",
    "10.幂幂是我的偶像！",
    "11.爱你幂幂！",
    "12.杨幂加油！",
    "13.幂幂的新剧什么时候播？",
    "14.杨幂的穿搭真的很时尚！",
    "15.幂幂的声音很好听！",
    "16.杨幂的眼睛真的很有灵气！",
    "17.幂幂的性格真的很圈粉！",
    "18.杨幂的努力我们都看在眼里！",
    "19.幂幂是娱乐圈的一股清流！",
    "20.杨幂的未来一定会更加辉煌！",
    "21.幂幂，你是我永远的女神！",
    "22.期待你的新作品，永远支持你！",
    "23.幂姐的演技越来越棒了，爱你！",
    "24.希望幂幂永远开心快乐，我们一直在！",
    "25.幂幂的笑容是我每天的动力！",
    "26.杨幂你是最棒的！",
    "27.永远支持大幂幂！",
    "28.幂幂的每部作品都很精彩！",
    "29.杨幂的演技真的越来越好！",
    "30.幂幂是我的偶像！",
    "31.爱你幂幂！",
    "32.杨幂加油！",
    "33.幂幂的新剧什么时候播？",
    "34.杨幂的穿搭真的很时尚！",
    "35.幂幂的声音很好听！",
    "36.杨幂的眼睛真的很有灵气！",
    "37.幂幂的性格真的很圈粉！",
    "38.杨幂的努力我们都看在眼里！",
    "39.幂幂是娱乐圈的一股清流！",
    "40.杨幂的未来一定会更加辉煌！",
    "41.幂幂，你是我永远的女神！",
    "42.期待你的新作品，永远支持你！",
    "43.幂姐的演技越来越棒了，爱你！",
    "44.希望幂幂永远开心快乐，我们一直在！",
    "45.幂幂的笑容是我每天的动力！",
    "46.杨幂你是最棒的！",
    "47.永远支持大幂幂！",
    "48.幂幂的每部作品都很精彩！",
    "49.杨幂的演技真的越来越好！",
    "50.幂幂是我的偶像！"
];

// 弹幕行数
const DANMAKU_ROWS = 6;
// 存储每行的状态，true表示该行可以发送弹幕
const rowStatus = new Array(DANMAKU_ROWS).fill(true);
// 当前播放的弹幕索引
let currentDanmakuIndex = 0;

function createDanmaku() {
    // 找到空闲的行
    const availableRows = rowStatus.reduce((acc, status, index) => {
        if (status) acc.push(index);
        return acc;
    }, []);
    
    if (availableRows.length === 0) {
        return; // 没有空闲行，等待下次
    }
    
    // 随机选择一个空闲行
    const rowIndex = availableRows[Math.floor(Math.random() * availableRows.length)];
    // 标记该行为忙碌
    rowStatus[rowIndex] = false;
    
    // 按顺序循环选择弹幕
    const message = danmakuMessages[currentDanmakuIndex];
    // 递增索引，循环播放
    currentDanmakuIndex = (currentDanmakuIndex + 1) % danmakuMessages.length;
    const danmaku = document.createElement('div');
    danmaku.className = 'absolute whitespace-nowrap text-white text-shadow';
    
    // 计算该行的垂直位置
    const rowHeight = danmakuContainer.offsetHeight / DANMAKU_ROWS;
    const top = rowIndex * rowHeight + rowHeight / 4; // 垂直居中
    danmaku.style.top = top + 'px';
    danmaku.style.left = danmakuContainer.offsetWidth + 'px';
    danmaku.style.fontSize = '16px';
    danmaku.style.color = getRandomColor();
    danmaku.textContent = message;
    
    danmakuContainer.appendChild(danmaku);
    
    // 根据设备类型设置不同的弹幕速度
    let position = danmakuContainer.offsetWidth;
    let speed;
    
    // 检测设备类型
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobile) {
        speed = 1.0; // 手机设备速度较慢
    } else if (isTablet) {
        speed = 1.3; // 平板设备速度适中
    } else {
        speed = 1.8; // 电脑设备速度较快
    }
    let markedAsIdle = false;
    
    function animate() {
        position -= speed;
        danmaku.style.left = position + 'px';
        
        // 当弹幕的最后一个字进入屏幕时，等待0.5秒后标记行为空闲
        if (!markedAsIdle && position + danmaku.offsetWidth < danmakuContainer.offsetWidth) {
            markedAsIdle = true;
            setTimeout(() => {
                rowStatus[rowIndex] = true;
            }, 500); // 0.5秒后标记行为空闲
        }
        
        if (position < -danmaku.offsetWidth) {
            danmakuContainer.removeChild(danmaku);
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    // 开始动画
    requestAnimationFrame(animate);
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffcc5c', '#f7dc6f', '#bb8fce', '#85c1e9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 自动播放弹幕
setInterval(createDanmaku, 500);

// 回到顶部按钮功能
const backToTopButton = document.getElementById('back-to-top');

// 检测滚动位置，显示/隐藏回到顶部按钮
window.addEventListener('scroll', function() {
    // 只在四大板块显示时才显示回到顶部按钮
    const homeSection = document.getElementById('home');
    if (homeSection.style.display === 'none') {
        if (window.scrollY > 100) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

// 点击回到顶部按钮，回到当前板块顶部
backToTopButton.addEventListener('click', function() {
    // 找到当前激活的板块
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        // 滚动到当前板块顶部
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// 初始化排序
document.addEventListener('DOMContentLoaded', function() {
    const activeTab = document.querySelector('.work-tab.active');
    const tabId = activeTab.getAttribute('data-tab');
    sortWorks(tabId);
    
    // 初始化弹幕
    for (let i = 0; i < DANMAKU_ROWS; i++) {
        setTimeout(createDanmaku, i * 300);
    }
    
    // 初始化电视剧平台切换功能
    const platformToggles = document.querySelectorAll('[data-toggle="platform"]');
    platformToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // 检查点击目标是否在平台图标区域内
            const platformArea = this.querySelector('.platform-content');
            if (platformArea && platformArea.contains(e.target)) {
                return; // 如果点击的是平台图标区域，不执行切换
            }
            
            const originalContent = this.querySelector('.original-content');
            const platformContent = this.querySelector('.platform-content');
            
            if (originalContent && platformContent) {
                originalContent.classList.toggle('hidden');
                platformContent.classList.toggle('hidden');
            }
        });
    });
    
    // 为抖音图片添加点击事件处理
    const douyinImages = document.querySelectorAll('img[src="Picture/图标/豆.jpg"]');
    douyinImages.forEach(img => {
        img.addEventListener('click', function(e) {
            // 检测设备类型
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
            
            if (isMobile || isTablet) {
                // 平板和手机版：显示弹窗
                e.preventDefault();
                e.stopPropagation();
                
                // 创建弹窗
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.id = 'douyin-modal';
                
                const modalContent = document.createElement('div');
                modalContent.className = 'bg-white rounded-lg p-4 max-w-sm w-[90%]';
                
                const modalTitle = document.createElement('h3');
                modalTitle.className = 'text-lg font-bold mb-3 text-primary';
                modalTitle.textContent = '观看链接';
                
                const modalText = document.createElement('p');
                modalText.className = 'text-base mb-4';
                modalText.textContent = '6.10 亲爱的翻译官 第1集  https://v.douyin.com/YQweS53bfeY/  复制此链接，打开抖音搜索，直接观看视频！ hba:/ 01/27 g@O.kp';
                
                // 创建按钮容器，用于居中显示按钮
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'flex justify-center gap-4';
                
                const copyBtn = document.createElement('button');
                copyBtn.className = 'bg-primary text-light py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors';
                copyBtn.textContent = '复制';
                copyBtn.addEventListener('click', function() {
                    const textToCopy = '6.10 亲爱的翻译官 第1集  https://v.douyin.com/YQweS53bfeY/  复制此链接，打开抖音搜索，直接观看视频！ hba:/ 01/27 g@O.kp';
                    navigator.clipboard.writeText(textToCopy).then(function() {
                        // 创建复制成功提示，作为独立元素
                        const successMessage = document.createElement('p');
                        successMessage.className = 'fixed text-center text-black font-medium';
                        successMessage.textContent = '复制成功';
                        successMessage.style.position = 'fixed';
                        successMessage.style.top = '50%';
                        successMessage.style.left = '50%';
                        successMessage.style.transform = 'translate(-50%, -50%)';
                        successMessage.style.zIndex = '1000';
                        successMessage.style.padding = '10px 20px';
                        successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                        successMessage.style.borderRadius = '8px';
                        successMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s ease';
                        
                        // 添加到body中
                        document.body.appendChild(successMessage);
                        
                        // 显示提示
                        setTimeout(function() {
                            successMessage.style.opacity = '1';
                        }, 100);
                        
                        // 2秒后自动移除提示
                        setTimeout(function() {
                            successMessage.style.opacity = '0';
                            setTimeout(function() {
                                document.body.removeChild(successMessage);
                            }, 500);
                        }, 2000);
                    }).catch(function(err) {
                        console.error('复制失败:', err);
                    });
                });
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors';
                closeBtn.textContent = '关闭';
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // 将按钮添加到容器中
                buttonContainer.appendChild(copyBtn);
                buttonContainer.appendChild(closeBtn);
                
                modalContent.appendChild(modalTitle);
                modalContent.appendChild(modalText);
                modalContent.appendChild(buttonContainer);
                modal.appendChild(modalContent);
                
                document.body.appendChild(modal);
            }
            // 电脑版：保持原有跳转行为
        });
    });
});