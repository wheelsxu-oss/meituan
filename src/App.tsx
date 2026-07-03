import { useMemo, useState } from "./vendor/react.js";
import { AnimatePresence, motion } from "./vendor/framer-motion.js";
import { BottomSheet } from "./components/mds/BottomSheet.js";
import { Button } from "./components/mds/Button.js";
import { Modal } from "./components/mds/Modal.js";
import { PhoneShell } from "./components/mds/PhoneShell.js";
import { SearchField } from "./components/mds/SearchField.js";
import { Surface } from "./components/mds/Surface.js";
import {
  type Candidate,
  type CompareTabKey,
  type ScreenKey,
  type SortKey,
  type VerticalConfig,
  type VerticalKey,
  flowOrder,
  initialCompareTabByVertical,
  initialSearchByVertical,
  initialSelectedByVertical,
  initialSortByVertical,
  prototypeData,
  screenLabels,
  shareOptions,
  verticalOrder
} from "./data/prototypeData.js";

type ModalKey =
  | "none"
  | "sort"
  | "insufficient"
  | "price"
  | "aiError"
  | "favorite"
  | "share";

const pageTitleByScreen = (data: VerticalConfig): Record<Exclude<ScreenKey, "home">, string> => ({
  compare: data.compareTitle,
  confirm: data.confirmTitle,
  detail: data.detailTitle,
  pool: "候选池",
  risk: data.riskTitle,
  select: data.selectTitle,
  summary: data.summaryTitle
});

