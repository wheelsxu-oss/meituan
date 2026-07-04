export const verticalOrder = ["waimai", "store", "hotel"];
export const screenLabels = {
    home: "入口",
    select: "候选选择",
    pool: "候选池",
    compare: "智能对比",
    risk: "评价风险",
    summary: "AI 总结",
    confirm: "确认选择",
    detail: "详情"
};
export const shareOptions = [
    { color: "#12c95b", label: "微信好友" },
    { color: "#51c878", label: "朋友圈" },
    { color: "#111111", label: "QQ 好友" },
    { color: "#ffd400", label: "QQ 空间" },
    { color: "#d9d9d9", label: "复制链接" },
    { color: "#d9d9d9", label: "生成图片" },
    { color: "#d9d9d9", label: "更多" }
];
export const flowOrder = [
    "select",
    "pool",
    "compare",
    "risk",
    "summary",
    "confirm",
    "detail"
];
export const initialSelectedByVertical = {
    hotel: ["hotel-a", "hotel-b", "hotel-c"],
    store: ["store-a", "store-b", "store-c"],
    waimai: ["waimai-a", "waimai-b", "waimai-c"]
};
export const initialSearchByVertical = {
    hotel: "",
    store: "",
    waimai: ""
};
export const initialSortByVertical = {
    hotel: "recommended",
    store: "recommended",
    waimai: "recommended"
};
export const initialCompareTabByVertical = {
    hotel: "base",
    store: "base",
    waimai: "base"
};
export const prototypeData = {
    waimai: {
        name: "外卖",
        icon: "外",
        homeTitle: "美团本地生活智能决策助手",
        homeDescription: "帮你快速比较配送速度、到手价、评价风险与踩雷成本，把纠结时间花在更值得的地方。",
        selectTitle: "选择想对比的外卖商家",
        searchPlaceholder: "搜索商家、菜品、优惠关键词",
        compareTitle: "智能对比结果",
        compareTip: "AI 已为你对比 3 个商家，以下是关键差异。",
        compareSubTip: "系统会综合价格、配送时间、评价和风险，自动给出推荐优先级。",
        riskTitle: "评价与风险对比",
        riskTip: "评价样本较少时，结果仅用于辅助判断。",
        summaryTitle: "AI 决策总结",
        summaryTip: "如果赶时间，优先选 A；如果预算更敏感，优先看 B；如果更在意稳定性，A 仍然是更稳妥的选择。",
        confirmTitle: "确认选择",
        detailTitle: "商家详情页",
        primaryAction: "前往商家下单",
        favoriteAction: "收藏该商家",
        detailTabs: ["点菜", "评价", "商家"],
        poolHint: "已选择对象满 2 个即可开始智能对比，最多保留 6 个候选。",
        quickFilters: [
            { key: "recommended", label: "推荐优先" },
            { key: "fastest", label: "速度最快" },
            { key: "price", label: "最划算" },
            { key: "rating", label: "评分更高" },
            { key: "nearby", label: "距离更近" }
        ],
        fields: [
            { key: "takeaway", label: "真实到手价" },
            { key: "rating", label: "评分" },
            { key: "eta", label: "配送时间" },
            { key: "fee", label: "配送/包装" },
            { key: "volume", label: "月售" },
            { key: "risk", label: "差评风险" }
        ],
        compareTabs: [
            {
                key: "base",
                label: "基础信息",
                rows: [
                    { key: "takeaway", label: "真实到手价" },
                    { key: "rating", label: "评分" },
                    { key: "eta", label: "配送时间" },
                    { key: "volume", label: "月售" }
                ]
            },
            {
                key: "price",
                label: "到手价",
                rows: [
                    { key: "takeaway", label: "真实到手价" },
                    { key: "coupon", label: "优惠力度" },
                    { key: "fee", label: "配送/包装" },
                    { key: "priceSummary", label: "价格说明" }
                ]
            },
            {
                key: "risk",
                label: "评价风险",
                rows: [
                    { key: "risk", label: "差评风险" },
                    { key: "positive", label: "高频好评" },
                    { key: "negative", label: "高频差评" },
                    { key: "riskTag", label: "风险标签" }
                ]
            },
            {
                key: "rule",
                label: "规则限制",
                rows: [
                    { key: "distance", label: "距离" },
                    { key: "support", label: "配送信息" },
                    { key: "rule", label: "限制提醒" },
                    { key: "shortReason", label: "AI 推荐理由" }
                ]
            }
        ],
        confirmRows: [
            { key: "takeaway", label: "真实到手价" },
            { key: "eta", label: "配送时间" },
            { key: "rating", label: "评分" },
            { key: "shortReason", label: "AI 推荐理由" }
        ],
        candidates: [
            {
                id: "waimai-a",
                title: "A HH轻食沙拉",
                shortTitle: "HH轻食沙拉",
                meta: "¥31.8 · 月售 2300+ · 4.8 分",
                support: "13 分钟送达 · 距离近 · 配送费 ¥3",
                price: "到手价 ¥31.8",
                accent: "#ffd400",
                chip: "最快推荐",
                metrics: {
                    coupon: "满 30 减 8",
                    deliveryScore: "稳定",
                    distance: "520m",
                    eta: "13 分钟",
                    fee: "¥3 / ¥1",
                    negative: "午高峰偶发缺货",
                    positive: "菜品清爽、配送及时",
                    priceSummary: "优惠后价格稳定",
                    rating: "4.8",
                    risk: "低",
                    riskTag: "稳定",
                    rule: "高峰期偶发售罄",
                    shortReason: "距离近、评分稳定、近期低分少",
                    support: "骑手响应快",
                    takeaway: "¥31.8",
                    volume: "2300+"
                },
                review: {
                    caution: "适合赶时间、想尽快吃上饭的人。",
                    negative: "午高峰偶发缺货",
                    positive: "菜品清爽、配送及时、新鲜度高",
                    riskTag: "稳定",
                    tag: "最稳"
                },
                summary: {
                    audience: "适合赶时间、又不想冒踩雷风险的人。",
                    badge: "A",
                    label: "最快推荐",
                    rank: 1,
                    reason: "配送 13 分钟，当前距离近，午餐时段稳定性更好。",
                    risk: "午高峰偶发延迟，热门单品可能售罄。",
                    tint: "#fff8d8"
                },
                details: {
                    title: "低卡轻食主义健康餐",
                    subtitle: "月售 2300+ · 评分 4.8 · 约 13 分钟",
                    tags: ["低脂", "新鲜现做", "骑手稳定"],
                    coupon: "¥13 满减券",
                    notice: "下单前建议再次确认优惠是否叠加成功，高峰期个别单品库存更新会稍慢。",
                    menu: [
                        {
                            cta: "购买",
                            name: "招牌鸡胸牛油果碗",
                            note: "蛋白质更高，适合工作日午餐",
                            price: "¥31.8"
                        },
                        {
                            cta: "购买",
                            name: "芝麻牛肉三拼饭",
                            note: "饱腹感更强，配送稳定",
                            price: "¥35.6"
                        },
                        {
                            cta: "购买",
                            name: "轻食低脂双拼套餐",
                            note: "适合作为备选",
                            price: "¥29.9"
                        }
                    ]
                }
            },
            {
                id: "waimai-b",
                title: "杨铭黄焖鸡米饭",
                shortTitle: "杨铭黄焖鸡米饭",
                meta: "¥26.3 · 月售 1900+ · 4.6 分",
                support: "20 分钟送达 · 满减后价格最低",
                price: "到手价 ¥26.3",
                accent: "#16c784",
                chip: "最划算",
                metrics: {
                    coupon: "满 25 减 4",
                    deliveryScore: "正常",
                    distance: "780m",
                    eta: "20 分钟",
                    fee: "¥4 / ¥1",
                    negative: "包装偶有汤漏",
                    positive: "分量足、热乎、性价比高",
                    priceSummary: "满减后最低价",
                    rating: "4.6",
                    risk: "中",
                    riskTag: "包装波动",
                    rule: "口味波动略高",
                    shortReason: "真实到手价低，但口味波动略高",
                    support: "价格最低",
                    takeaway: "¥26.3",
                    volume: "1900+"
                },
                review: {
                    caution: "适合预算优先、能接受家常口味的人。",
                    negative: "包装偶有汤漏",
                    positive: "便宜、饱腹、热量足",
                    riskTag: "包装波动",
                    tag: "最划算"
                },
                summary: {
                    audience: "适合预算优先、能接受风味波动的人。",
                    badge: "B",
                    label: "最划算推荐",
                    rank: 2,
                    reason: "真实到手价最低，满减叠加后优势明显。",
                    risk: "包装偶有汤漏，口味稳定性略弱。",
                    tint: "#e9fbf4"
                },
                details: {
                    title: "杨铭黄焖鸡米饭",
                    subtitle: "月售 1900+ · 评分 4.6 · 约 20 分钟",
                    tags: ["高性价比", "家常口味", "饱腹优先"],
                    coupon: "满 25 减 4",
                    notice: "如果你更看重整体体验，建议优先确认高峰期配送时长和包装状态。",
                    menu: [
                        {
                            cta: "购买",
                            name: "招牌黄焖鸡米饭",
                            note: "性价比最好，适合预算优先",
                            price: "¥26.3"
                        },
                        {
                            cta: "购买",
                            name: "双拼黄焖鸡套餐",
                            note: "分量更足，作为升级方案",
                            price: "¥31.5"
                        },
                        {
                            cta: "购买",
                            name: "时蔬小食组合",
                            note: "作为加购更合适",
                            price: "¥8.8"
                        }
                    ]
                }
            },
            {
                id: "waimai-c",
                title: "Bubupa手作汉堡",
                shortTitle: "Bubupa手作汉堡",
                meta: "¥34.3 · 月售 1800+ · 4.7 分",
                support: "28 分钟送达 · 份量足 · 口味好",
                price: "到手价 ¥34.3",
                accent: "#ff9f2e",
                chip: "品质优先",
                metrics: {
                    coupon: "套餐立减",
                    deliveryScore: "较慢",
                    distance: "1.2km",
                    eta: "28 分钟",
                    fee: "¥5 / ¥2",
                    negative: "高峰期等待偏长",
                    positive: "口感好、份量足、复购高",
                    priceSummary: "价格略高但更满足",
                    rating: "4.7",
                    risk: "中",
                    riskTag: "时长偏长",
                    rule: "高峰期等待偏长",
                    shortReason: "口味和份量更突出，但等待成本更高",
                    support: "更适合不赶时间",
                    takeaway: "¥34.3",
                    volume: "1800+"
                },
                review: {
                    caution: "适合不赶时间、想吃得更满足的人。",
                    negative: "高峰期等待偏长",
                    positive: "口感好、份量足、复购高",
                    riskTag: "时长偏长",
                    tag: "品质"
                },
                summary: {
                    audience: "适合想吃得更满足、对时间没那么敏感的人。",
                    badge: "C",
                    label: "品质优先",
                    rank: 3,
                    reason: "口味和份量表现更好，适合犒劳型选择。",
                    risk: "高峰期等待成本更高，价格也略高。",
                    tint: "#fff1df"
                },
                details: {
                    title: "Bubupa 手作汉堡",
                    subtitle: "月售 1800+ · 评分 4.7 · 约 28 分钟",
                    tags: ["现烤汉堡", "份量足", "口味更重"],
                    coupon: "套餐立减",
                    notice: "如果在午高峰下单，建议预留更充足的等待时间，避免影响后续安排。",
                    menu: [
                        {
                            cta: "购买",
                            name: "手作牛肉堡套餐",
                            note: "份量足，适合作为主推项",
                            price: "¥34.3"
                        },
                        {
                            cta: "购买",
                            name: "双层鸡腿堡套餐",
                            note: "更有满足感",
                            price: "¥37.5"
                        },
                        {
                            cta: "购买",
                            name: "粗薯条加饮品",
                            note: "可单独加购",
                            price: "¥12.0"
                        }
                    ]
                }
            }
        ],
        extraCandidates: [
            {
                title: "SinQ东南亚菜",
                meta: "¥37.6 · 31 分钟 · 4.7 分",
                support: "风味特别，但配送时间偏长",
                accent: "#2e8cff"
            }
        ]
    },
    store: {
        name: "到店",
        icon: "店",
        homeTitle: "到店餐饮帮我比套餐",
        homeDescription: "比较套餐价格、可用时间、退改限制和评价口碑，帮你更快挑到适合的到店方案。",
        selectTitle: "选择想对比的到店套餐",
        searchPlaceholder: "搜索套餐、商圈、优惠关键词",
        compareTitle: "智能对比结果",
        compareTip: "AI 已为你整理出 3 个套餐的核心差异。",
        compareSubTip: "系统会结合价格、评价、限制条件与退款规则，生成推荐优先级。",
        riskTitle: "评价与风险对比",
        riskTip: "低价套餐往往限制更多，建议结合使用时间一起看。",
        summaryTitle: "AI 决策总结",
        summaryTip: "如果你最在意性价比，可以先看 A；如果是多人聚餐，B 更合适；如果想降低踩雷风险，C 的体验更稳。",
        confirmTitle: "确认选择",
        detailTitle: "套餐详情页",
        primaryAction: "前往商家下单",
        favoriteAction: "收藏该套餐",
        detailTabs: ["套餐详情", "评价", "商家"],
        poolHint: "建议至少保留 2 个套餐对比，最多可同时保留 6 个候选。",
        quickFilters: [
            { key: "recommended", label: "推荐优先" },
            { key: "price", label: "到手价低" },
            { key: "rating", label: "评分更高" },
            { key: "nearby", label: "商圈更近" },
            { key: "fastest", label: "预约更省心" }
        ],
        fields: [
            { key: "listPrice", label: "商品价格" },
            { key: "takeaway", label: "到手价" },
            { key: "rating", label: "评分" },
            { key: "volume", label: "已售" },
            { key: "rule", label: "使用限制" },
            { key: "refund", label: "退款规则" }
        ],
        compareTabs: [
            {
                key: "base",
                label: "基础信息",
                rows: [
                    { key: "takeaway", label: "到手价" },
                    { key: "rating", label: "评分" },
                    { key: "volume", label: "已售" },
                    { key: "distance", label: "位置" }
                ]
            },
            {
                key: "price",
                label: "到手价",
                rows: [
                    { key: "listPrice", label: "挂牌价" },
                    { key: "takeaway", label: "到手价" },
                    { key: "coupon", label: "优惠说明" },
                    { key: "priceSummary", label: "价格说明" }
                ]
            },
            {
                key: "risk",
                label: "评价风险",
                rows: [
                    { key: "risk", label: "踩雷风险" },
                    { key: "positive", label: "高频好评" },
                    { key: "negative", label: "高频差评" },
                    { key: "riskTag", label: "风险标签" }
                ]
            },
            {
                key: "rule",
                label: "规则限制",
                rows: [
                    { key: "rule", label: "使用限制" },
                    { key: "refund", label: "退款规则" },
                    { key: "support", label: "补充说明" },
                    { key: "shortReason", label: "AI 推荐理由" }
                ]
            }
        ],
        confirmRows: [
            { key: "takeaway", label: "真实到手价" },
            { key: "rule", label: "使用规则" },
            { key: "rating", label: "评分" },
            { key: "shortReason", label: "AI 推荐理由" }
        ],
        candidates: [
            {
                id: "store-a",
                title: "A 城南烤肉双人餐",
                shortTitle: "城南烤肉双人餐",
                meta: "¥138 到手 · 已售 2100+ · 4.8 分",
                support: "周末可用 · 免预约 · 规则少",
                price: "到手价 ¥138",
                accent: "#ffd400",
                chip: "最划算",
                metrics: {
                    coupon: "立减 30 元",
                    distance: "900m",
                    listPrice: "¥168",
                    negative: "晚高峰排队",
                    positive: "肉质稳定、服务热情",
                    priceSummary: "优惠力度最大",
                    rating: "4.8",
                    refund: "随时退",
                    risk: "低",
                    riskTag: "规则少",
                    rule: "周末可用",
                    shortReason: "价格降幅大，限制少，评价稳定",
                    support: "免预约",
                    takeaway: "¥138",
                    volume: "2100+"
                },
                review: {
                    caution: "适合计划明确、想减少规则限制的人。",
                    negative: "晚高峰排队",
                    positive: "肉质稳定、服务热情",
                    riskTag: "规则少",
                    tag: "划算"
                },
                summary: {
                    audience: "适合预算敏感但希望体验稳定的人。",
                    badge: "A",
                    label: "最划算推荐",
                    rank: 1,
                    reason: "价格降幅大，周末可用，规则限制少。",
                    risk: "晚高峰仍可能排队，需要预留一点等位时间。",
                    tint: "#fff8d8"
                },
                details: {
                    title: "城南烤肉双人餐",
                    subtitle: "双人餐 · 周末可用 · 免预约",
                    tags: ["规则少", "双人聚餐", "性价比高"],
                    coupon: "立即购买套餐",
                    notice: "如果你打算晚高峰去，建议结合现场排队情况判断，体验会更稳定。",
                    menu: [
                        {
                            cta: "购买",
                            name: "双人烤肉拼盘",
                            note: "AI 推荐优先，综合性价比最好",
                            price: "¥138"
                        },
                        {
                            cta: "购买",
                            name: "升级饮品套餐",
                            note: "适合作为加购",
                            price: "¥158"
                        },
                        {
                            cta: "购买",
                            name: "工作日轻享版",
                            note: "备选方案",
                            price: "¥119"
                        }
                    ]
                }
            },
            {
                id: "store-b",
                title: "蜀香火锅四人套餐",
                shortTitle: "蜀香火锅四人套餐",
                meta: "¥238 到手 · 已售 1500+ · 4.7 分",
                support: "节假日可用 · 需预约",
                price: "到手价 ¥238",
                accent: "#16c784",
                chip: "聚餐优先",
                metrics: {
                    coupon: "团购立减",
                    distance: "1.3km",
                    listPrice: "¥268",
                    negative: "排队时间长",
                    positive: "锅底香、份量足",
                    priceSummary: "多人均摊更划算",
                    rating: "4.7",
                    refund: "过期退",
                    risk: "中",
                    riskTag: "预约成本",
                    rule: "需预约",
                    shortReason: "人数多更合适，但预约成本更高",
                    support: "适合多人聚餐",
                    takeaway: "¥238",
                    volume: "1500+"
                },
                review: {
                    caution: "适合多人聚餐，临时决策不够灵活。",
                    negative: "排队时间长",
                    positive: "锅底香、份量足",
                    riskTag: "预约成本",
                    tag: "聚餐"
                },
                summary: {
                    audience: "适合提前规划的朋友聚餐。",
                    badge: "B",
                    label: "聚餐推荐",
                    rank: 2,
                    reason: "四人套餐更适合多人聚餐，单人成本可控。",
                    risk: "需预约且排队不稳定，临时出发体验会打折。",
                    tint: "#e9fbf4"
                },
                details: {
                    title: "蜀香火锅四人套餐",
                    subtitle: "四人餐 · 节假日可用 · 需预约",
                    tags: ["多人聚餐", "热闹场景", "预约使用"],
                    coupon: "预约后使用",
                    notice: "如果你希望临时就去吃，这个方案会略显麻烦，更适合提前定好时间。",
                    menu: [
                        {
                            cta: "购买",
                            name: "四人火锅套餐",
                            note: "适合聚餐，单人成本可控",
                            price: "¥238"
                        },
                        {
                            cta: "购买",
                            name: "双人精简套餐",
                            note: "人数少时更灵活",
                            price: "¥159"
                        },
                        {
                            cta: "购买",
                            name: "加肉升级包",
                            note: "作为加购更合适",
                            price: "¥39"
                        }
                    ]
                }
            },
            {
                id: "store-c",
                title: "猫眼咖啡下午茶",
                shortTitle: "猫眼咖啡下午茶",
                meta: "¥69 到手 · 已售 900+ · 4.9 分",
                support: "工作日更划算 · 不可叠加券",
                price: "到手价 ¥69",
                accent: "#2e8cff",
                chip: "体验更稳",
                metrics: {
                    coupon: "限时团购价",
                    distance: "700m",
                    listPrice: "¥88",
                    negative: "周末人多",
                    positive: "环境好、出片、甜品稳定",
                    priceSummary: "评分最高但优惠不可叠加",
                    rating: "4.9",
                    refund: "未使用可退",
                    risk: "低",
                    riskTag: "周末拥挤",
                    rule: "工作日优先",
                    shortReason: "评分最高，适合轻量约会场景",
                    support: "更适合工作日",
                    takeaway: "¥69",
                    volume: "900+"
                },
                review: {
                    caution: "更适合工作日或非高峰时段。",
                    negative: "周末人多",
                    positive: "环境好、出片、甜品稳定",
                    riskTag: "周末拥挤",
                    tag: "稳定"
                },
                summary: {
                    audience: "适合下午茶、约会或轻量休闲。",
                    badge: "C",
                    label: "最稳妥推荐",
                    rank: 3,
                    reason: "评分最高，限制明确，踩雷风险低。",
                    risk: "周末人流较大，不可叠加其它券。",
                    tint: "#eef5ff"
                },
                details: {
                    title: "猫眼咖啡下午茶",
                    subtitle: "双人下午茶 · 工作日更划算",
                    tags: ["出片环境", "轻约会", "评分稳定"],
                    coupon: "立即购买套餐",
                    notice: "如果你打算周末去，建议把排队和座位等候也算进你的整体决策里。",
                    menu: [
                        {
                            cta: "购买",
                            name: "双人下午茶套餐",
                            note: "体验最稳，适合轻约会",
                            price: "¥69"
                        },
                        {
                            cta: "购买",
                            name: "精品咖啡升级版",
                            note: "风味更好",
                            price: "¥88"
                        },
                        {
                            cta: "购买",
                            name: "季节甜品加购",
                            note: "作为补充选择",
                            price: "¥22"
                        }
                    ]
                }
            }
        ],
        extraCandidates: [
            {
                title: "江景日料双人餐",
                meta: "¥198 到手 · 已售 1200+ · 4.6 分",
                support: "不可用时间较多",
                accent: "#ff9f2e"
            }
        ]
    },
    hotel: {
        name: "酒店",
        icon: "住",
        homeTitle: "酒店 PK 智能对比",
        homeDescription: "对比位置、房型、退改规则、价格和评价风险，帮你把住宿选择从纠结变成有依据的判断。",
        selectTitle: "选择想对比的酒店",
        searchPlaceholder: "搜索酒店、地标、入住关键词",
        compareTitle: "智能对比结果",
        compareTip: "AI 已整理出 3 家酒店的关键信息差异。",
        compareSubTip: "系统会综合价格、位置、退改规则、评分和风险，生成推荐优先级。",
        riskTitle: "评价与风险对比",
        riskTip: "酒店场景里，位置和退改规则往往跟价格一样重要。",
        summaryTitle: "AI 决策总结",
        summaryTip: "如果你在意综合稳定性，优先看 A；如果预算更紧，B 更有优势；如果是亲子出行，C 的适配度更高。",
        confirmTitle: "确认选择",
        detailTitle: "酒店详情页",
        primaryAction: "前往酒店预订",
        favoriteAction: "收藏该酒店",
        detailTabs: ["房型", "评价", "商家"],
        poolHint: "建议至少保留 2 家酒店进行比对，最多同时保留 6 个候选。",
        quickFilters: [
            { key: "recommended", label: "推荐优先" },
            { key: "price", label: "价格更低" },
            { key: "nearby", label: "位置更近" },
            { key: "rating", label: "评分更高" },
            { key: "fastest", label: "退改灵活" }
        ],
        fields: [
            { key: "listPrice", label: "房型价格" },
            { key: "takeaway", label: "到手价" },
            { key: "rating", label: "评分" },
            { key: "rule", label: "位置" },
            { key: "refund", label: "退改规则" },
            { key: "risk", label: "差评风险" }
        ],
        compareTabs: [
            {
                key: "base",
                label: "基础信息",
                rows: [
                    { key: "takeaway", label: "到手价" },
                    { key: "rating", label: "评分" },
                    { key: "distance", label: "位置" },
                    { key: "refund", label: "退改" }
                ]
            },
            {
                key: "price",
                label: "到手价",
                rows: [
                    { key: "listPrice", label: "挂牌价" },
                    { key: "takeaway", label: "到手价" },
                    { key: "coupon", label: "优惠说明" },
                    { key: "priceSummary", label: "价格说明" }
                ]
            },
            {
                key: "risk",
                label: "评价风险",
                rows: [
                    { key: "risk", label: "差评风险" },
                    { key: "positive", label: "高频好评" },
                    { key: "negative", label: "高频差评" },
                    { key: "riskTag", label: "风险标签" }
                ]
            },
            {
                key: "rule",
                label: "规则限制",
                rows: [
                    { key: "rule", label: "位置说明" },
                    { key: "refund", label: "退改规则" },
                    { key: "support", label: "补充说明" },
                    { key: "shortReason", label: "AI 推荐理由" }
                ]
            }
        ],
        confirmRows: [
            { key: "takeaway", label: "真实到手价" },
            { key: "rule", label: "位置/规则" },
            { key: "rating", label: "评分" },
            { key: "shortReason", label: "AI 推荐理由" }
        ],
        candidates: [
            {
                id: "hotel-a",
                title: "A 悦澜江景酒店",
                shortTitle: "悦澜江景酒店",
                meta: "¥299 到手 · 已售 1800+ · 4.8 分",
                support: "近江景商圈 · 免费取消 · 出行方便",
                price: "到手价 ¥299",
                accent: "#ffd400",
                chip: "综合推荐",
                metrics: {
                    coupon: "限时立减 29 元",
                    distance: "850m",
                    listPrice: "¥328",
                    negative: "周末价格波动",
                    positive: "江景好、交通方便、退改灵活",
                    priceSummary: "位置和价格更均衡",
                    rating: "4.8",
                    refund: "免费取消",
                    risk: "低",
                    riskTag: "综合稳定",
                    rule: "位置方便",
                    shortReason: "价格优惠，位置方便，退改更灵活",
                    support: "含双早、近地铁",
                    takeaway: "¥299",
                    volume: "1800+"
                },
                review: {
                    caution: "适合重视位置和退改灵活的人。",
                    negative: "周末价格波动",
                    positive: "江景好、交通方便、退改灵活",
                    riskTag: "综合稳定",
                    tag: "均衡"
                },
                summary: {
                    audience: "适合想要稳妥入住、兼顾出行效率的人。",
                    badge: "A",
                    label: "综合推荐",
                    rank: 1,
                    reason: "位置、价格和退改都更均衡。",
                    risk: "周末价格波动明显，临近入住日可能上涨。",
                    tint: "#fff8d8"
                },
                details: {
                    title: "悦澜江景酒店",
                    subtitle: "4.8 分 · 江景商圈 · 免费取消",
                    tags: ["可取消", "含双早", "近商圈"],
                    coupon: "查看全部房型",
                    notice: "建议在价格合适时先锁房，尤其是周末或节假日前后，价格波动会更明显。",
                    menu: [
                        {
                            cta: "预订",
                            name: "江景大床房",
                            note: "含双早、可取消、剩余不多",
                            price: "¥398"
                        },
                        {
                            cta: "预订",
                            name: "高级双床房",
                            note: "高楼层，适合双人入住",
                            price: "¥428"
                        },
                        {
                            cta: "预订",
                            name: "亲子家庭房",
                            note: "面积更大，适合作为升级选择",
                            price: "¥559"
                        }
                    ]
                }
            },
            {
                id: "hotel-b",
                title: "城央轻奢酒店",
                shortTitle: "城央轻奢酒店",
                meta: "¥259 到手 · 已售 1400+ · 4.7 分",
                support: "离地铁近 · 不含早餐 · 通勤方便",
                price: "到手价 ¥259",
                accent: "#16c784",
                chip: "价格推荐",
                metrics: {
                    coupon: "闪住专享价",
                    distance: "480m",
                    listPrice: "¥286",
                    negative: "隔音一般",
                    positive: "位置方便、房间新、性价比高",
                    priceSummary: "通勤更方便，价格更低",
                    rating: "4.7",
                    refund: "限时取消",
                    risk: "中",
                    riskTag: "隔音反馈",
                    rule: "近地铁",
                    shortReason: "价格更低，通勤方便，但服务配置少",
                    support: "不含早餐",
                    takeaway: "¥259",
                    volume: "1400+"
                },
                review: {
                    caution: "适合短住或通勤优先的人。",
                    negative: "隔音一般",
                    positive: "地铁近、房间新",
                    riskTag: "隔音反馈",
                    tag: "省钱"
                },
                summary: {
                    audience: "适合短住、通勤优先或预算敏感的人。",
                    badge: "B",
                    label: "价格推荐",
                    rank: 2,
                    reason: "价格更低，交通方便。",
                    risk: "隔音反馈较多，服务配置相对基础。",
                    tint: "#e9fbf4"
                },
                details: {
                    title: "城央轻奢酒店",
                    subtitle: "4.7 分 · 近地铁 · 限时取消",
                    tags: ["交通方便", "短住友好", "价格更低"],
                    coupon: "查看全部房型",
                    notice: "如果你对睡眠质量要求高，建议重点关注隔音评价和房型朝向。",
                    menu: [
                        {
                            cta: "预订",
                            name: "轻奢大床房",
                            note: "价格最低，适合短住",
                            price: "¥259"
                        },
                        {
                            cta: "预订",
                            name: "商务双床房",
                            note: "适合双人出差",
                            price: "¥339"
                        },
                        {
                            cta: "预订",
                            name: "行政房",
                            note: "空间更大",
                            price: "¥459"
                        }
                    ]
                }
            },
            {
                id: "hotel-c",
                title: "云栖亲子度假酒店",
                shortTitle: "云栖亲子度假酒店",
                meta: "¥559 到手 · 已售 900+ · 4.9 分",
                support: "亲子设施全 · 离市区远",
                price: "到手价 ¥559",
                accent: "#2e8cff",
                chip: "亲子推荐",
                metrics: {
                    coupon: "家庭房专享券",
                    distance: "6.8km",
                    listPrice: "¥598",
                    negative: "离市区远、价格高",
                    positive: "亲子设施完善、服务好、评价高",
                    priceSummary: "适配亲子出行，但总成本更高",
                    rating: "4.9",
                    refund: "不可取消",
                    risk: "中",
                    riskTag: "通勤成本",
                    rule: "亲子设施",
                    shortReason: "设施和评分最好，但价格和距离成本高",
                    support: "更适合度假型入住",
                    takeaway: "¥559",
                    volume: "900+"
                },
                review: {
                    caution: "适合亲子度假，不适合市区高频出行。",
                    negative: "离市区远、价格高",
                    positive: "亲子设施完善、服务好、评价高",
                    riskTag: "通勤成本",
                    tag: "亲子"
                },
                summary: {
                    audience: "适合亲子度假、追求体验完整度的人。",
                    badge: "C",
                    label: "亲子推荐",
                    rank: 3,
                    reason: "评分高、亲子设施更完整。",
                    risk: "离市区远且不可取消，灵活性不足。",
                    tint: "#eef5ff"
                },
                details: {
                    title: "云栖亲子度假酒店",
                    subtitle: "4.9 分 · 亲子设施 · 不可取消",
                    tags: ["亲子设施", "度假场景", "评分更高"],
                    coupon: "查看全部房型",
                    notice: "如果你的行程会频繁进城，这家酒店的通勤成本需要提前算进整体预算里。",
                    menu: [
                        {
                            cta: "预订",
                            name: "亲子家庭房",
                            note: "亲子设施最完整",
                            price: "¥559"
                        },
                        {
                            cta: "预订",
                            name: "景观套房",
                            note: "适合作为升级版选择",
                            price: "¥699"
                        },
                        {
                            cta: "预订",
                            name: "主题房",
                            note: "适合度假场景",
                            price: "¥799"
                        }
                    ]
                }
            }
        ],
        extraCandidates: [
            {
                title: "滨江商务酒店",
                meta: "¥388 到手 · 已售 700+ · 4.6 分",
                support: "商旅方便 · 停车有限",
                accent: "#ff9f2e"
            }
        ]
    }
};
