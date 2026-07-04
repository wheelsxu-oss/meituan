(function () {
    'use strict';

    const ReactGlobal = window.React;
    const { Fragment, StrictMode, useMemo, useState } = ReactGlobal;

    function withKey(props, key) {
        if (key === undefined) {
            return props ?? {};
        }
        return { ...(props ?? {}), key };
    }
    ReactGlobal.Fragment;
    function jsx(type, props, key) {
        return ReactGlobal.createElement(type, withKey(props, key));
    }
    const jsxs = jsx;

    const ReactDOMGlobal = window.ReactDOM;

    const MotionGlobal = window.Motion;
    const { AnimatePresence, motion } = MotionGlobal;

    function BottomSheet({ children, open }) {
        return (jsx(AnimatePresence, { children: open ? (jsx(motion.div, { animate: { opacity: 1 }, className: "absolute inset-0 z-30 bg-black/35", exit: { opacity: 0 }, initial: { opacity: 0 }, children: jsxs(motion.div, { animate: { opacity: 1, y: 0 }, className: "absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-white px-6 pb-8 pt-5", exit: { opacity: 0, y: 28 }, initial: { opacity: 0, y: 28 }, transition: { duration: 0.24 }, children: [jsx("div", { className: "mx-auto mb-4 h-1.5 w-14 rounded-full bg-black/10" }), children] }) })) : null }));
    }

    const variantClasses = {
        primary: "bg-brand text-ink hover:brightness-95",
        secondary: "bg-ink text-white hover:opacity-95",
        ghost: "bg-white text-ink ring-1 ring-black/5 hover:bg-white/90",
        muted: "bg-[#f3f3f1] text-black/65 hover:bg-[#ecebe7]"
    };
    const sizeClasses = {
        md: "h-10 px-4 text-[13px]",
        sm: "h-8 px-3 text-[12px]"
    };
    function Button({ block, children, className = "", size = "md", type = "button", variant = "primary", ...props }) {
        return (jsx("button", { className: [
                "inline-flex items-center justify-center rounded-xl font-semibold transition",
                block ? "w-full" : "",
                sizeClasses[size],
                variantClasses[variant],
                className
            ]
                .filter(Boolean)
                .join(" "), type: type, ...props, children: children }));
    }

    function Modal({ children, open }) {
        return (jsx(AnimatePresence, { children: open ? (jsx(motion.div, { animate: { opacity: 1 }, className: "absolute inset-0 z-30 bg-black/35", exit: { opacity: 0 }, initial: { opacity: 0 }, children: jsx(motion.div, { animate: { opacity: 1, scale: 1, y: 0 }, className: "mx-auto mt-80 w-[294px] rounded-[20px] bg-white p-5 shadow-2xl", exit: { opacity: 0, scale: 0.96, y: 8 }, initial: { opacity: 0, scale: 0.96, y: 8 }, transition: { duration: 0.2 }, children: children }) })) : null }));
    }

    function PhoneShell({ backLabel = "<", children, onBack, pageTitle, showBack = true }) {
        return (jsxs("div", { className: "relative h-[874px] w-[402px] overflow-hidden rounded-[54px] bg-paper shadow-phone", children: [jsxs("div", { className: "absolute inset-x-0 top-0 z-20 h-[94px] bg-white", children: [jsxs("div", { className: "flex items-end justify-between px-6 pb-4 pt-5 text-[17px] font-semibold", children: [jsx("span", { children: "9:41" }), jsxs("div", { className: "flex items-center gap-1.5", children: [jsx("span", { className: "h-3 w-4 rounded-sm border border-black/70" }), jsx("span", { className: "h-3 w-4 rounded-sm border border-black/70" }), jsx("span", { className: "h-4 w-6 rounded-[4px] border border-black/70" })] })] }), jsxs("div", { className: "flex items-center gap-2 px-5 pb-3", children: [jsx("button", { className: [
                                        "h-7 w-7 text-left text-[24px] leading-none text-ink",
                                        showBack ? "" : "pointer-events-none opacity-0"
                                    ]
                                        .filter(Boolean)
                                        .join(" "), onClick: onBack, type: "button", children: backLabel }), jsx("div", { className: "flex-1 pr-9 text-center text-[15px] font-bold text-[#1f1f1f]", children: pageTitle })] }), jsx("div", { className: "h-px w-full bg-line" })] }), jsx("div", { className: "absolute inset-x-0 bottom-0 h-[34px]", children: jsx("div", { className: "absolute bottom-2 left-1/2 h-[5px] w-36 -translate-x-1/2 rounded-full bg-black" }) }), jsx("div", { className: "absolute inset-0 overflow-hidden pt-[94px]", children: children })] }));
    }

    function SearchField({ onChange, placeholder, value }) {
        return (jsxs("label", { className: "flex h-11 items-center gap-2 rounded-[14px] bg-white px-4 shadow-card", children: [jsx("span", { "aria-hidden": "true", className: "text-sm text-black/25", children: "o" }), jsx("input", { "aria-label": placeholder, className: "w-full bg-transparent text-[12px] text-ink outline-none placeholder:text-[#a3a39a]", onChange: (event) => onChange(event.target.value), placeholder: placeholder, type: "search", value: value })] }));
    }

    function Surface({ children, className = "", interactive = false, ...props }) {
        return (jsx("div", { className: [
                "rounded-[18px] bg-white shadow-card",
                interactive ? "transition hover:-translate-y-0.5" : "",
                className
            ]
                .filter(Boolean)
                .join(" "), ...props, children: children }));
    }

    const verticalOrder = ["waimai", "store", "hotel"];
    const screenLabels = {
        home: "入口",
        select: "候选选择",
        pool: "候选池",
        compare: "智能对比",
        risk: "评价风险",
        summary: "AI 总结",
        confirm: "确认选择",
        detail: "详情"
    };
    const shareOptions = [
        { color: "#12c95b", label: "微信好友" },
        { color: "#51c878", label: "朋友圈" },
        { color: "#111111", label: "QQ 好友" },
        { color: "#ffd400", label: "QQ 空间" },
        { color: "#d9d9d9", label: "复制链接" },
        { color: "#d9d9d9", label: "生成图片" },
        { color: "#d9d9d9", label: "更多" }
    ];
    const flowOrder = [
        "select",
        "pool",
        "compare",
        "risk",
        "summary",
        "confirm",
        "detail"
    ];
    const initialSelectedByVertical = {
        hotel: ["hotel-a", "hotel-b", "hotel-c"],
        store: ["store-a", "store-b", "store-c"],
        waimai: ["waimai-a", "waimai-b", "waimai-c"]
    };
    const initialSearchByVertical = {
        hotel: "",
        store: "",
        waimai: ""
    };
    const initialSortByVertical = {
        hotel: "recommended",
        store: "recommended",
        waimai: "recommended"
    };
    const initialCompareTabByVertical = {
        hotel: "base",
        store: "base",
        waimai: "base"
    };
    const prototypeData = {
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

    const pageTitleByScreen = (data) => ({
        compare: data.compareTitle,
        confirm: data.confirmTitle,
        detail: data.detailTitle,
        pool: "候选池",
        risk: data.riskTitle,
        select: data.selectTitle,
        summary: data.summaryTitle
    });
    function toNumber(value) {
        const matched = value.match(/[\d.]+/);
        return matched ? Number(matched[0]) : Number.MAX_SAFE_INTEGER;
    }
    function hexToRgba(hex, alpha) {
        const normalized = hex.replace("#", "");
        const safe = normalized.length === 3
            ? normalized
                .split("")
                .map((part) => part + part)
                .join("")
            : normalized;
        const red = Number.parseInt(safe.slice(0, 2), 16);
        const green = Number.parseInt(safe.slice(2, 4), 16);
        const blue = Number.parseInt(safe.slice(4, 6), 16);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    function getMetricValue(candidate, key) {
        if (key === "support") {
            return candidate.support;
        }
        return candidate.metrics[key] ?? "-";
    }
    function sortCandidates(candidates, sortKey) {
        const next = [...candidates];
        function refundFlexRank(value) {
            if (value.includes("免费取消") || value.includes("随时退")) {
                return 0;
            }
            if (value.includes("限时取消") || value.includes("过期退") || value.includes("未使用可退")) {
                return 1;
            }
            if (value.includes("不可取消")) {
                return 3;
            }
            return 2;
        }
        next.sort((left, right) => {
            if (sortKey === "recommended") {
                return left.summary.rank - right.summary.rank;
            }
            if (sortKey === "fastest") {
                if (left.metrics.eta || right.metrics.eta) {
                    return toNumber(left.metrics.eta ?? "999") - toNumber(right.metrics.eta ?? "999");
                }
                return refundFlexRank(left.metrics.refund ?? "") - refundFlexRank(right.metrics.refund ?? "");
            }
            if (sortKey === "price") {
                return toNumber(left.metrics.takeaway) - toNumber(right.metrics.takeaway);
            }
            if (sortKey === "rating") {
                return toNumber(right.metrics.rating) - toNumber(left.metrics.rating);
            }
            return toNumber(left.metrics.distance ?? left.metrics.rule) -
                toNumber(right.metrics.distance ?? right.metrics.rule);
        });
        return next;
    }
    function CandidateVisual({ accent, badge, className = "", label, title }) {
        return (jsxs("div", { className: [
                "relative overflow-hidden rounded-[18px] border border-white/80",
                className
            ]
                .filter(Boolean)
                .join(" "), style: {
                background: `linear-gradient(145deg, ${hexToRgba(accent, 0.3)} 0%, rgba(255, 255, 255, 0.96) 62%)`
            }, children: [jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.65)_100%)]" }), jsxs("div", { className: "relative flex h-full flex-col justify-between p-3", children: [jsxs("div", { className: "flex items-start justify-between gap-2", children: [jsx("span", { className: "inline-flex rounded-full px-2 py-1 text-[9px] font-semibold", style: {
                                        backgroundColor: hexToRgba(accent, 0.14),
                                        color: "#111111"
                                    }, children: label }), jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[12px] font-black text-ink shadow-sm", children: badge })] }), jsx("div", { className: "max-w-[9rem] text-[12px] font-black leading-5 text-ink", children: title })] })] }));
    }
    function SectionTitle({ subtitle, title }) {
        return (jsxs("header", { children: [jsx("h1", { className: "text-[20px] font-black tracking-normal text-ink", children: title }), subtitle ? (jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: subtitle })) : null] }));
    }
    function PillButton({ active, children, onClick }) {
        return (jsx("button", { className: [
                "rounded-full px-3 py-2 text-[11px] font-semibold transition",
                active ? "bg-ink text-white" : "bg-[#f3f3f1] text-black/55"
            ]
                .filter(Boolean)
                .join(" "), onClick: onClick, type: "button", children: children }));
    }
    function HomeScreen({ onSelect }) {
        const entries = verticalOrder.map((key) => ({
            description: prototypeData[key].homeDescription,
            key,
            title: key === "waimai"
                ? "外卖｜智能帮我选"
                : key === "store"
                    ? "到店餐饮｜帮我比套餐"
                    : "酒店｜酒店 PK 对比"
        }));
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-8 pt-5", children: [jsxs("section", { className: "rounded-[22px] bg-brand px-5 py-5 text-ink shadow-card", children: [jsx("p", { className: "text-[20px] font-black leading-8", children: "\u7F8E\u56E2\u672C\u5730\u751F\u6D3B\u667A\u80FD\u51B3\u7B56\u52A9\u624B" }), jsx("p", { className: "mt-3 max-w-[292px] text-[12px] leading-6 text-black/65", children: "AI \u5E2E\u4F60\u5206\u6790\u4EF7\u683C\u3001\u914D\u9001\u3001\u89C4\u5219\u9650\u5236\u548C\u8BC4\u4EF7\u98CE\u9669\uFF0C\u51CF\u5C11\u7EA0\u7ED3\u65F6\u95F4\uFF0C\u5C3D\u5FEB\u505A\u51FA\u66F4\u7A33\u7684\u9009\u62E9\u3002" })] }), jsx("section", { className: "mt-6 space-y-4", "aria-label": "\u4E1A\u52A1\u5165\u53E3", children: entries.map((entry) => (jsx(motion.button, { whileHover: { y: -2 }, whileTap: { scale: 0.99 }, className: "block w-full text-left", onClick: () => onSelect(entry.key), type: "button", children: jsx(Surface, { className: "overflow-hidden rounded-[22px] px-4 py-4", children: jsxs("article", { className: "flex items-center gap-4", children: [jsx("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-[#fff7cf] text-[15px] font-black text-ink", children: prototypeData[entry.key].icon }), jsxs("div", { className: "min-w-0 flex-1", children: [jsx("h2", { className: "text-[15px] font-black text-ink", children: entry.title }), jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: entry.description })] }), jsx("div", { className: "text-[18px] text-black/35", children: ">" })] }) }) }, entry.key))) })] }));
    }
    function SelectScreen({ activeSort, candidates, onOpenPool, onSortChange, onSearchChange, onToggleCandidate, searchValue, selectedIds, vertical }) {
        const data = prototypeData[vertical];
        const selectedSet = new Set(selectedIds);
        const [filterMenuOpen, setFilterMenuOpen] = useState(false);
        const activeFilter = data.quickFilters.find((filter) => filter.key === activeSort);
        return (jsxs("main", { className: "relative h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-6 pt-3", children: [jsx(SectionTitle, { title: data.selectTitle }), jsx("section", { className: "mt-4", children: jsx(SearchField, { onChange: onSearchChange, placeholder: data.searchPlaceholder, value: searchValue }) }), filterMenuOpen ? (jsx("button", { "aria-label": "\u5173\u95ED\u7B5B\u9009\u83DC\u5355", className: "absolute inset-0 z-10 cursor-default bg-transparent", onClick: () => setFilterMenuOpen(false), type: "button" })) : null, jsxs("section", { className: "relative z-20 mt-4", "aria-label": "\u6392\u5E8F\u7B5B\u9009", children: [jsxs("button", { className: "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-ink shadow-card transition", onClick: () => setFilterMenuOpen((current) => !current), type: "button", children: [jsx("span", { children: activeFilter?.label ?? "推荐优先" }), jsx("span", { "aria-hidden": "true", className: [
                                        "text-[10px] text-black/45 transition-transform",
                                        filterMenuOpen ? "rotate-180" : ""
                                    ]
                                        .filter(Boolean)
                                        .join(" "), children: "v" })] }), jsx(AnimatePresence, { children: filterMenuOpen ? (jsx(motion.div, { animate: { opacity: 1, y: 0, scale: 1 }, className: "absolute left-0 top-[46px] w-[148px] overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_22px_40px_rgba(17,17,17,0.12)]", exit: { opacity: 0, y: -6, scale: 0.98 }, initial: { opacity: 0, y: -6, scale: 0.98 }, transition: { duration: 0.18 }, children: jsx("div", { className: "space-y-1", children: data.quickFilters.map((filter) => {
                                        const active = filter.key === activeSort;
                                        return (jsxs("button", { className: [
                                                "relative flex h-11 w-full items-center rounded-[14px] pl-4 pr-3 text-left text-[13px] font-semibold transition",
                                                active ? "bg-[#fff8d8] text-ink" : "text-black/55 hover:bg-[#f6f6f4]"
                                            ]
                                                .filter(Boolean)
                                                .join(" "), onClick: () => {
                                                onSortChange(filter.key);
                                                setFilterMenuOpen(false);
                                            }, type: "button", children: [active ? (jsx("span", { className: "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-brand" })) : null, jsx("span", { className: "block leading-5", children: filter.label })] }, filter.key));
                                    }) }) })) : null })] }), jsx("section", { className: "mt-5 space-y-3", children: candidates.length > 0 ? (candidates.map((candidate) => {
                        const selected = selectedSet.has(candidate.id);
                        return (jsxs(motion.article, { layout: true, className: "relative overflow-hidden rounded-[20px] bg-white shadow-card", children: [jsx("div", { className: "absolute left-0 top-0 h-full w-1.5", style: { backgroundColor: candidate.accent } }), jsxs("div", { className: "relative px-4 py-4", children: [jsxs("div", { className: "flex items-start gap-3", children: [jsxs("div", { className: "min-w-0 flex-1", children: [jsxs("div", { className: "flex items-center gap-2", children: [jsx("h2", { className: "text-[15px] font-black text-ink", children: candidate.shortTitle }), jsx("span", { className: "rounded-full px-2 py-1 text-[9px] font-semibold", style: {
                                                                        backgroundColor: hexToRgba(candidate.accent, 0.16)
                                                                    }, children: candidate.chip })] }), jsx("p", { className: "mt-2 text-[11px] text-black/55", children: candidate.meta }), jsx("p", { className: "mt-1 text-[11px] text-black/55", children: candidate.support }), jsx("p", { className: "mt-2 text-[12px] font-semibold text-[#f08a00]", children: candidate.price })] }), jsx("span", { className: "shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold text-ink", style: { backgroundColor: hexToRgba(candidate.accent, 0.14) }, children: candidate.chip })] }), jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [jsxs("div", { className: "text-[10px] text-black/45", children: ["\u8BC4\u5206 ", candidate.metrics.rating, " \u00B7 \u98CE\u9669 ", candidate.metrics.risk] }), jsx(Button, { className: "rounded-[10px] px-4 text-[11px]", onClick: () => onToggleCandidate(candidate.id), variant: selected ? "muted" : "primary", children: selected ? "已加入" : "加入对比" })] })] })] }, candidate.id));
                    })) : (jsxs(Surface, { className: "px-5 py-8 text-center", children: [jsx("p", { className: "text-[13px] font-semibold text-ink", children: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u5BF9\u8C61" }), jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: "\u6362\u4E2A\u5173\u952E\u8BCD\u8BD5\u8BD5\uFF0C\u6216\u8005\u56DE\u5230\u63A8\u8350\u4F18\u5148\u770B\u770B\u7CFB\u7EDF\u5DF2\u7ECF\u6574\u7406\u597D\u7684\u5019\u9009\u3002" })] })) }), jsx("footer", { className: "sticky bottom-0 mt-5", children: jsx(Surface, { className: "rounded-[20px] bg-white/95 px-4 py-4 backdrop-blur", children: jsxs("div", { className: "flex items-center gap-3", children: [jsxs("div", { className: "min-w-0 flex-1", children: [jsxs("div", { className: "text-[13px] font-black text-ink", children: ["\u5DF2\u9009\u62E9 ", selectedIds.length, "/6"] }), jsx("div", { className: "mt-1 text-[10px] leading-4 text-black/45", children: "\u81F3\u5C11\u9700\u8981 2 \u4E2A\u5BF9\u8C61\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4" })] }), jsx(Button, { className: "rounded-[10px] px-4 text-[11px]", onClick: onOpenPool, children: "\u67E5\u770B" })] }) }) })] }));
    }
    function PoolScreen({ onContinue, onRemove, onStartCompare, selectedCandidates, vertical }) {
        const data = prototypeData[vertical];
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [jsx(SectionTitle, { subtitle: data.poolHint, title: "\u5019\u9009\u6C60" }), jsx("section", { className: "mt-5 space-y-3", children: selectedCandidates.map((candidate) => (jsx(Surface, { className: "rounded-[18px] px-4 py-4", children: jsxs("article", { className: "flex items-center gap-3", children: [jsx("div", { className: "h-10 w-1.5 rounded-full", style: { backgroundColor: candidate.accent } }), jsxs("div", { className: "min-w-0 flex-1", children: [jsx("h2", { className: "text-[13px] font-black text-ink", children: candidate.shortTitle }), jsx("p", { className: "mt-1 text-[11px] text-black/55", children: candidate.meta })] }), jsx(Button, { className: "rounded-[10px] px-3 text-[11px]", onClick: () => onRemove(candidate.id), variant: "muted", children: "\u5220\u9664" })] }) }, candidate.id))) }), jsx("section", { className: "mt-6", children: jsx(Surface, { className: "rounded-[18px] bg-[#fff7cf] px-4 py-4", children: jsx("p", { className: "text-[11px] leading-5 text-black/65", children: data.poolHint }) }) }), jsxs("section", { className: "mt-7 space-y-3", children: [jsx(Button, { block: true, onClick: onStartCompare, children: "\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4" }), jsx(Button, { block: true, onClick: onContinue, variant: "ghost", children: "\u7EE7\u7EED\u6DFB\u52A0" })] })] }));
    }
    function CompareScreen({ activeTab, compareCandidates, onChangeTab, onGoRisk, onGoSummary, onToggleDifference, onTriggerPrice, onlyDifferences, vertical }) {
        const data = prototypeData[vertical];
        const tab = data.compareTabs.find((item) => item.key === activeTab) ?? data.compareTabs[0];
        const rows = onlyDifferences
            ? tab.rows.filter((row) => {
                const values = new Set(compareCandidates.map((candidate) => getMetricValue(candidate, row.key)));
                return values.size > 1;
            })
            : tab.rows;
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [jsx(SectionTitle, { subtitle: data.compareSubTip, title: data.compareTitle }), jsx(Surface, { className: "mt-4 rounded-[18px] bg-[#fff7cf] px-4 py-4", children: jsx("p", { className: "text-[11px] leading-5 text-black/65", children: data.compareTip }) }), jsx("nav", { "aria-label": "\u5BF9\u6BD4\u7EF4\u5EA6", className: "mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]", children: data.compareTabs.map((item) => (jsx(PillButton, { active: item.key === activeTab, onClick: () => onChangeTab(item.key), children: item.label }, item.key))) }), jsxs("section", { className: "mt-4 overflow-hidden rounded-[20px] bg-white shadow-card", children: [jsxs("div", { className: "grid min-w-[320px] border-b border-line bg-[#f7f6f2] text-[10px] font-semibold text-black/45", style: {
                                gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
                            }, children: [jsx("div", { className: "px-3 py-3", children: "\u5BF9\u6BD4\u9879" }), compareCandidates.map((candidate) => (jsxs("div", { className: "px-3 py-3 text-center", children: [candidate.summary.badge, " ", candidate.shortTitle] }, candidate.id)))] }), rows.length > 0 ? (rows.map((row) => (jsxs("div", { className: "grid border-b border-line/70 text-[11px] last:border-b-0", style: {
                                gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
                            }, children: [jsx("div", { className: "px-3 py-3 font-semibold text-black/55", children: row.label }), compareCandidates.map((candidate) => (jsx("div", { className: "grid place-items-center px-3 py-3 text-center text-ink", children: getMetricValue(candidate, row.key) }, `${candidate.id}-${row.key}`)))] }, row.key)))) : (jsx("div", { className: "px-4 py-8 text-center text-[11px] leading-5 text-black/55", children: "\u5F53\u524D\u7EF4\u5EA6\u4E0B\u6CA1\u6709\u660E\u663E\u5DEE\u5F02\uFF0C\u5DF2\u7ECF\u5E2E\u4F60\u6536\u8D77\u76F8\u540C\u9879\u4E86\u3002" }))] }), jsxs("section", { className: "mt-5 grid grid-cols-2 gap-3", children: [jsx(Button, { block: true, onClick: onToggleDifference, variant: "ghost", children: onlyDifferences ? "显示全部" : "只看差异" }), jsx(Button, { block: true, onClick: onTriggerPrice, variant: "ghost", children: "\u91CD\u65B0\u8BA1\u7B97\u5230\u624B\u4EF7" })] }), jsxs("section", { className: "mt-3 grid grid-cols-2 gap-3", children: [jsx(Button, { block: true, onClick: onGoRisk, children: "\u67E5\u770B\u8BC4\u4EF7\u98CE\u9669" }), jsx(Button, { block: true, onClick: onGoSummary, variant: "secondary", children: "\u751F\u6210 AI \u51B3\u7B56\u603B\u7ED3" })] })] }));
    }
    function RiskScreen({ compareCandidates, onGoCompare, onGoSummary, vertical }) {
        const data = prototypeData[vertical];
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [jsx(SectionTitle, { subtitle: data.riskTip, title: data.riskTitle }), jsx("section", { className: "mt-5 space-y-4", children: compareCandidates.map((candidate) => (jsx(Surface, { className: "relative overflow-hidden rounded-[20px] px-4 py-4", children: jsxs("article", { className: "flex items-start gap-3", children: [jsxs("div", { className: "min-w-0 flex-1", children: [jsxs("div", { className: "flex items-center gap-2", children: [jsx("h2", { className: "text-[14px] font-black text-ink", children: candidate.shortTitle }), jsx("span", { className: "rounded-full bg-[#fff1c7] px-2 py-1 text-[9px] font-semibold text-[#ff9f2e]", children: candidate.review.tag })] }), jsxs("p", { className: "mt-3 text-[10px] leading-5 text-[#10b979]", children: ["\u9AD8\u9891\u597D\u8BC4\uFF1A", candidate.review.positive] }), jsxs("p", { className: "mt-1 text-[10px] leading-5 text-[#ff5a66]", children: ["\u9AD8\u9891\u5DEE\u8BC4\uFF1A", candidate.review.negative] }), jsxs("p", { className: "mt-2 text-[10px] leading-5 text-black/55", children: ["\u6210\u672C / \u98CE\u9669\uFF1A", candidate.review.caution] })] }), jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[104px] w-[118px] shrink-0", label: candidate.review.riskTag, title: candidate.shortTitle })] }) }, candidate.id))) }), jsxs("section", { className: "mt-6 space-y-3", children: [jsx(Button, { block: true, onClick: onGoCompare, variant: "ghost", children: "\u8FD4\u56DE\u667A\u80FD\u5BF9\u6BD4" }), jsx(Button, { block: true, onClick: onGoSummary, variant: "secondary", children: "\u751F\u6210 AI \u51B3\u7B56\u603B\u7ED3" })] })] }));
    }
    function SummaryScreen({ compareCandidates, onChangePool, onConfirm, onFavorite, onShare, vertical }) {
        const data = prototypeData[vertical];
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [jsx(SectionTitle, { subtitle: data.summaryTip, title: data.summaryTitle }), jsx("section", { className: "mt-5 space-y-4", children: compareCandidates.map((candidate) => (jsx(Surface, { className: "overflow-hidden rounded-[20px] px-4 py-4", style: { backgroundColor: candidate.summary.tint }, children: jsxs("article", { className: "flex items-start gap-3", children: [jsxs("div", { className: "min-w-0 flex-1", children: [jsx("p", { className: "text-[10px] font-semibold text-[#ff9f2e]", children: candidate.summary.label }), jsx("h2", { className: "mt-2 text-[15px] font-black text-ink", children: candidate.shortTitle }), jsxs("p", { className: "mt-2 text-[10px] leading-5 text-black/60", children: ["\u63A8\u8350\u7406\u7531\uFF1A", candidate.summary.reason] }), jsxs("p", { className: "text-[10px] leading-5 text-black/60", children: ["\u53EF\u80FD\u98CE\u9669\uFF1A", candidate.summary.risk] }), jsxs("p", { className: "text-[10px] leading-5 text-black/60", children: ["\u9002\u5408\u4EBA\u7FA4\uFF1A", candidate.summary.audience] })] }), jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[118px] w-[118px] shrink-0", label: candidate.chip, title: candidate.shortTitle })] }) }, candidate.id))) }), jsxs("section", { className: "mt-6 grid grid-cols-2 gap-3", children: [jsx(Button, { block: true, onClick: onConfirm, children: "\u53BB\u4E0B\u5355" }), jsx(Button, { block: true, onClick: onFavorite, variant: "secondary", children: "\u52A0\u5165\u6536\u85CF" }), jsx(Button, { block: true, onClick: onChangePool, variant: "muted", children: "\u66F4\u6362\u5BF9\u6BD4\u5BF9\u8C61" }), jsx(Button, { block: true, onClick: onShare, variant: "muted", children: "\u5206\u4EAB\u7ED9\u670B\u53CB" })] })] }));
    }
    function ConfirmScreen({ candidate, onFavorite, onGoDetail, onGoSummary, vertical }) {
        const data = prototypeData[vertical];
        return (jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [jsx(SectionTitle, { title: data.confirmTitle }), jsx(Surface, { className: "mt-4 overflow-hidden rounded-[20px] p-4", children: jsxs("article", { className: "relative", children: [jsx("div", { className: "absolute inset-0 rounded-[16px]", style: {
                                    background: `linear-gradient(135deg, ${hexToRgba(candidate.accent, 0.2)} 0%, rgba(255,255,255,0.88) 60%)`
                                } }), jsxs("div", { className: "relative flex items-center gap-3", children: [jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[62px] w-[62px] shrink-0", label: candidate.chip, title: candidate.summary.badge }), jsxs("div", { className: "min-w-0", children: [jsx("h2", { className: "text-[15px] font-black text-ink", children: candidate.title }), jsxs("p", { className: "mt-2 text-[11px] text-[#10b979]", children: ["AI \u5224\u65AD\uFF1A", candidate.summary.label] })] })] })] }) }), jsx("section", { className: "mt-7 space-y-3", children: data.confirmRows.map((row) => (jsx(Surface, { className: "rounded-[16px] px-4 py-4", children: jsxs("div", { className: "flex items-center gap-3", children: [jsx("div", { className: "text-[11px] text-black/55", children: row.label }), jsx("div", { className: "ml-auto max-w-[210px] text-right text-[11px] font-semibold text-ink", children: getMetricValue(candidate, row.key) })] }) }, row.key))) }), jsxs("section", { className: "mt-7 space-y-3", children: [jsx(Button, { block: true, onClick: onGoDetail, children: data.primaryAction }), jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsx(Button, { block: true, onClick: onGoSummary, variant: "ghost", children: "\u8FD4\u56DE\u603B\u7ED3\u9875" }), jsx(Button, { block: true, onClick: onFavorite, variant: "secondary", children: data.favoriteAction })] })] })] }));
    }
    function DetailScreen({ candidate, vertical }) {
        const data = prototypeData[vertical];
        return (jsxs("main", { className: "h-full overflow-y-auto bg-white", children: [jsx("section", { className: "border-b border-line bg-white px-5 pb-5 pt-5", children: jsxs("div", { className: "flex gap-3", children: [jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[86px] w-[86px] shrink-0", label: candidate.chip, title: candidate.summary.badge }), jsxs("div", { className: "min-w-0 flex-1", children: [jsx("h1", { className: "text-[17px] font-black text-ink", children: candidate.details.title }), jsx("p", { className: "mt-2 text-[11px] text-black/55", children: candidate.details.subtitle }), jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: candidate.details.tags.map((tag) => (jsx("span", { className: "rounded-full bg-[#fff4bd] px-3 py-1 text-[10px] font-semibold text-[#ff8a00]", children: tag }, tag))) })] })] }) }), jsx("nav", { className: "flex gap-6 border-b border-line px-5", children: data.detailTabs.map((tab, index) => (jsx("div", { className: [
                            "py-4 text-[13px]",
                            index === 0 ? "font-black text-ink" : "text-black/45"
                        ]
                            .filter(Boolean)
                            .join(" "), children: tab }, tab))) }), jsxs("section", { className: "bg-[#f6f6f4] px-5 py-5", children: [jsxs(Surface, { className: "rounded-[18px] p-4", children: [jsx("h2", { className: "text-[13px] font-black text-ink", children: vertical === "hotel" ? "可订房型" : "推荐内容" }), jsx("div", { className: "mt-4 space-y-4", children: candidate.details.menu.map((item, index) => (jsxs("article", { className: "flex items-center gap-3", children: [jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[68px] w-[68px] shrink-0", label: index === 0 ? "AI 推荐" : "备选", title: index === 0 ? candidate.summary.badge : candidate.title.slice(0, 2) }), jsxs("div", { className: "min-w-0 flex-1", children: [jsx("h3", { className: "text-[12px] font-black text-ink", children: item.name }), jsx("p", { className: "mt-1 text-[10px] leading-5 text-black/55", children: item.note }), jsx("p", { className: "mt-1 text-[12px] font-semibold text-[#f08a00]", children: item.price })] }), jsx(Button, { className: "rounded-[10px] px-3 text-[10px]", variant: "primary", children: item.cta })] }, item.name))) })] }), jsxs(Surface, { className: "mt-4 rounded-[18px] p-4", children: [jsx("h2", { className: "text-[13px] font-black text-ink", children: "\u4E0B\u5355\u63D0\u9192" }), jsx("p", { className: "mt-3 text-[10px] leading-5 text-black/55", children: candidate.details.notice })] })] })] }));
    }
    function App() {
        const [vertical, setVertical] = useState("waimai");
        const [screen, setScreen] = useState("home");
        const [modal, setModal] = useState("none");
        const [searchByVertical, setSearchByVertical] = useState(initialSearchByVertical);
        const [selectedByVertical, setSelectedByVertical] = useState(initialSelectedByVertical);
        const [sortByVertical, setSortByVertical] = useState(initialSortByVertical);
        const [compareTabByVertical, setCompareTabByVertical] = useState(initialCompareTabByVertical);
        const [onlyDifferences, setOnlyDifferences] = useState(false);
        const data = prototypeData[vertical];
        const selectedIds = selectedByVertical[vertical];
        const searchValue = searchByVertical[vertical];
        const activeSort = sortByVertical[vertical];
        const activeCompareTab = compareTabByVertical[vertical];
        const filteredCandidates = useMemo(() => {
            const query = searchValue.trim().toLowerCase();
            const visible = prototypeData[vertical].candidates.filter((candidate) => {
                if (!query) {
                    return true;
                }
                const haystack = [
                    candidate.title,
                    candidate.shortTitle,
                    candidate.meta,
                    candidate.support,
                    candidate.summary.reason
                ]
                    .join(" ")
                    .toLowerCase();
                return haystack.includes(query);
            });
            return sortCandidates(visible, activeSort);
        }, [activeSort, searchValue, vertical]);
        const selectedCandidates = useMemo(() => {
            const items = prototypeData[vertical].candidates.filter((candidate) => selectedIds.includes(candidate.id));
            return selectedIds
                .map((id) => items.find((candidate) => candidate.id === id))
                .filter((candidate) => Boolean(candidate));
        }, [selectedIds, vertical]);
        const compareCandidates = useMemo(() => selectedCandidates.slice(0, 3), [selectedCandidates]);
        const rankedCandidates = useMemo(() => [...compareCandidates].sort((left, right) => left.summary.rank - right.summary.rank), [compareCandidates]);
        const recommendedCandidate = rankedCandidates[0] ?? prototypeData[vertical].candidates[0];
        const historyLabel = useMemo(() => {
            if (screen === "home") {
                return "首页";
            }
            return `${data.name} / ${screenLabels[screen]}`;
        }, [data.name, screen]);
        function chooseVertical(nextVertical) {
            setVertical(nextVertical);
            setScreen("select");
            setModal("none");
        }
        function goBack() {
            if (screen === "home") {
                return;
            }
            if (screen === "select") {
                setScreen("home");
                return;
            }
            const index = flowOrder.indexOf(screen);
            setScreen(flowOrder[Math.max(0, index - 1)]);
        }
        function toggleSelected(id) {
            setSelectedByVertical((previous) => {
                const current = previous[vertical];
                if (current.includes(id)) {
                    return {
                        ...previous,
                        [vertical]: current.filter((item) => item !== id)
                    };
                }
                return {
                    ...previous,
                    [vertical]: [...current, id].slice(0, 6)
                };
            });
        }
        function updateSearch(value) {
            setSearchByVertical((previous) => ({ ...previous, [vertical]: value }));
        }
        function updateSort(value) {
            setSortByVertical((previous) => ({ ...previous, [vertical]: value }));
        }
        function updateCompareTab(value) {
            setCompareTabByVertical((previous) => ({ ...previous, [vertical]: value }));
        }
        function startCompare() {
            if (selectedCandidates.length < 2) {
                setModal("insufficient");
                return;
            }
            setScreen("compare");
        }
        function renderScreen() {
            if (screen === "home") {
                return jsx(HomeScreen, { onSelect: chooseVertical });
            }
            if (screen === "select") {
                return (jsx(SelectScreen, { activeSort: activeSort, candidates: filteredCandidates, onOpenPool: () => setScreen("pool"), onSearchChange: updateSearch, onSortChange: updateSort, onToggleCandidate: toggleSelected, searchValue: searchValue, selectedIds: selectedIds, vertical: vertical }));
            }
            if (screen === "pool") {
                return (jsx(PoolScreen, { onContinue: () => setScreen("select"), onRemove: toggleSelected, onStartCompare: startCompare, selectedCandidates: selectedCandidates, vertical: vertical }));
            }
            if (screen === "compare") {
                return (jsx(CompareScreen, { activeTab: activeCompareTab, compareCandidates: compareCandidates, onChangeTab: updateCompareTab, onGoRisk: () => setScreen("risk"), onGoSummary: () => setScreen("summary"), onToggleDifference: () => setOnlyDifferences((current) => !current), onTriggerPrice: () => setModal("price"), onlyDifferences: onlyDifferences, vertical: vertical }));
            }
            if (screen === "risk") {
                return (jsx(RiskScreen, { compareCandidates: compareCandidates, onGoCompare: () => setScreen("compare"), onGoSummary: () => setScreen("summary"), vertical: vertical }));
            }
            if (screen === "summary") {
                return (jsx(SummaryScreen, { compareCandidates: rankedCandidates, onChangePool: () => setScreen("pool"), onConfirm: () => setScreen("confirm"), onFavorite: () => setModal("favorite"), onShare: () => setModal("share"), vertical: vertical }));
            }
            if (screen === "confirm") {
                return (jsx(ConfirmScreen, { candidate: recommendedCandidate, onFavorite: () => setModal("favorite"), onGoDetail: () => setScreen("detail"), onGoSummary: () => setScreen("summary"), vertical: vertical }));
            }
            return jsx(DetailScreen, { candidate: recommendedCandidate, vertical: vertical });
        }
        const pageTitle = screen === "home" ? "智能决策助手" : pageTitleByScreen(data)[screen];
        return (jsx("div", { className: "min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#f4f0e6_100%)] px-4 py-6 text-ink md:px-6 md:py-8", children: jsxs("div", { className: "mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[320px_1fr]", children: [jsxs("aside", { className: "space-y-4", children: [jsxs("header", { children: [jsx("p", { className: "text-[24px] font-black tracking-normal", children: "\u7F8E\u56E2\u667A\u80FD\u51B3\u7B56\u52A9\u624B" }), jsx("p", { className: "mt-2 text-[13px] leading-6 text-black/55", children: "React + Tailwind CSS + Framer Motion \u7684\u9AD8\u4FDD\u771F\u4EA4\u4E92\u539F\u578B\uFF0C\u8986\u76D6\u5916\u5356\u3001\u5230\u5E97\u548C\u9152\u5E97\u4E09\u6761\u4E1A\u52A1\u7EBF\u3002" })] }), jsxs(Surface, { className: "rounded-[22px] bg-white/85 p-5 backdrop-blur", children: [jsxs("section", { children: [jsx("p", { className: "text-[12px] font-semibold uppercase tracking-[0.08em] text-black/35", children: "\u5F53\u524D\u8DEF\u5F84" }), jsx("p", { className: "mt-2 text-[15px] font-black text-ink", children: historyLabel })] }), jsxs("section", { className: "mt-5", children: [jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u4E1A\u52A1\u7EBF" }), jsx("div", { className: "mt-3 grid grid-cols-3 gap-2", children: verticalOrder.map((item) => (jsx("button", { className: [
                                                        "h-10 rounded-[12px] text-[12px] font-semibold transition",
                                                        item === vertical ? "bg-brand text-ink" : "bg-[#f3f3f1] text-black/55"
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" "), onClick: () => chooseVertical(item), type: "button", children: prototypeData[item].name }, item))) })] }), jsxs("section", { className: "mt-5", children: [jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u9875\u9762\u72B6\u6001" }), jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: ["home", "select", "pool", "compare", "risk", "summary", "confirm", "detail"].map((item) => (jsx("button", { className: [
                                                        "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                                                        item === screen ? "bg-ink text-white" : "bg-[#f3f3f1] text-black/55"
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" "), onClick: () => setScreen(item), type: "button", children: screenLabels[item] }, item))) })] }), jsxs("section", { className: "mt-5 grid grid-cols-2 gap-3", children: [jsxs(Surface, { className: "rounded-[16px] px-4 py-3", children: [jsx("p", { className: "text-[10px] text-black/45", children: "\u5019\u9009\u6570\u91CF" }), jsx("p", { className: "mt-2 text-[18px] font-black text-ink", children: selectedIds.length })] }), jsxs(Surface, { className: "rounded-[16px] px-4 py-3", children: [jsx("p", { className: "text-[10px] text-black/45", children: "\u5F53\u524D\u6392\u5E8F" }), jsx("p", { className: "mt-2 text-[13px] font-black text-ink", children: data.quickFilters.find((item) => item.key === activeSort)?.label })] })] }), screen === "compare" ? (jsxs("section", { className: "mt-5", children: [jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u5BF9\u6BD4\u7EF4\u5EA6" }), jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: data.compareTabs.map((tab) => (jsx("button", { className: [
                                                        "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                                                        tab.key === activeCompareTab
                                                            ? "bg-brand text-ink"
                                                            : "bg-[#f3f3f1] text-black/55"
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" "), onClick: () => updateCompareTab(tab.key), type: "button", children: tab.label }, tab.key))) })] })) : null, jsxs("section", { className: "mt-5 grid grid-cols-2 gap-2", children: [jsx(Button, { onClick: () => setModal("sort"), variant: "ghost", children: "\u6392\u5E8F\u9762\u677F" }), jsx(Button, { onClick: () => setModal("price"), variant: "ghost", children: "\u4EF7\u683C\u66F4\u65B0" }), jsx(Button, { onClick: () => setModal("aiError"), variant: "ghost", children: "AI \u5F02\u5E38" }), jsx(Button, { onClick: () => setModal("share"), variant: "ghost", children: "\u5206\u4EAB\u9762\u677F" })] })] })] }), jsx("main", { className: "flex items-start justify-center lg:justify-end", children: jsxs(PhoneShell, { onBack: goBack, pageTitle: pageTitle, showBack: screen !== "home", children: [jsx(AnimatePresence, { mode: "wait", children: jsx(motion.div, { animate: { opacity: 1, y: 0 }, className: "h-full", exit: { opacity: 0, y: 10 }, initial: { opacity: 0, y: 10 }, transition: { duration: 0.22 }, children: renderScreen() }, `${vertical}-${screen}`) }), jsx(Modal, { open: modal === "sort", children: jsxs("div", { className: "text-center", children: [jsx("p", { className: "text-[16px] font-black text-ink", children: "\u6392\u5E8F\u7B5B\u9009" }), jsx("div", { className: "mt-5 space-y-3", children: data.quickFilters.map((option) => (jsx("button", { className: [
                                                        "block h-10 w-full rounded-[12px] text-[12px] font-semibold transition",
                                                        option.key === activeSort
                                                            ? "bg-brand text-ink"
                                                            : "bg-[#f3f3f1] text-black/55"
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" "), onClick: () => {
                                                        updateSort(option.key);
                                                        setModal("none");
                                                    }, type: "button", children: option.label }, option.key))) })] }) }), jsx(Modal, { open: modal === "insufficient", children: jsxs("div", { className: "text-center", children: [jsx("p", { className: "text-[16px] font-black text-ink", children: "\u5019\u9009\u5BF9\u8C61\u4E0D\u8DB3" }), jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u8BF7\u81F3\u5C11\u9009\u62E9 2 \u4E2A\u5BF9\u8C61\u518D\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4\u3002" }), jsx("div", { className: "mt-5", children: jsx(Button, { block: true, onClick: () => {
                                                        setModal("none");
                                                        setScreen("select");
                                                    }, children: "\u7EE7\u7EED\u6DFB\u52A0" }) })] }) }), jsx(Modal, { open: modal === "price", children: jsxs("div", { className: "text-center", children: [jsx("p", { className: "text-[16px] font-black text-ink", children: "\u4EF7\u683C\u5DF2\u66F4\u65B0" }), jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u4F18\u60E0\u6216\u5E93\u5B58\u53D1\u751F\u53D8\u5316\uFF0C\u5EFA\u8BAE\u91CD\u65B0\u786E\u8BA4\u5230\u624B\u4EF7\u540E\u518D\u7EE7\u7EED\u51B3\u7B56\u3002" }), jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [jsx(Button, { onClick: () => setModal("none"), children: "\u91CD\u65B0\u8BA1\u7B97" }), jsx(Button, { onClick: () => setModal("none"), variant: "ghost", children: "\u7A0D\u540E\u518D\u8BF4" })] })] }) }), jsx(Modal, { open: modal === "aiError", children: jsxs("div", { className: "text-center", children: [jsx("p", { className: "text-[16px] font-black text-ink", children: "AI \u603B\u7ED3\u52A0\u8F7D\u5931\u8D25" }), jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "AI \u6682\u65F6\u6CA1\u6709\u8FD4\u56DE\u7ED3\u679C\uFF0C\u4F46\u57FA\u7840\u5BF9\u6BD4\u548C\u98CE\u9669\u4FE1\u606F\u4ECD\u7136\u53EF\u4EE5\u7EE7\u7EED\u67E5\u770B\u3002" }), jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [jsx(Button, { onClick: () => {
                                                            setModal("none");
                                                            setScreen("summary");
                                                        }, children: "\u91CD\u65B0\u751F\u6210" }), jsx(Button, { onClick: () => setModal("none"), variant: "ghost", children: "\u5148\u770B\u57FA\u7840\u5BF9\u6BD4" })] })] }) }), jsx(Modal, { open: modal === "favorite", children: jsxs("div", { className: "text-center", children: [jsx("p", { className: "text-[16px] font-black text-ink", children: "\u6536\u85CF\u6210\u529F" }), jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u5DF2\u4FDD\u5B58\u63A8\u8350\u7ED3\u679C\uFF0C\u4E4B\u540E\u53EF\u4EE5\u5728\u6536\u85CF\u5939\u91CC\u7EE7\u7EED\u67E5\u770B\u3002" }), jsx("div", { className: "mt-5", children: jsx(Button, { block: true, onClick: () => setModal("none"), children: "\u77E5\u9053\u4E86" }) })] }) }), jsxs(BottomSheet, { open: modal === "share", children: [jsx("div", { className: "text-center text-[16px] font-black text-ink", children: "\u5206\u4EAB\u81F3" }), jsx("div", { className: "mt-6 grid grid-cols-4 gap-y-6 text-center", children: shareOptions.map((option) => {
                                                const darkText = option.color === "#ffd400" || option.color === "#d9d9d9";
                                                return (jsxs("button", { className: "text-center", onClick: () => setModal("none"), type: "button", children: [jsx("span", { className: "mx-auto grid h-11 w-11 place-items-center rounded-full text-[14px] font-black", style: {
                                                                backgroundColor: option.color,
                                                                color: darkText ? "#111111" : "#ffffff"
                                                            }, children: option.label.slice(0, 1) }), jsx("span", { className: "mt-2 block text-[10px] text-black/45", children: option.label })] }, option.label));
                                            }) })] })] }) })] }) }));
    }

    ReactDOMGlobal.createRoot(document.getElementById("root")).render(jsx(ReactGlobal.StrictMode, { children: jsx(App, {}) }));

})();