function toNumber(value: string) {
  const matched = value.match(/[\d.]+/);
  return matched ? Number(matched[0]) : Number.MAX_SAFE_INTEGER;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const safe =
    normalized.length === 3
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

function getMetricValue(candidate: Candidate, key: string) {
  if (key === "support") {
    return candidate.support;
  }

  return candidate.metrics[key] ?? "-";
}

function sortCandidates(candidates: Candidate[], sortKey: SortKey) {
  const next = [...candidates];

  function refundFlexRank(value: string) {
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

function CandidateVisual({
  accent,
  badge,
  className = "",
  label,
  title
}: {
  accent: string;
  badge: string;
  className?: string;
  label: string;
  title: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-[18px] border border-white/80",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: `linear-gradient(145deg, ${hexToRgba(
          accent,
          0.3
        )} 0%, rgba(255, 255, 255, 0.96) 62%)`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.65)_100%)]" />
      <div className="relative flex h-full flex-col justify-between p-3">
        <div className="flex items-start justify-between gap-2">
          <span
            className="inline-flex rounded-full px-2 py-1 text-[9px] font-semibold"
            style={{
              backgroundColor: hexToRgba(accent, 0.14),
              color: "#111111"
            }}
          >
            {label}
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[12px] font-black text-ink shadow-sm">
            {badge}
          </span>
        </div>
        <div className="max-w-[9rem] text-[12px] font-black leading-5 text-ink">
          {title}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  subtitle,
  title
}: {
  subtitle?: string;
  title: string;
}) {
  return (
    <header>
      <h1 className="text-[20px] font-black tracking-normal text-ink">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-[11px] leading-5 text-black/55">{subtitle}</p>
      ) : null}
    </header>
  );
}

function PillButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      className={[
        "rounded-full px-3 py-2 text-[11px] font-semibold transition",
        active ? "bg-ink text-white" : "bg-[#f3f3f1] text-black/55"
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function HomeScreen({
  onSelect
}: {
  onSelect: (vertical: VerticalKey) => void;
}) {
  const entries = verticalOrder.map((key) => ({
    description: prototypeData[key].homeDescription,
    key,
    title:
      key === "waimai"
        ? "外卖｜智能帮我选"
        : key === "store"
          ? "到店餐饮｜帮我比套餐"
          : "酒店｜酒店 PK 对比"
  }));

  return (
    <main className="h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-8 pt-5">
      <section className="rounded-[22px] bg-brand px-5 py-5 text-ink shadow-card">
        <p className="text-[20px] font-black leading-8">美团本地生活智能决策助手</p>
        <p className="mt-3 max-w-[292px] text-[12px] leading-6 text-black/65">
          AI 帮你分析价格、配送、规则限制和评价风险，减少纠结时间，尽快做出更稳的选择。
        </p>
      </section>

      <section className="mt-6 space-y-4" aria-label="业务入口">
        {entries.map((entry) => (
          <motion.button
            key={entry.key}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="block w-full text-left"
            onClick={() => onSelect(entry.key)}
            type="button"
          >
            <Surface className="overflow-hidden rounded-[22px] px-4 py-4">
              <article className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff7cf] text-[15px] font-black text-ink">
                  {prototypeData[entry.key].icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[15px] font-black text-ink">{entry.title}</h2>
                  <p className="mt-2 text-[11px] leading-5 text-black/55">
                    {entry.description}
                  </p>
                </div>
                <div className="text-[18px] text-black/35">&gt;</div>
              </article>
            </Surface>
          </motion.button>
        ))}
      </section>
    </main>
  );
}

function SelectScreen({
  activeSort,
  candidates,
  onOpenPool,
  onOpenSort,
  onSortChange,
  onSearchChange,
  onToggleCandidate,
  searchValue,
  selectedIds,
  vertical
}: {
  activeSort: SortKey;
  candidates: Candidate[];
  onOpenPool: () => void;
  onOpenSort: () => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
  onToggleCandidate: (id: string) => void;
  searchValue: string;
  selectedIds: string[];
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];
  const selectedSet = new Set(selectedIds);

  return (
    <main className="h-full overflow-y-auto bg-[#f8f6f1] px-5 pb-6 pt-3">
      <SectionTitle title={data.selectTitle} />

      <section className="mt-4">
        <SearchField
          onChange={onSearchChange}
          placeholder={data.searchPlaceholder}
          value={searchValue}
        />
      </section>

      <nav
        aria-label="排序筛选"
        className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {data.quickFilters.map((filter) => (
          <PillButton
            key={filter.key}
            active={filter.key === activeSort}
            onClick={() => onSortChange(filter.key)}
          >
            {filter.label}
          </PillButton>
        ))}
        <PillButton active={false} onClick={onOpenSort}>
          更多
        </PillButton>
      </nav>

      <section className="mt-5 space-y-3">
        {candidates.length > 0 ? (
          candidates.map((candidate) => {
            const selected = selectedSet.has(candidate.id);

            return (
              <motion.article
                key={candidate.id}
                layout
                className="relative overflow-hidden rounded-[20px] bg-white shadow-card"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: candidate.accent }}
                />
                <div className="relative px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[15px] font-black text-ink">
                          {candidate.shortTitle}
                        </h2>
                        <span
                          className="rounded-full px-2 py-1 text-[9px] font-semibold"
                          style={{
                            backgroundColor: hexToRgba(candidate.accent, 0.16)
                          }}
                        >
                          {candidate.chip}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-black/55">{candidate.meta}</p>
                      <p className="mt-1 text-[11px] text-black/55">{candidate.support}</p>
                      <p className="mt-2 text-[12px] font-semibold text-[#f08a00]">
                        {candidate.price}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold text-ink"
                      style={{ backgroundColor: hexToRgba(candidate.accent, 0.14) }}
                    >
                      {candidate.chip}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-[10px] text-black/45">
                      评分 {candidate.metrics.rating} · 风险 {candidate.metrics.risk}
                    </div>
                    <Button
                      className="rounded-[10px] px-4 text-[11px]"
                      onClick={() => onToggleCandidate(candidate.id)}
                      variant={selected ? "muted" : "primary"}
                    >
                      {selected ? "已加入" : "加入对比"}
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })
        ) : (
          <Surface className="px-5 py-8 text-center">
            <p className="text-[13px] font-semibold text-ink">没有找到匹配对象</p>
            <p className="mt-2 text-[11px] leading-5 text-black/55">
              换个关键词试试，或者回到推荐优先看看系统已经整理好的候选。
            </p>
          </Surface>
        )}
      </section>

      <footer className="sticky bottom-0 mt-5">
        <Surface className="rounded-[20px] bg-white/95 px-4 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-black text-ink">已选择 {selectedIds.length}/6</div>
              <div className="mt-1 text-[10px] leading-4 text-black/45">
                至少需要 2 个对象开始智能对比
              </div>
            </div>
            <Button className="rounded-[10px] px-4 text-[11px]" onClick={onOpenPool}>
              查看
            </Button>
          </div>
        </Surface>
      </footer>
    </main>
  );
}

function PoolScreen({
  onContinue,
  onRemove,
  onStartCompare,
  selectedCandidates,
  vertical
}: {
  onContinue: () => void;
  onRemove: (id: string) => void;
  onStartCompare: () => void;
  selectedCandidates: Candidate[];
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];

  return (
    <main className="h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4">
      <SectionTitle
        subtitle={data.poolHint}
        title="候选池"
      />

      <section className="mt-5 space-y-3">
        {selectedCandidates.map((candidate) => (
          <Surface key={candidate.id} className="rounded-[18px] px-4 py-4">
            <article className="flex items-center gap-3">
              <div
                className="h-10 w-1.5 rounded-full"
                style={{ backgroundColor: candidate.accent }}
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-[13px] font-black text-ink">{candidate.shortTitle}</h2>
                <p className="mt-1 text-[11px] text-black/55">{candidate.meta}</p>
              </div>
              <Button
                className="rounded-[10px] px-3 text-[11px]"
                onClick={() => onRemove(candidate.id)}
                variant="muted"
              >
                删除
              </Button>
            </article>
          </Surface>
        ))}
      </section>

      <section className="mt-6">
        <Surface className="rounded-[18px] bg-[#fff7cf] px-4 py-4">
          <p className="text-[11px] leading-5 text-black/65">{data.poolHint}</p>
        </Surface>
      </section>

      <section className="mt-7 space-y-3">
        <Button block onClick={onStartCompare}>
          开始智能对比
        </Button>
        <Button block onClick={onContinue} variant="ghost">
          继续添加
        </Button>
      </section>
    </main>
  );
}

function CompareScreen({
  activeTab,
  compareCandidates,
  onChangeTab,
  onGoRisk,
  onGoSummary,
  onToggleDifference,
  onTriggerPrice,
  onlyDifferences,
  vertical
}: {
  activeTab: CompareTabKey;
  compareCandidates: Candidate[];
  onChangeTab: (value: CompareTabKey) => void;
  onGoRisk: () => void;
  onGoSummary: () => void;
  onToggleDifference: () => void;
  onTriggerPrice: () => void;
  onlyDifferences: boolean;
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];
  const tab = data.compareTabs.find((item) => item.key === activeTab) ?? data.compareTabs[0];
  const rows = onlyDifferences
    ? tab.rows.filter((row) => {
        const values = new Set(compareCandidates.map((candidate) => getMetricValue(candidate, row.key)));
        return values.size > 1;
      })
    : tab.rows;

  return (
    <main className="h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4">
      <SectionTitle subtitle={data.compareSubTip} title={data.compareTitle} />

      <Surface className="mt-4 rounded-[18px] bg-[#fff7cf] px-4 py-4">
        <p className="text-[11px] leading-5 text-black/65">{data.compareTip}</p>
      </Surface>

      <nav
        aria-label="对比维度"
        className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {data.compareTabs.map((item) => (
          <PillButton
            key={item.key}
            active={item.key === activeTab}
            onClick={() => onChangeTab(item.key)}
          >
            {item.label}
          </PillButton>
        ))}
      </nav>

      <section className="mt-4 overflow-hidden rounded-[20px] bg-white shadow-card">
        <div
          className="grid min-w-[320px] border-b border-line bg-[#f7f6f2] text-[10px] font-semibold text-black/45"
          style={{
            gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
          }}
        >
          <div className="px-3 py-3">对比项</div>
          {compareCandidates.map((candidate) => (
            <div key={candidate.id} className="px-3 py-3 text-center">
              {candidate.summary.badge} {candidate.shortTitle}
            </div>
          ))}
        </div>
        {rows.length > 0 ? (
          rows.map((row) => (
            <div
              key={row.key}
              className="grid border-b border-line/70 text-[11px] last:border-b-0"
              style={{
                gridTemplateColumns: `92px repeat(${compareCandidates.length}, minmax(88px, 1fr))`
              }}
            >
              <div className="px-3 py-3 font-semibold text-black/55">{row.label}</div>
              {compareCandidates.map((candidate) => (
                <div
                  key={`${candidate.id}-${row.key}`}
                  className="grid place-items-center px-3 py-3 text-center text-ink"
                >
                  {getMetricValue(candidate, row.key)}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center text-[11px] leading-5 text-black/55">
            当前维度下没有明显差异，已经帮你收起相同项了。
          </div>
        )}
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <Button block onClick={onToggleDifference} variant="ghost">
          {onlyDifferences ? "显示全部" : "只看差异"}
        </Button>
        <Button block onClick={onTriggerPrice} variant="ghost">
          重新计算到手价
        </Button>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-3">
        <Button block onClick={onGoRisk}>
          查看评价风险
        </Button>
        <Button block onClick={onGoSummary} variant="secondary">
          生成 AI 决策总结
        </Button>
      </section>
    </main>
  );
}

function RiskScreen({
  compareCandidates,
  onGoCompare,
  onGoSummary,
  vertical
}: {
  compareCandidates: Candidate[];
  onGoCompare: () => void;
  onGoSummary: () => void;
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];

  return (
    <main className="h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4">
      <SectionTitle subtitle={data.riskTip} title={data.riskTitle} />

      <section className="mt-5 space-y-4">
        {compareCandidates.map((candidate) => (
          <Surface key={candidate.id} className="relative overflow-hidden rounded-[20px] px-4 py-4">
            <article className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[14px] font-black text-ink">{candidate.shortTitle}</h2>
                  <span className="rounded-full bg-[#fff1c7] px-2 py-1 text-[9px] font-semibold text-[#ff9f2e]">
                    {candidate.review.tag}
                  </span>
                </div>
                <p className="mt-3 text-[10px] leading-5 text-[#10b979]">
                  高频好评：{candidate.review.positive}
                </p>
                <p className="mt-1 text-[10px] leading-5 text-[#ff5a66]">
                  高频差评：{candidate.review.negative}
                </p>
                <p className="mt-2 text-[10px] leading-5 text-black/55">
                  成本 / 风险：{candidate.review.caution}
                </p>
              </div>
              <CandidateVisual
                accent={candidate.accent}
                badge={candidate.summary.badge}
                className="h-[104px] w-[118px] shrink-0"
                label={candidate.review.riskTag}
                title={candidate.shortTitle}
              />
            </article>
          </Surface>
        ))}
      </section>

      <section className="mt-6 space-y-3">
        <Button block onClick={onGoCompare} variant="ghost">
          返回智能对比
        </Button>
        <Button block onClick={onGoSummary} variant="secondary">
          生成 AI 决策总结
        </Button>
      </section>
    </main>
  );
}

function SummaryScreen({
  compareCandidates,
  onChangePool,
  onConfirm,
  onFavorite,
  onShare,
  vertical
}: {
  compareCandidates: Candidate[];
  onChangePool: () => void;
  onConfirm: () => void;
  onFavorite: () => void;
  onShare: () => void;
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];

  return (
    <main className="h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4">
      <SectionTitle subtitle={data.summaryTip} title={data.summaryTitle} />

      <section className="mt-5 space-y-4">
        {compareCandidates.map((candidate) => (
          <Surface
            key={candidate.id}
            className="overflow-hidden rounded-[20px] px-4 py-4"
            style={{ backgroundColor: candidate.summary.tint }}
          >
            <article className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-[#ff9f2e]">
                  {candidate.summary.label}
                </p>
                <h2 className="mt-2 text-[15px] font-black text-ink">
                  {candidate.shortTitle}
                </h2>
                <p className="mt-2 text-[10px] leading-5 text-black/60">
                  推荐理由：{candidate.summary.reason}
                </p>
                <p className="text-[10px] leading-5 text-black/60">
                  可能风险：{candidate.summary.risk}
                </p>
                <p className="text-[10px] leading-5 text-black/60">
                  适合人群：{candidate.summary.audience}
                </p>
              </div>
              <CandidateVisual
                accent={candidate.accent}
                badge={candidate.summary.badge}
                className="h-[118px] w-[118px] shrink-0"
                label={candidate.chip}
                title={candidate.shortTitle}
              />
            </article>
          </Surface>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3">
        <Button block onClick={onConfirm}>
          去下单
        </Button>
        <Button block onClick={onFavorite} variant="secondary">
          加入收藏
        </Button>
        <Button block onClick={onChangePool} variant="muted">
          更换对比对象
        </Button>
        <Button block onClick={onShare} variant="muted">
          分享给朋友
        </Button>
      </section>
    </main>
  );
}

function ConfirmScreen({
  candidate,
  onFavorite,
  onGoDetail,
  onGoSummary,
  vertical
}: {
  candidate: Candidate;
  onFavorite: () => void;
  onGoDetail: () => void;
  onGoSummary: () => void;
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];

  return (
    <main className="h-full overflow-y-auto bg-[#fbfaf7] px-5 pb-8 pt-4">
      <SectionTitle title={data.confirmTitle} />

      <Surface className="mt-4 overflow-hidden rounded-[20px] p-4">
        <article className="relative">
          <div
            className="absolute inset-0 rounded-[16px]"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(
                candidate.accent,
                0.2
              )} 0%, rgba(255,255,255,0.88) 60%)`
            }}
          />
          <div className="relative flex items-center gap-3">
            <CandidateVisual
              accent={candidate.accent}
              badge={candidate.summary.badge}
              className="h-[62px] w-[62px] shrink-0"
              label={candidate.chip}
              title={candidate.summary.badge}
            />
            <div className="min-w-0">
              <h2 className="text-[15px] font-black text-ink">{candidate.title}</h2>
              <p className="mt-2 text-[11px] text-[#10b979]">
                AI 判断：{candidate.summary.label}
              </p>
            </div>
          </div>
        </article>
      </Surface>

      <section className="mt-7 space-y-3">
        {data.confirmRows.map((row) => (
          <Surface key={row.key} className="rounded-[16px] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="text-[11px] text-black/55">{row.label}</div>
              <div className="ml-auto max-w-[210px] text-right text-[11px] font-semibold text-ink">
                {getMetricValue(candidate, row.key)}
              </div>
            </div>
          </Surface>
        ))}
      </section>

      <section className="mt-7 space-y-3">
        <Button block onClick={onGoDetail}>
          {data.primaryAction}
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button block onClick={onGoSummary} variant="ghost">
            返回总结页
          </Button>
          <Button block onClick={onFavorite} variant="secondary">
            {data.favoriteAction}
          </Button>
        </div>
      </section>
    </main>
  );
}

