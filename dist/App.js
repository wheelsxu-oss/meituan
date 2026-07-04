import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "./vendor/react.js";
import { AnimatePresence, motion } from "./vendor/framer-motion.js";
import { BottomSheet } from "./components/mds/BottomSheet.js";
import { Button } from "./components/mds/Button.js";
import { Modal } from "./components/mds/Modal.js";
import { PhoneShell } from "./components/mds/PhoneShell.js";
import { SearchField } from "./components/mds/SearchField.js";
import { Surface } from "./components/mds/Surface.js";
import { flowOrder, initialCompareTabByVertical, initialSearchByVertical, initialSelectedByVertical, initialSortByVertical, prototypeData, screenLabels, shareOptions, verticalOrder } from "./data/prototypeData.js";
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
    return (_jsxs("div", { className: [
            "relative overflow-hidden rounded-[18px] border border-white/80",
            className
        ]
            .filter(Boolean)
            .join(" "), style: {
            background: `linear-gradient(145deg, ${hexToRgba(accent, 0.3)} 0%, rgba(255, 255, 255, 0.96) 62%)`
        }, children: [_jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.65)_100%)]" }), _jsxs("div", { className: "relative flex h-full flex-col justify-between p-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("span", { className: "inline-flex rounded-full px-2 py-1 text-[9px] font-semibold", style: {
                                    backgroundColor: hexToRgba(accent, 0.14),
                                    color: "#111111"
                                }, children: label }), _jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[12px] font-black text-ink shadow-sm", children: badge })] }), _jsx("div", { className: "max-w-[9rem] text-[12px] font-black leading-5 text-ink", children: title })] })] }));
}
function SectionTitle({ subtitle, title }) {
    return (_jsxs("header", { children: [_jsx("h1", { className: "text-[20px] font-black tracking-normal text-ink", children: title }), subtitle ? (_jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: subtitle })) : null] }));
}
function PillButton({ active, children, onClick }) {
    return (_jsx("button", { className: [
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
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-8 pt-5", children: [_jsxs("section", { className: "rounded-[22px] bg-brand px-5 py-5 text-ink shadow-card", children: [_jsx("p", { className: "text-[20px] font-black leading-8", children: "\u7F8E\u56E2\u672C\u5730\u751F\u6D3B\u667A\u80FD\u51B3\u7B56\u52A9\u624B" }), _jsx("p", { className: "mt-3 max-w-[292px] text-[12px] leading-6 text-black/65", children: "AI \u5E2E\u4F60\u5206\u6790\u4EF7\u683C\u3001\u914D\u9001\u3001\u89C4\u5219\u9650\u5236\u548C\u8BC4\u4EF7\u98CE\u9669\uFF0C\u51CF\u5C11\u7EA0\u7ED3\u65F6\u95F4\uFF0C\u5C3D\u5FEB\u505A\u51FA\u66F4\u7A33\u7684\u9009\u62E9\u3002" })] }), _jsx("section", { className: "mt-6 space-y-4", "aria-label": "\u4E1A\u52A1\u5165\u53E3", children: entries.map((entry) => (_jsx(motion.button, { whileHover: { y: -2 }, whileTap: { scale: 0.99 }, className: "block w-full text-left", onClick: () => onSelect(entry.key), type: "button", children: _jsx(Surface, { className: "overflow-hidden rounded-[22px] px-4 py-4", children: _jsxs("article", { className: "flex items-center gap-4", children: [_jsx("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-[#fff7cf] text-[15px] font-black text-ink", children: prototypeData[entry.key].icon }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: "text-[15px] font-black text-ink", children: entry.title }), _jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: entry.description })] }), _jsx("div", { className: "text-[18px] text-black/35", children: ">" })] }) }) }, entry.key))) })] }));
}
function SelectScreen({ activeSort, candidates, onOpenPool, onSortChange, onSearchChange, onToggleCandidate, searchValue, selectedIds, vertical }) {
    const data = prototypeData[vertical];
    const selectedSet = new Set(selectedIds);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const activeFilter = data.quickFilters.find((filter) => filter.key === activeSort);
    return (_jsxs("main", { className: "relative h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-6 pt-3", children: [_jsx(SectionTitle, { title: data.selectTitle }), _jsx("section", { className: "mt-4", children: _jsx(SearchField, { onChange: onSearchChange, placeholder: data.searchPlaceholder, value: searchValue }) }), filterMenuOpen ? (_jsx("button", { "aria-label": "\u5173\u95ED\u7B5B\u9009\u83DC\u5355", className: "absolute inset-0 z-10 cursor-default bg-transparent", onClick: () => setFilterMenuOpen(false), type: "button" })) : null, _jsxs("section", { className: "relative z-20 mt-4", "aria-label": "\u6392\u5E8F\u7B5B\u9009", children: [_jsxs("button", { className: "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-ink shadow-card transition", onClick: () => setFilterMenuOpen((current) => !current), type: "button", children: [_jsx("span", { children: activeFilter?.label ?? "推荐优先" }), _jsx("span", { "aria-hidden": "true", className: [
                                    "text-[10px] text-black/45 transition-transform",
                                    filterMenuOpen ? "rotate-180" : ""
                                ]
                                    .filter(Boolean)
                                    .join(" "), children: "v" })] }), _jsx(AnimatePresence, { children: filterMenuOpen ? (_jsx(motion.div, { animate: { opacity: 1, y: 0, scale: 1 }, className: "absolute left-0 top-[46px] w-[148px] overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_22px_40px_rgba(17,17,17,0.12)]", exit: { opacity: 0, y: -6, scale: 0.98 }, initial: { opacity: 0, y: -6, scale: 0.98 }, transition: { duration: 0.18 }, children: _jsx("div", { className: "space-y-1", children: data.quickFilters.map((filter) => {
                                    const active = filter.key === activeSort;
                                    return (_jsxs("button", { className: [
                                            "relative flex h-11 w-full items-center rounded-[14px] pl-4 pr-3 text-left text-[13px] font-semibold transition",
                                            active ? "bg-[#fff8d8] text-ink" : "text-black/55 hover:bg-[#f6f6f4]"
                                        ]
                                            .filter(Boolean)
                                            .join(" "), onClick: () => {
                                            onSortChange(filter.key);
                                            setFilterMenuOpen(false);
                                        }, type: "button", children: [active ? (_jsx("span", { className: "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-brand" })) : null, _jsx("span", { className: "block leading-5", children: filter.label })] }, filter.key));
                                }) }) })) : null })] }), _jsx("section", { className: "mt-5 space-y-3", children: candidates.length > 0 ? (candidates.map((candidate) => {
                    const selected = selectedSet.has(candidate.id);
                    return (_jsxs(motion.article, { layout: true, className: "relative overflow-hidden rounded-[20px] bg-white shadow-card", children: [_jsx("div", { className: "absolute left-0 top-0 h-full w-1.5", style: { backgroundColor: candidate.accent } }), _jsxs("div", { className: "relative px-4 py-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-[15px] font-black text-ink", children: candidate.shortTitle }), _jsx("span", { className: "rounded-full px-2 py-1 text-[9px] font-semibold", style: {
                                                                    backgroundColor: hexToRgba(candidate.accent, 0.16)
                                                                }, children: candidate.chip })] }), _jsx("p", { className: "mt-2 text-[11px] text-black/55", children: candidate.meta }), _jsx("p", { className: "mt-1 text-[11px] text-black/55", children: candidate.support }), _jsx("p", { className: "mt-2 text-[12px] font-semibold text-[#f08a00]", children: candidate.price })] }), _jsx("span", { className: "shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold text-ink", style: { backgroundColor: hexToRgba(candidate.accent, 0.14) }, children: candidate.chip })] }), _jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [_jsxs("div", { className: "text-[10px] text-black/45", children: ["\u8BC4\u5206 ", candidate.metrics.rating, " \u00B7 \u98CE\u9669 ", candidate.metrics.risk] }), _jsx(Button, { className: "rounded-[10px] px-4 text-[11px]", onClick: () => onToggleCandidate(candidate.id), variant: selected ? "muted" : "primary", children: selected ? "已加入" : "加入对比" })] })] })] }, candidate.id));
                })) : (_jsxs(Surface, { className: "px-5 py-8 text-center", children: [_jsx("p", { className: "text-[13px] font-semibold text-ink", children: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u5BF9\u8C61" }), _jsx("p", { className: "mt-2 text-[11px] leading-5 text-black/55", children: "\u6362\u4E2A\u5173\u952E\u8BCD\u8BD5\u8BD5\uFF0C\u6216\u8005\u56DE\u5230\u63A8\u8350\u4F18\u5148\u770B\u770B\u7CFB\u7EDF\u5DF2\u7ECF\u6574\u7406\u597D\u7684\u5019\u9009\u3002" })] })) }), _jsx("footer", { className: "sticky bottom-0 mt-5", children: _jsx(Surface, { className: "rounded-[20px] bg-white/95 px-4 py-4 backdrop-blur", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "text-[13px] font-black text-ink", children: ["\u5DF2\u9009\u62E9 ", selectedIds.length, "/6"] }), _jsx("div", { className: "mt-1 text-[10px] leading-4 text-black/45", children: "\u81F3\u5C11\u9700\u8981 2 \u4E2A\u5BF9\u8C61\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4" })] }), _jsx(Button, { className: "rounded-[10px] px-4 text-[11px]", onClick: onOpenPool, children: "\u67E5\u770B" })] }) }) })] }));
}
function PoolScreen({ onContinue, onRemove, onStartCompare, selectedCandidates, vertical }) {
    const data = prototypeData[vertical];
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [_jsx(SectionTitle, { subtitle: data.poolHint, title: "\u5019\u9009\u6C60" }), _jsx("section", { className: "mt-5 space-y-3", children: selectedCandidates.map((candidate) => (_jsx(Surface, { className: "rounded-[18px] px-4 py-4", children: _jsxs("article", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-1.5 rounded-full", style: { backgroundColor: candidate.accent } }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: "text-[13px] font-black text-ink", children: candidate.shortTitle }), _jsx("p", { className: "mt-1 text-[11px] text-black/55", children: candidate.meta })] }), _jsx(Button, { className: "rounded-[10px] px-3 text-[11px]", onClick: () => onRemove(candidate.id), variant: "muted", children: "\u5220\u9664" })] }) }, candidate.id))) }), _jsx("section", { className: "mt-6", children: _jsx(Surface, { className: "rounded-[18px] bg-[#fff7cf] px-4 py-4", children: _jsx("p", { className: "text-[11px] leading-5 text-black/65", children: data.poolHint }) }) }), _jsxs("section", { className: "mt-7 space-y-3", children: [_jsx(Button, { block: true, onClick: onStartCompare, children: "\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4" }), _jsx(Button, { block: true, onClick: onContinue, variant: "ghost", children: "\u7EE7\u7EED\u6DFB\u52A0" })] })] }));
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
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [_jsx(SectionTitle, { subtitle: data.compareSubTip, title: data.compareTitle }), _jsx(Surface, { className: "mt-4 rounded-[18px] bg-[#fff7cf] px-4 py-4", children: _jsx("p", { className: "text-[11px] leading-5 text-black/65", children: data.compareTip }) }), _jsx("nav", { "aria-label": "\u5BF9\u6BD4\u7EF4\u5EA6", className: "mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]", children: data.compareTabs.map((item) => (_jsx(PillButton, { active: item.key === activeTab, onClick: () => onChangeTab(item.key), children: item.label }, item.key))) }), _jsxs("section", { className: "mt-4 overflow-hidden rounded-[20px] bg-white shadow-card", children: [_jsxs("div", { className: "grid min-w-[320px] border-b border-line bg-[#f7f6f2] text-[10px] font-semibold text-black/45", style: {
                            gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
                        }, children: [_jsx("div", { className: "px-3 py-3", children: "\u5BF9\u6BD4\u9879" }), compareCandidates.map((candidate) => (_jsxs("div", { className: "px-3 py-3 text-center", children: [candidate.summary.badge, " ", candidate.shortTitle] }, candidate.id)))] }), rows.length > 0 ? (rows.map((row) => (_jsxs("div", { className: "grid border-b border-line/70 text-[11px] last:border-b-0", style: {
                            gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
                        }, children: [_jsx("div", { className: "px-3 py-3 font-semibold text-black/55", children: row.label }), compareCandidates.map((candidate) => (_jsx("div", { className: "grid place-items-center px-3 py-3 text-center text-ink", children: getMetricValue(candidate, row.key) }, `${candidate.id}-${row.key}`)))] }, row.key)))) : (_jsx("div", { className: "px-4 py-8 text-center text-[11px] leading-5 text-black/55", children: "\u5F53\u524D\u7EF4\u5EA6\u4E0B\u6CA1\u6709\u660E\u663E\u5DEE\u5F02\uFF0C\u5DF2\u7ECF\u5E2E\u4F60\u6536\u8D77\u76F8\u540C\u9879\u4E86\u3002" }))] }), _jsxs("section", { className: "mt-5 grid grid-cols-2 gap-3", children: [_jsx(Button, { block: true, onClick: onToggleDifference, variant: "ghost", children: onlyDifferences ? "显示全部" : "只看差异" }), _jsx(Button, { block: true, onClick: onTriggerPrice, variant: "ghost", children: "\u91CD\u65B0\u8BA1\u7B97\u5230\u624B\u4EF7" })] }), _jsxs("section", { className: "mt-3 grid grid-cols-2 gap-3", children: [_jsx(Button, { block: true, onClick: onGoRisk, children: "\u67E5\u770B\u8BC4\u4EF7\u98CE\u9669" }), _jsx(Button, { block: true, onClick: onGoSummary, variant: "secondary", children: "\u751F\u6210 AI \u51B3\u7B56\u603B\u7ED3" })] })] }));
}
function RiskScreen({ compareCandidates, onGoCompare, onGoSummary, vertical }) {
    const data = prototypeData[vertical];
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [_jsx(SectionTitle, { subtitle: data.riskTip, title: data.riskTitle }), _jsx("section", { className: "mt-5 space-y-4", children: compareCandidates.map((candidate) => (_jsx(Surface, { className: "relative overflow-hidden rounded-[20px] px-4 py-4", children: _jsxs("article", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-[14px] font-black text-ink", children: candidate.shortTitle }), _jsx("span", { className: "rounded-full bg-[#fff1c7] px-2 py-1 text-[9px] font-semibold text-[#ff9f2e]", children: candidate.review.tag })] }), _jsxs("p", { className: "mt-3 text-[10px] leading-5 text-[#10b979]", children: ["\u9AD8\u9891\u597D\u8BC4\uFF1A", candidate.review.positive] }), _jsxs("p", { className: "mt-1 text-[10px] leading-5 text-[#ff5a66]", children: ["\u9AD8\u9891\u5DEE\u8BC4\uFF1A", candidate.review.negative] }), _jsxs("p", { className: "mt-2 text-[10px] leading-5 text-black/55", children: ["\u6210\u672C / \u98CE\u9669\uFF1A", candidate.review.caution] })] }), _jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[104px] w-[118px] shrink-0", label: candidate.review.riskTag, title: candidate.shortTitle })] }) }, candidate.id))) }), _jsxs("section", { className: "mt-6 space-y-3", children: [_jsx(Button, { block: true, onClick: onGoCompare, variant: "ghost", children: "\u8FD4\u56DE\u667A\u80FD\u5BF9\u6BD4" }), _jsx(Button, { block: true, onClick: onGoSummary, variant: "secondary", children: "\u751F\u6210 AI \u51B3\u7B56\u603B\u7ED3" })] })] }));
}
function SummaryScreen({ compareCandidates, onChangePool, onConfirm, onFavorite, onShare, vertical }) {
    const data = prototypeData[vertical];
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [_jsx(SectionTitle, { subtitle: data.summaryTip, title: data.summaryTitle }), _jsx("section", { className: "mt-5 space-y-4", children: compareCandidates.map((candidate) => (_jsx(Surface, { className: "overflow-hidden rounded-[20px] px-4 py-4", style: { backgroundColor: candidate.summary.tint }, children: _jsxs("article", { className: "flex items-start gap-3", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-[10px] font-semibold text-[#ff9f2e]", children: candidate.summary.label }), _jsx("h2", { className: "mt-2 text-[15px] font-black text-ink", children: candidate.shortTitle }), _jsxs("p", { className: "mt-2 text-[10px] leading-5 text-black/60", children: ["\u63A8\u8350\u7406\u7531\uFF1A", candidate.summary.reason] }), _jsxs("p", { className: "text-[10px] leading-5 text-black/60", children: ["\u53EF\u80FD\u98CE\u9669\uFF1A", candidate.summary.risk] }), _jsxs("p", { className: "text-[10px] leading-5 text-black/60", children: ["\u9002\u5408\u4EBA\u7FA4\uFF1A", candidate.summary.audience] })] }), _jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[118px] w-[118px] shrink-0", label: candidate.chip, title: candidate.shortTitle })] }) }, candidate.id))) }), _jsxs("section", { className: "mt-6 grid grid-cols-2 gap-3", children: [_jsx(Button, { block: true, onClick: onConfirm, children: "\u53BB\u4E0B\u5355" }), _jsx(Button, { block: true, onClick: onFavorite, variant: "secondary", children: "\u52A0\u5165\u6536\u85CF" }), _jsx(Button, { block: true, onClick: onChangePool, variant: "muted", children: "\u66F4\u6362\u5BF9\u6BD4\u5BF9\u8C61" }), _jsx(Button, { block: true, onClick: onShare, variant: "muted", children: "\u5206\u4EAB\u7ED9\u670B\u53CB" })] })] }));
}
function ConfirmScreen({ candidate, onFavorite, onGoDetail, onGoSummary, vertical }) {
    const data = prototypeData[vertical];
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4", children: [_jsx(SectionTitle, { title: data.confirmTitle }), _jsx(Surface, { className: "mt-4 overflow-hidden rounded-[20px] p-4", children: _jsxs("article", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 rounded-[16px]", style: {
                                background: `linear-gradient(135deg, ${hexToRgba(candidate.accent, 0.2)} 0%, rgba(255,255,255,0.88) 60%)`
                            } }), _jsxs("div", { className: "relative flex items-center gap-3", children: [_jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[62px] w-[62px] shrink-0", label: candidate.chip, title: candidate.summary.badge }), _jsxs("div", { className: "min-w-0", children: [_jsx("h2", { className: "text-[15px] font-black text-ink", children: candidate.title }), _jsxs("p", { className: "mt-2 text-[11px] text-[#10b979]", children: ["AI \u5224\u65AD\uFF1A", candidate.summary.label] })] })] })] }) }), _jsx("section", { className: "mt-7 space-y-3", children: data.confirmRows.map((row) => (_jsx(Surface, { className: "rounded-[16px] px-4 py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-[11px] text-black/55", children: row.label }), _jsx("div", { className: "ml-auto max-w-[210px] text-right text-[11px] font-semibold text-ink", children: getMetricValue(candidate, row.key) })] }) }, row.key))) }), _jsxs("section", { className: "mt-7 space-y-3", children: [_jsx(Button, { block: true, onClick: onGoDetail, children: data.primaryAction }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(Button, { block: true, onClick: onGoSummary, variant: "ghost", children: "\u8FD4\u56DE\u603B\u7ED3\u9875" }), _jsx(Button, { block: true, onClick: onFavorite, variant: "secondary", children: data.favoriteAction })] })] })] }));
}
function DetailScreen({ candidate, vertical }) {
    const data = prototypeData[vertical];
    return (_jsxs("main", { className: "h-full overflow-y-auto bg-white", children: [_jsx("section", { className: "border-b border-line bg-white px-5 pb-5 pt-5", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[86px] w-[86px] shrink-0", label: candidate.chip, title: candidate.summary.badge }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h1", { className: "text-[17px] font-black text-ink", children: candidate.details.title }), _jsx("p", { className: "mt-2 text-[11px] text-black/55", children: candidate.details.subtitle }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: candidate.details.tags.map((tag) => (_jsx("span", { className: "rounded-full bg-[#fff4bd] px-3 py-1 text-[10px] font-semibold text-[#ff8a00]", children: tag }, tag))) })] })] }) }), _jsx("nav", { className: "flex gap-6 border-b border-line px-5", children: data.detailTabs.map((tab, index) => (_jsx("div", { className: [
                        "py-4 text-[13px]",
                        index === 0 ? "font-black text-ink" : "text-black/45"
                    ]
                        .filter(Boolean)
                        .join(" "), children: tab }, tab))) }), _jsxs("section", { className: "bg-[#f6f6f4] px-5 py-5", children: [_jsxs(Surface, { className: "rounded-[18px] p-4", children: [_jsx("h2", { className: "text-[13px] font-black text-ink", children: vertical === "hotel" ? "可订房型" : "推荐内容" }), _jsx("div", { className: "mt-4 space-y-4", children: candidate.details.menu.map((item, index) => (_jsxs("article", { className: "flex items-center gap-3", children: [_jsx(CandidateVisual, { accent: candidate.accent, badge: candidate.summary.badge, className: "h-[68px] w-[68px] shrink-0", label: index === 0 ? "AI 推荐" : "备选", title: index === 0 ? candidate.summary.badge : candidate.title.slice(0, 2) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "text-[12px] font-black text-ink", children: item.name }), _jsx("p", { className: "mt-1 text-[10px] leading-5 text-black/55", children: item.note }), _jsx("p", { className: "mt-1 text-[12px] font-semibold text-[#f08a00]", children: item.price })] }), _jsx(Button, { className: "rounded-[10px] px-3 text-[10px]", variant: "primary", children: item.cta })] }, item.name))) })] }), _jsxs(Surface, { className: "mt-4 rounded-[18px] p-4", children: [_jsx("h2", { className: "text-[13px] font-black text-ink", children: "\u4E0B\u5355\u63D0\u9192" }), _jsx("p", { className: "mt-3 text-[10px] leading-5 text-black/55", children: candidate.details.notice })] })] })] }));
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
            return _jsx(HomeScreen, { onSelect: chooseVertical });
        }
        if (screen === "select") {
            return (_jsx(SelectScreen, { activeSort: activeSort, candidates: filteredCandidates, onOpenPool: () => setScreen("pool"), onSearchChange: updateSearch, onSortChange: updateSort, onToggleCandidate: toggleSelected, searchValue: searchValue, selectedIds: selectedIds, vertical: vertical }));
        }
        if (screen === "pool") {
            return (_jsx(PoolScreen, { onContinue: () => setScreen("select"), onRemove: toggleSelected, onStartCompare: startCompare, selectedCandidates: selectedCandidates, vertical: vertical }));
        }
        if (screen === "compare") {
            return (_jsx(CompareScreen, { activeTab: activeCompareTab, compareCandidates: compareCandidates, onChangeTab: updateCompareTab, onGoRisk: () => setScreen("risk"), onGoSummary: () => setScreen("summary"), onToggleDifference: () => setOnlyDifferences((current) => !current), onTriggerPrice: () => setModal("price"), onlyDifferences: onlyDifferences, vertical: vertical }));
        }
        if (screen === "risk") {
            return (_jsx(RiskScreen, { compareCandidates: compareCandidates, onGoCompare: () => setScreen("compare"), onGoSummary: () => setScreen("summary"), vertical: vertical }));
        }
        if (screen === "summary") {
            return (_jsx(SummaryScreen, { compareCandidates: rankedCandidates, onChangePool: () => setScreen("pool"), onConfirm: () => setScreen("confirm"), onFavorite: () => setModal("favorite"), onShare: () => setModal("share"), vertical: vertical }));
        }
        if (screen === "confirm") {
            return (_jsx(ConfirmScreen, { candidate: recommendedCandidate, onFavorite: () => setModal("favorite"), onGoDetail: () => setScreen("detail"), onGoSummary: () => setScreen("summary"), vertical: vertical }));
        }
        return _jsx(DetailScreen, { candidate: recommendedCandidate, vertical: vertical });
    }
    const pageTitle = screen === "home" ? "智能决策助手" : pageTitleByScreen(data)[screen];
    return (_jsx("div", { className: "min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#f4f0e6_100%)] px-4 py-6 text-ink md:px-6 md:py-8", children: _jsxs("div", { className: "mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[320px_1fr]", children: [_jsxs("aside", { className: "space-y-4", children: [_jsxs("header", { children: [_jsx("p", { className: "text-[24px] font-black tracking-normal", children: "\u7F8E\u56E2\u667A\u80FD\u51B3\u7B56\u52A9\u624B" }), _jsx("p", { className: "mt-2 text-[13px] leading-6 text-black/55", children: "React + Tailwind CSS + Framer Motion \u7684\u9AD8\u4FDD\u771F\u4EA4\u4E92\u539F\u578B\uFF0C\u8986\u76D6\u5916\u5356\u3001\u5230\u5E97\u548C\u9152\u5E97\u4E09\u6761\u4E1A\u52A1\u7EBF\u3002" })] }), _jsxs(Surface, { className: "rounded-[22px] bg-white/85 p-5 backdrop-blur", children: [_jsxs("section", { children: [_jsx("p", { className: "text-[12px] font-semibold uppercase tracking-[0.08em] text-black/35", children: "\u5F53\u524D\u8DEF\u5F84" }), _jsx("p", { className: "mt-2 text-[15px] font-black text-ink", children: historyLabel })] }), _jsxs("section", { className: "mt-5", children: [_jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u4E1A\u52A1\u7EBF" }), _jsx("div", { className: "mt-3 grid grid-cols-3 gap-2", children: verticalOrder.map((item) => (_jsx("button", { className: [
                                                    "h-10 rounded-[12px] text-[12px] font-semibold transition",
                                                    item === vertical ? "bg-brand text-ink" : "bg-[#f3f3f1] text-black/55"
                                                ]
                                                    .filter(Boolean)
                                                    .join(" "), onClick: () => chooseVertical(item), type: "button", children: prototypeData[item].name }, item))) })] }), _jsxs("section", { className: "mt-5", children: [_jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u9875\u9762\u72B6\u6001" }), _jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: ["home", "select", "pool", "compare", "risk", "summary", "confirm", "detail"].map((item) => (_jsx("button", { className: [
                                                    "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                                                    item === screen ? "bg-ink text-white" : "bg-[#f3f3f1] text-black/55"
                                                ]
                                                    .filter(Boolean)
                                                    .join(" "), onClick: () => setScreen(item), type: "button", children: screenLabels[item] }, item))) })] }), _jsxs("section", { className: "mt-5 grid grid-cols-2 gap-3", children: [_jsxs(Surface, { className: "rounded-[16px] px-4 py-3", children: [_jsx("p", { className: "text-[10px] text-black/45", children: "\u5019\u9009\u6570\u91CF" }), _jsx("p", { className: "mt-2 text-[18px] font-black text-ink", children: selectedIds.length })] }), _jsxs(Surface, { className: "rounded-[16px] px-4 py-3", children: [_jsx("p", { className: "text-[10px] text-black/45", children: "\u5F53\u524D\u6392\u5E8F" }), _jsx("p", { className: "mt-2 text-[13px] font-black text-ink", children: data.quickFilters.find((item) => item.key === activeSort)?.label })] })] }), screen === "compare" ? (_jsxs("section", { className: "mt-5", children: [_jsx("p", { className: "text-[12px] font-semibold text-black/45", children: "\u5BF9\u6BD4\u7EF4\u5EA6" }), _jsx("div", { className: "mt-3 grid grid-cols-2 gap-2", children: data.compareTabs.map((tab) => (_jsx("button", { className: [
                                                    "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                                                    tab.key === activeCompareTab
                                                        ? "bg-brand text-ink"
                                                        : "bg-[#f3f3f1] text-black/55"
                                                ]
                                                    .filter(Boolean)
                                                    .join(" "), onClick: () => updateCompareTab(tab.key), type: "button", children: tab.label }, tab.key))) })] })) : null, _jsxs("section", { className: "mt-5 grid grid-cols-2 gap-2", children: [_jsx(Button, { onClick: () => setModal("sort"), variant: "ghost", children: "\u6392\u5E8F\u9762\u677F" }), _jsx(Button, { onClick: () => setModal("price"), variant: "ghost", children: "\u4EF7\u683C\u66F4\u65B0" }), _jsx(Button, { onClick: () => setModal("aiError"), variant: "ghost", children: "AI \u5F02\u5E38" }), _jsx(Button, { onClick: () => setModal("share"), variant: "ghost", children: "\u5206\u4EAB\u9762\u677F" })] })] })] }), _jsx("main", { className: "flex items-start justify-center lg:justify-end", children: _jsxs(PhoneShell, { onBack: goBack, pageTitle: pageTitle, showBack: screen !== "home", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { animate: { opacity: 1, y: 0 }, className: "h-full", exit: { opacity: 0, y: 10 }, initial: { opacity: 0, y: 10 }, transition: { duration: 0.22 }, children: renderScreen() }, `${vertical}-${screen}`) }), _jsx(Modal, { open: modal === "sort", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[16px] font-black text-ink", children: "\u6392\u5E8F\u7B5B\u9009" }), _jsx("div", { className: "mt-5 space-y-3", children: data.quickFilters.map((option) => (_jsx("button", { className: [
                                                    "block h-10 w-full rounded-[12px] text-[12px] font-semibold transition",
                                                    option.key === activeSort
                                                        ? "bg-brand text-ink"
                                                        : "bg-[#f3f3f1] text-black/55"
                                                ]
                                                    .filter(Boolean)
                                                    .join(" "), onClick: () => {
                                                    updateSort(option.key);
                                                    setModal("none");
                                                }, type: "button", children: option.label }, option.key))) })] }) }), _jsx(Modal, { open: modal === "insufficient", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[16px] font-black text-ink", children: "\u5019\u9009\u5BF9\u8C61\u4E0D\u8DB3" }), _jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u8BF7\u81F3\u5C11\u9009\u62E9 2 \u4E2A\u5BF9\u8C61\u518D\u5F00\u59CB\u667A\u80FD\u5BF9\u6BD4\u3002" }), _jsx("div", { className: "mt-5", children: _jsx(Button, { block: true, onClick: () => {
                                                    setModal("none");
                                                    setScreen("select");
                                                }, children: "\u7EE7\u7EED\u6DFB\u52A0" }) })] }) }), _jsx(Modal, { open: modal === "price", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[16px] font-black text-ink", children: "\u4EF7\u683C\u5DF2\u66F4\u65B0" }), _jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u4F18\u60E0\u6216\u5E93\u5B58\u53D1\u751F\u53D8\u5316\uFF0C\u5EFA\u8BAE\u91CD\u65B0\u786E\u8BA4\u5230\u624B\u4EF7\u540E\u518D\u7EE7\u7EED\u51B3\u7B56\u3002" }), _jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [_jsx(Button, { onClick: () => setModal("none"), children: "\u91CD\u65B0\u8BA1\u7B97" }), _jsx(Button, { onClick: () => setModal("none"), variant: "ghost", children: "\u7A0D\u540E\u518D\u8BF4" })] })] }) }), _jsx(Modal, { open: modal === "aiError", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[16px] font-black text-ink", children: "AI \u603B\u7ED3\u52A0\u8F7D\u5931\u8D25" }), _jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "AI \u6682\u65F6\u6CA1\u6709\u8FD4\u56DE\u7ED3\u679C\uFF0C\u4F46\u57FA\u7840\u5BF9\u6BD4\u548C\u98CE\u9669\u4FE1\u606F\u4ECD\u7136\u53EF\u4EE5\u7EE7\u7EED\u67E5\u770B\u3002" }), _jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [_jsx(Button, { onClick: () => {
                                                        setModal("none");
                                                        setScreen("summary");
                                                    }, children: "\u91CD\u65B0\u751F\u6210" }), _jsx(Button, { onClick: () => setModal("none"), variant: "ghost", children: "\u5148\u770B\u57FA\u7840\u5BF9\u6BD4" })] })] }) }), _jsx(Modal, { open: modal === "favorite", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[16px] font-black text-ink", children: "\u6536\u85CF\u6210\u529F" }), _jsx("p", { className: "mt-3 text-[12px] leading-6 text-black/55", children: "\u5DF2\u4FDD\u5B58\u63A8\u8350\u7ED3\u679C\uFF0C\u4E4B\u540E\u53EF\u4EE5\u5728\u6536\u85CF\u5939\u91CC\u7EE7\u7EED\u67E5\u770B\u3002" }), _jsx("div", { className: "mt-5", children: _jsx(Button, { block: true, onClick: () => setModal("none"), children: "\u77E5\u9053\u4E86" }) })] }) }), _jsxs(BottomSheet, { open: modal === "share", children: [_jsx("div", { className: "text-center text-[16px] font-black text-ink", children: "\u5206\u4EAB\u81F3" }), _jsx("div", { className: "mt-6 grid grid-cols-4 gap-y-6 text-center", children: shareOptions.map((option) => {
                                            const darkText = option.color === "#ffd400" || option.color === "#d9d9d9";
                                            return (_jsxs("button", { className: "text-center", onClick: () => setModal("none"), type: "button", children: [_jsx("span", { className: "mx-auto grid h-11 w-11 place-items-center rounded-full text-[14px] font-black", style: {
                                                            backgroundColor: option.color,
                                                            color: darkText ? "#111111" : "#ffffff"
                                                        }, children: option.label.slice(0, 1) }), _jsx("span", { className: "mt-2 block text-[10px] text-black/45", children: option.label })] }, option.label));
                                        }) })] })] }) })] }) }));
}
export default App;