function DetailScreen({
  candidate,
  vertical
}: {
  candidate: Candidate;
  vertical: VerticalKey;
}) {
  const data = prototypeData[vertical];

  return (
    <main className="h-full overflow-y-auto bg-white">
      <section className="border-b border-line bg-white px-5 pb-5 pt-5">
        <div className="flex gap-3">
          <CandidateVisual
            accent={candidate.accent}
            badge={candidate.summary.badge}
            className="h-[86px] w-[86px] shrink-0"
            label={candidate.chip}
            title={candidate.summary.badge}
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-[17px] font-black text-ink">{candidate.details.title}</h1>
            <p className="mt-2 text-[11px] text-black/55">{candidate.details.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.details.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#fff4bd] px-3 py-1 text-[10px] font-semibold text-[#ff8a00]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="flex gap-6 border-b border-line px-5">
        {data.detailTabs.map((tab, index) => (
          <div
            key={tab}
            className={[
              "py-4 text-[13px]",
              index === 0 ? "font-black text-ink" : "text-black/45"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tab}
          </div>
        ))}
      </nav>

      <section className="bg-[#f6f6f4] px-5 py-5">
        <Surface className="rounded-[18px] p-4">
          <h2 className="text-[13px] font-black text-ink">
            {vertical === "hotel" ? "可订房型" : "推荐内容"}
          </h2>
          <div className="mt-4 space-y-4">
            {candidate.details.menu.map((item, index) => (
              <article key={item.name} className="flex items-center gap-3">
                <CandidateVisual
                  accent={candidate.accent}
                  badge={candidate.summary.badge}
                  className="h-[68px] w-[68px] shrink-0"
                  label={index === 0 ? "AI 推荐" : "备选"}
                  title={index === 0 ? candidate.summary.badge : candidate.title.slice(0, 2)}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[12px] font-black text-ink">{item.name}</h3>
                  <p className="mt-1 text-[10px] leading-5 text-black/55">{item.note}</p>
                  <p className="mt-1 text-[12px] font-semibold text-[#f08a00]">{item.price}</p>
                </div>
                <Button className="rounded-[10px] px-3 text-[10px]" variant="primary">
                  {item.cta}
                </Button>
              </article>
            ))}
          </div>
        </Surface>

        <Surface className="mt-4 rounded-[18px] p-4">
          <h2 className="text-[13px] font-black text-ink">下单提醒</h2>
          <p className="mt-3 text-[10px] leading-5 text-black/55">
            {candidate.details.notice}
          </p>
        </Surface>
      </section>
    </main>
  );
}

function App() {
  const [vertical, setVertical] = useState<VerticalKey>("waimai");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [modal, setModal] = useState<ModalKey>("none");
  const [searchByVertical, setSearchByVertical] = useState(initialSearchByVertical);
  const [selectedByVertical, setSelectedByVertical] = useState(initialSelectedByVertical);
  const [sortByVertical, setSortByVertical] = useState(initialSortByVertical);
  const [compareTabByVertical, setCompareTabByVertical] = useState(
    initialCompareTabByVertical
  );
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
    const items = prototypeData[vertical].candidates.filter((candidate) =>
      selectedIds.includes(candidate.id)
    );

    return selectedIds
      .map((id) => items.find((candidate) => candidate.id === id))
      .filter((candidate): candidate is Candidate => Boolean(candidate));
  }, [selectedIds, vertical]);

  const compareCandidates = useMemo(
    () => selectedCandidates.slice(0, 3),
    [selectedCandidates]
  );

  const rankedCandidates = useMemo(
    () => [...compareCandidates].sort((left, right) => left.summary.rank - right.summary.rank),
    [compareCandidates]
  );

  const recommendedCandidate = rankedCandidates[0] ?? prototypeData[vertical].candidates[0];

  const historyLabel = useMemo(() => {
    if (screen === "home") {
      return "首页";
    }

    return `${data.name} / ${screenLabels[screen]}`;
  }, [data.name, screen]);

  function chooseVertical(nextVertical: VerticalKey) {
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

  function toggleSelected(id: string) {
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

  function updateSearch(value: string) {
    setSearchByVertical((previous) => ({ ...previous, [vertical]: value }));
  }

  function updateSort(value: SortKey) {
    setSortByVertical((previous) => ({ ...previous, [vertical]: value }));
  }

  function updateCompareTab(value: CompareTabKey) {
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
      return <HomeScreen onSelect={chooseVertical} />;
    }

    if (screen === "select") {
      return (
        <SelectScreen
          activeSort={activeSort}
          candidates={filteredCandidates}
          onOpenPool={() => setScreen("pool")}
          onOpenSort={() => setModal("sort")}
          onSearchChange={updateSearch}
          onSortChange={updateSort}
          onToggleCandidate={toggleSelected}
          searchValue={searchValue}
          selectedIds={selectedIds}
          vertical={vertical}
        />
      );
    }

    if (screen === "pool") {
      return (
        <PoolScreen
          onContinue={() => setScreen("select")}
          onRemove={toggleSelected}
          onStartCompare={startCompare}
          selectedCandidates={selectedCandidates}
          vertical={vertical}
        />
      );
    }

    if (screen === "compare") {
      return (
        <CompareScreen
          activeTab={activeCompareTab}
          compareCandidates={compareCandidates}
          onChangeTab={updateCompareTab}
          onGoRisk={() => setScreen("risk")}
          onGoSummary={() => setScreen("summary")}
          onToggleDifference={() => setOnlyDifferences((current) => !current)}
          onTriggerPrice={() => setModal("price")}
          onlyDifferences={onlyDifferences}
          vertical={vertical}
        />
      );
    }

    if (screen === "risk") {
      return (
        <RiskScreen
          compareCandidates={compareCandidates}
          onGoCompare={() => setScreen("compare")}
          onGoSummary={() => setScreen("summary")}
          vertical={vertical}
        />
      );
    }

    if (screen === "summary") {
      return (
        <SummaryScreen
          compareCandidates={rankedCandidates}
          onChangePool={() => setScreen("pool")}
          onConfirm={() => setScreen("confirm")}
          onFavorite={() => setModal("favorite")}
          onShare={() => setModal("share")}
          vertical={vertical}
        />
      );
    }

    if (screen === "confirm") {
      return (
        <ConfirmScreen
          candidate={recommendedCandidate}
          onFavorite={() => setModal("favorite")}
          onGoDetail={() => setScreen("detail")}
          onGoSummary={() => setScreen("summary")}
          vertical={vertical}
        />
      );
    }

    return <DetailScreen candidate={recommendedCandidate} vertical={vertical} />;
  }

  const pageTitle =
    screen === "home" ? "智能决策助手" : pageTitleByScreen(data)[screen];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#f4f0e6_100%)] px-4 py-6 text-ink md:px-6 md:py-8">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <header>
            <p className="text-[24px] font-black tracking-normal">美团智能决策助手</p>
            <p className="mt-2 text-[13px] leading-6 text-black/55">
              React + Tailwind CSS + Framer Motion 的高保真交互原型，覆盖外卖、到店和酒店三条业务线。
            </p>
          </header>

          <Surface className="rounded-[22px] bg-white/85 p-5 backdrop-blur">
            <section>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/35">
                当前路径
              </p>
              <p className="mt-2 text-[15px] font-black text-ink">{historyLabel}</p>
            </section>

            <section className="mt-5">
              <p className="text-[12px] font-semibold text-black/45">业务线</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {verticalOrder.map((item) => (
                  <button
                    key={item}
                    className={[
                      "h-10 rounded-[12px] text-[12px] font-semibold transition",
                      item === vertical ? "bg-brand text-ink" : "bg-[#f3f3f1] text-black/55"
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => chooseVertical(item)}
                    type="button"
                  >
                    {prototypeData[item].name}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-5">
              <p className="text-[12px] font-semibold text-black/45">页面状态</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(
                  ["home", "select", "pool", "compare", "risk", "summary", "confirm", "detail"] as ScreenKey[]
                ).map((item) => (
                  <button
                    key={item}
                    className={[
                      "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                      item === screen ? "bg-ink text-white" : "bg-[#f3f3f1] text-black/55"
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setScreen(item)}
                    type="button"
                  >
                    {screenLabels[item]}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-5 grid grid-cols-2 gap-3">
              <Surface className="rounded-[16px] px-4 py-3">
                <p className="text-[10px] text-black/45">候选数量</p>
                <p className="mt-2 text-[18px] font-black text-ink">{selectedIds.length}</p>
              </Surface>
              <Surface className="rounded-[16px] px-4 py-3">
                <p className="text-[10px] text-black/45">当前排序</p>
                <p className="mt-2 text-[13px] font-black text-ink">
                  {data.quickFilters.find((item) => item.key === activeSort)?.label}
                </p>
              </Surface>
            </section>

            {screen === "compare" ? (
              <section className="mt-5">
                <p className="text-[12px] font-semibold text-black/45">对比维度</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {data.compareTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={[
                        "h-10 rounded-[12px] px-3 text-[11px] font-semibold transition",
                        tab.key === activeCompareTab
                          ? "bg-brand text-ink"
                          : "bg-[#f3f3f1] text-black/55"
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => updateCompareTab(tab.key)}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-5 grid grid-cols-2 gap-2">
              <Button onClick={() => setModal("sort")} variant="ghost">
                排序面板
              </Button>
              <Button onClick={() => setModal("price")} variant="ghost">
                价格更新
              </Button>
              <Button onClick={() => setModal("aiError")} variant="ghost">
                AI 异常
              </Button>
              <Button onClick={() => setModal("share")} variant="ghost">
                分享面板
              </Button>
            </section>
          </Surface>
        </aside>

        <main className="flex items-start justify-center lg:justify-end">
          <PhoneShell
            onBack={goBack}
            pageTitle={pageTitle}
            showBack={screen !== "home"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${vertical}-${screen}`}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
                exit={{ opacity: 0, y: 10 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            <Modal open={modal === "sort"}>
              <div className="text-center">
                <p className="text-[16px] font-black text-ink">排序筛选</p>
                <div className="mt-5 space-y-3">
                  {data.quickFilters.map((option) => (
                    <button
                      key={option.key}
                      className={[
                        "block h-10 w-full rounded-[12px] text-[12px] font-semibold transition",
                        option.key === activeSort
                          ? "bg-brand text-ink"
                          : "bg-[#f3f3f1] text-black/55"
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        updateSort(option.key);
                        setModal("none");
                      }}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </Modal>

            <Modal open={modal === "insufficient"}>
              <div className="text-center">
                <p className="text-[16px] font-black text-ink">候选对象不足</p>
                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  请至少选择 2 个对象再开始智能对比。
                </p>
                <div className="mt-5">
                  <Button
                    block
                    onClick={() => {
                      setModal("none");
                      setScreen("select");
                    }}
                  >
                    继续添加
                  </Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "price"}>
              <div className="text-center">
                <p className="text-[16px] font-black text-ink">价格已更新</p>
                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  优惠或库存发生变化，建议重新确认到手价后再继续决策。
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button onClick={() => setModal("none")}>重新计算</Button>
                  <Button onClick={() => setModal("none")} variant="ghost">
                    稍后再说
                  </Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "aiError"}>
              <div className="text-center">
                <p className="text-[16px] font-black text-ink">AI 总结加载失败</p>
                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  AI 暂时没有返回结果，但基础对比和风险信息仍然可以继续查看。
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      setModal("none");
                      setScreen("summary");
                    }}
                  >
                    重新生成
                  </Button>
                  <Button onClick={() => setModal("none")} variant="ghost">
                    先看基础对比
                  </Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "favorite"}>
              <div className="text-center">
                <p className="text-[16px] font-black text-ink">收藏成功</p>
                <p className="mt-3 text-[12px] leading-6 text-black/55">
                  已保存推荐结果，之后可以在收藏夹里继续查看。
                </p>
                <div className="mt-5">
                  <Button block onClick={() => setModal("none")}>
                    知道了
                  </Button>
                </div>
              </div>
            </Modal>

            <BottomSheet open={modal === "share"}>
              <div className="text-center text-[16px] font-black text-ink">分享至</div>
              <div className="mt-6 grid grid-cols-4 gap-y-6 text-center">
                {shareOptions.map((option) => {
                  const darkText =
                    option.color === "#ffd400" || option.color === "#d9d9d9";

                  return (
                    <button
                      key={option.label}
                      className="text-center"
                      onClick={() => setModal("none")}
                      type="button"
                    >
                      <span
                        className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[14px] font-black"
                        style={{
                          backgroundColor: option.color,
                          color: darkText ? "#111111" : "#ffffff"
                        }}
                      >
                        {option.label.slice(0, 1)}
                      </span>
                      <span className="mt-2 block text-[10px] text-black/45">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </BottomSheet>
          </PhoneShell>
        </main>
      </div>
    </div>
  );
}

export default App;
