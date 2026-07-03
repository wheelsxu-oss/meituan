const { useMemo, useState } = React;
const { AnimatePresence, motion } = Motion;

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
  ["微信好友", "#12c95b"],
  ["朋友圈", "#51c878"],
  ["QQ 好友", "#111111"],
  ["QQ 空间", "#ffd400"],
  ["复制链接", "#d9d9d9"],
  ["意见反馈", "#d9d9d9"],
  ["更多", "#d9d9d9"]
];

const foodImages = [
  "./reference/waimai/f11_risk.png",
  "./reference/waimai/f13_summary_b.png",
  "./reference/waimai/f16_confirm_b.png"
];

const verticalData = {
  waimai: {
    name: "外卖",
    icon: "外",
    homeTitle: "外卖｜智能帮我选",
    homeDescription: "对比附近商家、配送时间、到手价和评价风险，辅助快速点单。",
    selectTitle: "选择想对比的外卖商家",
    searchPlaceholder: "搜索商家、菜品、优惠关键词",
    sortLabel: "速度优先",
    compareTitle: "智能对比结果",
    riskTitle: "评价与风险对比",
    summaryTitle: "AI决策总结",
    confirmTitle: "确认选择",
    detailTitle: "商家详情页",
    compareTip: "AI已为你对比 3 个商家，以下是关键差异。",
    compareSubTip: "系统按照价格、配送时间、评价与风险，生成推荐优先级。",
    riskTip: "评价样本较少，结果仅供参考",
    summaryTip: "如果现在最在意时间，建议选A；如果更在意价格，建议选B；如果想减少踩雷风险，建议选A。",
    primaryAction: "前往商家下单",
    favoriteAction: "收藏该商家",
    detailTabs: ["点菜", "评价", "商家"],
    fields: [
      ["真实到手价", "takeaway"],
      ["评分", "rating"],
      ["配送时间", "eta"],
      ["配送/包装", "fee"],
      ["月售", "volume"],
      ["差评风险", "risk"]
    ],
    confirmRows: [
      ["真实到手价", "takeaway"],
      ["配送时间", "eta"],
      ["评分", "rating"],
      ["AI推荐理由", "shortReason"]
    ],
    candidates: [
      {
        id: "waimai-a",
        title: "A HH轻食沙拉",
        meta: "¥31.8 · 月售2300+ · 4.8",
        support: "13分钟 · 当前距离近 · 配送费¥3",
        price: "到手价 ¥31.8",
        accent: "#ffd400",
        image: foodImages[0],
        metrics: {
          takeaway: "¥31.8",
          rating: "4.8",
          eta: "13分钟",
          fee: "¥3 / ¥1",
          volume: "2300+",
          risk: "低",
          shortReason: "距离近、评分稳定、近期低分少"
        },
        review: {
          positive: "菜品清爽 / 配送及时 / 新鲜",
          negative: "午高峰偶发缺货",
          caution: "适合赶时间、想尽快吃上饭的人",
          tag: "最稳"
        },
        summary: {
          label: "最快推荐",
          badge: "A",
          reason: "配送 13 分钟，当前距离近，午餐时段稳定性更好。",
          risk: "午高峰偶发延迟",
          audience: "适合赶时间、想尽快吃上饭的人",
          tint: "#fff8d8"
        },
        details: {
          title: "低卡·轻食主义健康餐",
          subtitle: "月售 · 评分 · 约31分钟",
          menu: ["招牌鸡胸肉牛油果碗", "满能芝麻牛肉三拼拼米饭", "轻食低脂套餐"],
          coupon: "¥13 满减券"
        }
      },
      {
        id: "waimai-b",
        title: "杨铭黄焖鸡米饭",
        meta: "¥26.5 · 月售1900+ · 4.6",
        support: "20分钟 · 满减后价格最低",
        price: "到手价 ¥26.3",
        accent: "#16c784",
        image: foodImages[1],
        metrics: {
          takeaway: "¥26.3",
          rating: "4.6",
          eta: "20分钟",
          fee: "¥4 / ¥1",
          volume: "1900+",
          risk: "中",
          shortReason: "真实到手价低，但口味波动略高"
        },
        review: {
          positive: "便宜 / 饱腹 / 热量高",
          negative: "包装偶有汤漏",
          caution: "适合预算优先、能接受家常口味的人",
          tag: "最划算"
        },
        summary: {
          label: "最划算推荐",
          badge: "B",
          reason: "真实到手价 ¥26.5，满减后价格最低。",
          risk: "口味偏重，包装偶有汤漏",
          audience: "适合预算优先、能接受家常口味的人",
          tint: "#e9fbf4"
        },
        details: {
          title: "杨铭黄焖鸡米饭",
          subtitle: "月售 · 评分 · 约20分钟",
          menu: ["招牌黄焖鸡米饭", "加量米饭", "时蔬配菜"],
          coupon: "满25减4"
        }
      },
      {
        id: "waimai-c",
        title: "Bubupa手作汉堡",
        meta: "¥42.7 · 月售1800+ · 4.7",
        support: "28分钟 · 份量足 · 口味好",
        price: "到手价 ¥34.3",
        accent: "#ff9f2e",
        image: foodImages[2],
        metrics: {
          takeaway: "¥34.3",
          rating: "4.7",
          eta: "28分钟",
          fee: "¥5 / ¥2",
          volume: "1800+",
          risk: "中",
          shortReason: "口味和份量更突出，但等待成本更高"
        },
        review: {
          positive: "口感好 / 份量足 / 复购高",
          negative: "高峰期等待偏长",
          caution: "适合不赶时间、想吃得更满足的人",
          tag: "品质"
        },
        summary: {
          label: "最稳妥推荐",
          badge: "A",
          reason: "评分最高且近期低分较少，评价风险较低。",
          risk: "份量可能偏少",
          audience: "适合想减少踩雷风险的人",
          tint: "#eef5ff"
        },
        details: {
          title: "Bubupa手作汉堡",
          subtitle: "月售 · 评分 · 约28分钟",
          menu: ["手作牛肉堡", "粗薯条", "气泡饮"],
          coupon: "套餐立减"
        }
      }
    ],
    extraCandidates: [
      {
        title: "SinQ东南亚菜",
        meta: "¥37.6 · 31分钟 · 4.7",
        support: "风味特别，但配送时间偏长",
        accent: "#2e8cff"
      }
    ]
  },
  store: {
    name: "到店",
    icon: "店",
    homeTitle: "到店餐饮｜帮我比套餐",
    homeDescription: "对比套餐价格、可用规则、退款限制和评价风险。",
    selectTitle: "选择想对比的到店套餐",
    searchPlaceholder: "搜索套餐、商圈、优惠关键词",
    sortLabel: "推荐优先",
    compareTitle: "智能对比结果",
    riskTitle: "评价与风险对比",
    summaryTitle: "AI决策总结",
    confirmTitle: "确认选择",
    detailTitle: "套餐详情页",
    compareTip: "AI已为你对比 3 个对象，以下是关键差异。",
    compareSubTip: "系统按照价格、评价、规则限制与风险，生成推荐优先级。",
    riskTip: "评价样本较少，结果仅供参考",
    summaryTip: "如果重视价格，建议选A；如果担心限制，建议选B；如果追求评价稳定，建议选C。",
    primaryAction: "前往商家下单",
    favoriteAction: "收藏该套餐",
    detailTabs: ["套餐详情", "评价", "商家"],
    fields: [
      ["商品价格", "listPrice"],
      ["到手价", "takeaway"],
      ["评分", "rating"],
      ["已售", "volume"],
      ["使用限制", "rule"],
      ["退款规则", "refund"]
    ],
    confirmRows: [
      ["真实到手价", "takeaway"],
      ["使用规则", "rule"],
      ["评分", "rating"],
      ["AI推荐理由", "shortReason"]
    ],
    candidates: [
      {
        id: "store-a",
        title: "A 城南烤肉双人餐",
        meta: "¥168 · 已售2100+ · 4.8",
        support: "周末可用 · 免预约",
        price: "到手价 ¥138",
        accent: "#ffd400",
        metrics: {
          listPrice: "¥168",
          takeaway: "¥138",
          rating: "4.8",
          volume: "2100+",
          rule: "周末可用",
          refund: "随时退",
          shortReason: "价格降幅大，限制少，评价稳定"
        },
        review: {
          positive: "肉质稳定 / 服务热情",
          negative: "晚高峰排队",
          caution: "适合计划明确、想减少规则限制的人",
          tag: "划算"
        },
        summary: {
          label: "最划算推荐",
          badge: "A",
          reason: "价格降幅大，周末可用，规则限制少。",
          risk: "晚高峰可能排队",
          audience: "适合预算敏感但希望体验稳定的人",
          tint: "#fff8d8"
        },
        details: {
          title: "城南烤肉双人餐",
          subtitle: "双人餐 · 周末可用 · 免预约",
          menu: ["双人烤肉拼盘", "招牌小食", "饮品 x2"],
          coupon: "立即购买套餐"
        }
      },
      {
        id: "store-b",
        title: "蜀香火锅四人套餐",
        meta: "¥268 · 已售1500+ · 4.7",
        support: "节假日可用 · 需预约",
        price: "到手价 ¥238",
        accent: "#16c784",
        metrics: {
          listPrice: "¥268",
          takeaway: "¥238",
          rating: "4.7",
          volume: "1500+",
          rule: "需预约",
          refund: "过期退",
          shortReason: "人数多更合适，但预约成本更高"
        },
        review: {
          positive: "锅底香 / 份量足",
          negative: "排队时间长",
          caution: "适合多人聚餐，临时决策不够灵活",
          tag: "聚餐"
        },
        summary: {
          label: "聚餐推荐",
          badge: "B",
          reason: "四人套餐更适合多人聚餐，单人成本可控。",
          risk: "需预约且排队不稳定",
          audience: "适合提前规划的朋友聚餐",
          tint: "#e9fbf4"
        },
        details: {
          title: "蜀香火锅四人套餐",
          subtitle: "四人餐 · 节假日可用 · 需预约",
          menu: ["鸳鸯锅底", "荤素拼盘", "主食小吃"],
          coupon: "预约后使用"
        }
      },
      {
        id: "store-c",
        title: "猫眼咖啡下午茶",
        meta: "¥88 · 已售900+ · 4.9",
        support: "工作日更划算 · 不可叠加券",
        price: "到手价 ¥69",
        accent: "#ff9f2e",
        metrics: {
          listPrice: "¥88",
          takeaway: "¥69",
          rating: "4.9",
          volume: "900+",
          rule: "工作日优先",
          refund: "未用可退",
          shortReason: "评分最高，适合轻量约会场景"
        },
        review: {
          positive: "环境好 / 出片 / 甜品稳定",
          negative: "周末人多",
          caution: "更适合工作日或非高峰时段",
          tag: "稳定"
        },
        summary: {
          label: "最稳妥推荐",
          badge: "C",
          reason: "评分最高，限制明确，踩雷风险低。",
          risk: "不可叠加券",
          audience: "适合下午茶、约会或轻量休闲",
          tint: "#eef5ff"
        },
        details: {
          title: "猫眼咖啡下午茶",
          subtitle: "双人下午茶 · 工作日更划算",
          menu: ["招牌咖啡 x2", "甜品拼盘", "季节小食"],
          coupon: "立即购买套餐"
        }
      }
    ],
    extraCandidates: [
      {
        title: "江景日料双人餐",
        meta: "¥198 · 已售1200+ · 4.6",
        support: "不可用时间较多",
        accent: "#2e8cff"
      }
    ]
  },
  hotel: {
    name: "酒店",
    icon: "酒",
    homeTitle: "酒店｜酒店PK对比",
    homeDescription: "对比价格、位置、房型、退改规则和评价风险。",
    selectTitle: "选择想对比的酒店",
    searchPlaceholder: "搜索酒店、地标、入住关键词",
    sortLabel: "推荐优先",
    compareTitle: "智能对比结果",
    riskTitle: "评价与风险对比",
    summaryTitle: "AI决策总结",
    confirmTitle: "确认选择",
    detailTitle: "酒店详情页",
    compareTip: "AI已为你对比 3 个酒店，以下是关键差异。",
    compareSubTip: "系统按照价格、位置、退改、评分与风险，生成推荐优先级。",
    riskTip: "评价样本较少，结果仅供参考",
    summaryTip: "如果重视位置，建议选A；如果担心限制，建议选B；如果带孩子出行，建议选C。",
    primaryAction: "前往酒店预订",
    favoriteAction: "收藏该酒店",
    detailTabs: ["房型", "评价", "商家"],
    fields: [
      ["房型价格", "listPrice"],
      ["到手价", "takeaway"],
      ["评分", "rating"],
      ["位置", "rule"],
      ["退改规则", "refund"],
      ["差评风险", "risk"]
    ],
    confirmRows: [
      ["真实到手价", "takeaway"],
      ["位置/规则", "rule"],
      ["评分", "rating"],
      ["AI推荐理由", "shortReason"]
    ],
    candidates: [
      {
        id: "hotel-a",
        title: "A 悦澜江景酒店",
        meta: "¥328 · 已售1800+ · 4.8",
        support: "近江景商圈 · 免费取消",
        price: "到手价 ¥299",
        accent: "#ffd400",
        metrics: {
          listPrice: "¥328",
          takeaway: "¥299",
          rating: "4.8",
          volume: "1800+",
          rule: "位置方便",
          refund: "免费取消",
          risk: "低",
          shortReason: "价格优惠，位置方便，退改更灵活"
        },
        review: {
          positive: "江景好 / 交通方便",
          negative: "周末价格波动",
          caution: "适合重视位置和退改灵活的人",
          tag: "均衡"
        },
        summary: {
          label: "综合推荐",
          badge: "A",
          reason: "位置、价格和退改都更均衡。",
          risk: "周末价格波动明显",
          audience: "适合想要稳妥入住的人",
          tint: "#fff8d8"
        },
        details: {
          title: "悦澜江景酒店",
          subtitle: "4.8分 · 江景商圈 · 免费取消",
          menu: ["江景大床房 ¥307", "高级双床房 ¥428", "亲子家庭房 ¥559"],
          coupon: "查看全部房型"
        }
      },
      {
        id: "hotel-b",
        title: "城央轻奢酒店",
        meta: "¥286 · 已售1400+ · 4.7",
        support: "离地铁近 · 不含早餐",
        price: "到手价 ¥259",
        accent: "#16c784",
        metrics: {
          listPrice: "¥286",
          takeaway: "¥259",
          rating: "4.7",
          volume: "1400+",
          rule: "近地铁",
          refund: "限时取消",
          risk: "中",
          shortReason: "价格更低，通勤方便，但服务配置少"
        },
        review: {
          positive: "地铁近 / 房间新",
          negative: "隔音一般",
          caution: "适合短住或通勤优先的人",
          tag: "省钱"
        },
        summary: {
          label: "价格推荐",
          badge: "B",
          reason: "价格更低，交通方便。",
          risk: "隔音反馈较多",
          audience: "适合短住或通勤优先的人",
          tint: "#e9fbf4"
        },
        details: {
          title: "城央轻奢酒店",
          subtitle: "4.7分 · 近地铁 · 限时取消",
          menu: ["轻奢大床房 ¥259", "商务双床房 ¥339", "行政房 ¥459"],
          coupon: "查看全部房型"
        }
      },
      {
        id: "hotel-c",
        title: "云栖亲子度假酒店",
        meta: "¥598 · 已售900+ · 4.9",
        support: "亲子设施全 · 离市区远",
        price: "到手价 ¥559",
        accent: "#ff9f2e",
        metrics: {
          listPrice: "¥598",
          takeaway: "¥559",
          rating: "4.9",
          volume: "900+",
          rule: "亲子设施",
          refund: "不可取消",
          risk: "中",
          shortReason: "设施和评分最好，但价格和距离成本高"
        },
        review: {
          positive: "亲子设施 / 服务好",
          negative: "离市区远 / 价格高",
          caution: "适合亲子度假，不适合市区高频出行",
          tag: "亲子"
        },
        summary: {
          label: "亲子推荐",
          badge: "C",
          reason: "评分高、亲子设施更完整。",
          risk: "离市区远且不可取消",
          audience: "适合亲子度假，不适合频繁进城",
          tint: "#eef5ff"
        },
        details: {
          title: "云栖亲子度假酒店",
          subtitle: "4.9分 · 亲子设施 · 不可取消",
          menu: ["亲子家庭房 ¥559", "景观套房 ¥699", "主题房 ¥799"],
          coupon: "查看全部房型"
        }
      }
    ],
    extraCandidates: [
      {
        title: "滨江商务酒店",
        meta: "¥388 · 已售700+ · 4.6",
        support: "商旅方便 · 停车有限",
        accent: "#2e8cff"
      }
    ]
  }
};

function getItems(vertical) {
  return verticalData[vertical].candidates;
}

function Button({ children, onClick, variant = "primary", block = false, className = "" }) {
  const classes = {
    primary: "bg-[#ffd400] text-[#111111]",
    dark: "bg-[#111111] text-white",
    ghost: "bg-white text-[#111111]",
    pale: "bg-[#f3f3f1] text-[#777777]"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${block ? "w-full" : ""} h-10 rounded-[9px] px-4 text-[12px] font-black shadow-sm ${classes[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function StatusBar() {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-[44px] w-full items-center justify-between px-[34px] text-[17px] font-black">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="inline-block h-3 w-4 rounded-sm border-2 border-black" />
        <span className="h-2 w-5 rounded-sm bg-black" />
      </div>
    </div>
  );
}

function PhoneShell({ title, canBack = true, onBack, children }) {
  return (
    <div className="relative h-[874px] w-[402px] overflow-hidden rounded-[60px] bg-[#f6f6f4] text-[#111111] shadow-phone">
      <StatusBar />
      <div className="absolute left-0 top-0 h-[94px] w-full border-b border-[#e8e5dd] bg-white">
        {canBack ? (
          <button
            type="button"
            className="absolute left-4 top-[52px] h-10 w-10 text-left text-[22px] font-black"
            onClick={onBack}
          >
            &lt;
          </button>
        ) : null}
        <div className="pt-[61px] text-center text-[15px] font-black">{title}</div>
      </div>
      <main className="absolute inset-x-0 bottom-[34px] top-[94px] overflow-hidden">
        {children}
      </main>
      <div className="absolute bottom-2 left-1/2 h-[5px] w-[144px] -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

function Surface({ children, className = "", style }) {
  return <div className={`rounded-[14px] bg-white shadow-card ${className}`} style={style}>{children}</div>;
}

function FoodThumb({ item, className = "" }) {
  if (!item.image) {
    return (
      <div className={`grid place-items-center rounded-[10px] bg-[#eaf4ff] text-[13px] font-black text-[#2e8cff] ${className}`}>
        酒店实景图
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[10px] bg-[#f1f1ee] ${className}`}>
      <img src={item.image} alt="" className="h-full w-full object-cover object-right" />
    </div>
  );
}

function CandidateCard({ item, selected, compact = false, onAdd, onOpen }) {
  return (
    <Surface
      className={`${selected ? "bg-[#fff9dd]" : ""} relative overflow-hidden border-l-4 p-4`}
      style={{ borderLeftColor: item.accent }}
    >
      <button type="button" className="block w-full text-left" onClick={onOpen || onAdd}>
        <div className="max-w-[220px] text-[13px] font-black">{item.title}</div>
        <div className="mt-3 text-[10px] text-black/55">{item.meta}</div>
        <div className="mt-2 text-[10px] text-black/55">{item.support}</div>
        <div className="mt-2 text-[10px] font-black text-[#ff8a00]">{item.price}</div>
      </button>
      {compact ? null : (
        <button
          type="button"
          onClick={onAdd}
          className="absolute right-5 top-[54px] grid h-[34px] w-[92px] place-items-center rounded-[9px] bg-[#ffd400] text-[12px] font-black"
        >
          加入对比
        </button>
      )}
    </Surface>
  );
}

function HomeScreen({ onSelect }) {
  return (
    <PhoneShell title="智能决策助手" canBack={false}>
      <div className="h-full overflow-y-auto px-5 pb-6 pt-5">
        <div className="rounded-[0_0_18px_18px] bg-[#ffd400] p-4">
          <div className="text-[18px] font-black">美团本地生活智能决策助手</div>
          <div className="mt-2 text-[11px] leading-5 text-black/65">
            从候选对象开始，让 AI 帮你比较价格、时间、评价风险和规则限制。
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {verticalOrder.map((key) => {
            const data = verticalData[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                className="flex h-[116px] w-full items-center rounded-[14px] bg-white px-[18px] text-left shadow-card"
              >
                <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-[#fff7cf] text-[14px] font-black text-[#ff9f2e]">
                  {data.icon}
                </div>
                <div className="ml-4 min-w-0">
                  <div className="text-[13px] font-black">{data.homeTitle}</div>
                  <div className="mt-3 text-[10px] leading-5 text-black/55">{data.homeDescription}</div>
                </div>
                <div className="ml-auto text-[22px] text-black/35">&gt;</div>
              </button>
            );
          })}
        </div>
      </div>
    </PhoneShell>
  );
}

function SelectScreen({ vertical, selectedIds, onBack, onAdd, onPool, onSort }) {
  const data = verticalData[vertical];
  const items = [...data.candidates, ...data.extraCandidates];

  return (
    <PhoneShell title={data.selectTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto px-5 pb-[94px] pt-5">
        <div className="flex items-end justify-between">
          <h1 className="text-[17px] font-black">{data.selectTitle}</h1>
          <span className="text-[8px] text-black/30">最多选择6个对象</span>
        </div>
        <div className="mt-4 flex h-11 items-center rounded-full bg-white px-4 text-[11px] text-black/35">
          <span className="mr-2 h-3 w-3 rounded-full border border-black/20" />
          {data.searchPlaceholder}
        </div>
        <button type="button" className="mt-5 text-[10px] font-black" onClick={onSort}>
          {data.sortLabel} ^
        </button>
        <div className="mt-7 space-y-4">
          {items.map((item, index) => (
            <CandidateCard
              key={item.title}
              item={item}
              selected={index === 0 || selectedIds.includes(item.id)}
              onAdd={() => item.id && onAdd(item.id)}
            />
          ))}
        </div>
      </div>
      <Surface className="absolute bottom-[38px] left-4 right-4 flex h-16 items-center px-5">
        <div className="text-[13px] font-black">已选择 {selectedIds.length}/6</div>
        <div className="ml-9 text-[10px] text-black/55">点击查看候选池</div>
        <button type="button" onClick={onPool} className="ml-auto grid h-[34px] w-[62px] place-items-center rounded-[9px] bg-[#ffd400] text-[12px] font-black">
          查看
        </button>
      </Surface>
    </PhoneShell>
  );
}

function PoolScreen({ vertical, selectedIds, onBack, onCompare, onContinue, onInsufficient }) {
  const data = verticalData[vertical];
  const items = getItems(vertical).filter((item) => selectedIds.includes(item.id));

  return (
    <PhoneShell title="候选池" onBack={onBack}>
      <div className="h-full px-5 pb-5 pt-5">
        <h1 className="text-[18px] font-black">候选池</h1>
        <p className="mt-3 text-[10px] text-black/55">已选择 {selectedIds.length}/6，至少选择 2 个对象开始对比。</p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <Surface key={item.id} className="flex h-[58px] items-center px-4">
              <div>
                <div className="text-[12px] font-black">{item.title}</div>
                <div className="mt-2 text-[9px] text-black/55">{item.meta}</div>
              </div>
              <span className="ml-auto rounded-full bg-[#ffeff1] px-3 py-1 text-[10px] font-black text-[#ff5a66]">移除</span>
            </Surface>
          ))}
        </div>
        <div className="absolute bottom-10 left-5 right-5 space-y-3">
          <Button block onClick={selectedIds.length < 2 ? onInsufficient : onCompare}>
            开始智能对比
          </Button>
          <Button block variant="ghost" onClick={onContinue}>
            继续添加
          </Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function CompareScreen({ vertical, onBack, onRisk, onSummary, onPrice }) {
  const data = verticalData[vertical];
  const items = getItems(vertical);

  return (
    <PhoneShell title={data.compareTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto px-5 pb-5 pt-5">
        <h1 className="text-[18px] font-black">{data.compareTitle}</h1>
        <button type="button" onClick={onPrice} className="mt-4 w-full rounded-[10px] bg-[#fff9dd] px-4 py-3 text-left">
          <div className="text-[11px] font-black">{data.compareTip}</div>
          <div className="mt-2 text-[9px] leading-4 text-[#ff9f2e]">{data.compareSubTip}</div>
        </button>
        <div className="mt-6 overflow-hidden rounded-[6px] border border-[#e8e5dd] bg-white">
          <div className="grid grid-cols-4 bg-[#111111] text-center text-[8px] font-black text-white">
            <div className="py-3">维度</div>
            {items.map((item, index) => (
              <div key={item.id} className="py-3">{String.fromCharCode(65 + index)}</div>
            ))}
          </div>
          {data.fields.map(([label, key]) => (
            <div key={key} className="grid grid-cols-4 border-t border-[#e8e5dd] text-center text-[8.5px]">
              <div className="grid min-h-[39px] place-items-center font-black">{label}</div>
              {items.map((item) => (
                <div key={item.id} className="grid min-h-[39px] place-items-center px-1">{item.metrics[key]}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button variant="ghost" onClick={onRisk}>查看评价风险</Button>
          <Button variant="ghost" onClick={onPrice}>重新计算到手价</Button>
        </div>
        <div className="mt-3">
          <Button block variant="dark" onClick={onSummary}>生成AI决策总结</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function RiskScreen({ vertical, onBack, onCompare, onSummary, onAiError }) {
  const data = verticalData[vertical];
  const items = getItems(vertical);

  return (
    <PhoneShell title={data.riskTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto px-5 pb-5 pt-5">
        <h1 className="text-[18px] font-black">{data.riskTitle}</h1>
        <div className="mt-3 text-[10px] font-black text-[#ff9f2e]">{data.riskTip}</div>
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <Surface key={item.id} className="relative min-h-[116px] overflow-hidden p-4">
              <div className="max-w-[212px]">
                <div className="text-[12px] font-black">{item.title.replace(/^A /, "")}</div>
                <div className="mt-2 text-[9px] font-black text-[#10b979]">好评关键词：{item.review.positive}</div>
                <div className="mt-2 text-[9px] font-black text-[#ff5a66]">差评关键词：{item.review.negative}</div>
                <div className="mt-2 text-[8.5px] leading-4 text-black/55">成本/风险：{item.review.caution}</div>
              </div>
              <FoodThumb item={item} className="absolute right-0 top-0 h-[116px] w-[144px] opacity-90" />
              <span className="absolute right-4 top-4 rounded-full bg-[#fff1c7] px-3 py-1 text-[9px] font-black text-[#ff9f2e]">{item.review.tag}</span>
            </Surface>
          ))}
        </div>
        <div className="mt-7 space-y-3">
          <Button block onClick={onCompare}>返回智能对比</Button>
          <Button block variant="dark" onClick={onAiError || onSummary}>生成AI决策总结</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function SummaryScreen({ vertical, onBack, onConfirm, onFavorite, onShare, onPool }) {
  const data = verticalData[vertical];
  const items = getItems(vertical);

  return (
    <PhoneShell title={data.summaryTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto px-5 pb-5 pt-5">
        <h1 className="text-[18px] font-black">{data.summaryTitle}</h1>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <Surface key={item.id} className="relative min-h-[124px] overflow-hidden p-4" style={{ backgroundColor: item.summary.tint }}>
              <div className="max-w-[240px]">
                <div className="text-[9px] font-black text-[#ff9f2e]">{item.summary.label}</div>
                <div className="mt-2 text-[15px] font-black">{item.title}</div>
                <div className="mt-2 text-[9px] leading-4 text-black/55">推荐理由：{item.summary.reason}</div>
                <div className="text-[9px] leading-4 text-black/55">可能风险：{item.summary.risk}</div>
                <div className="text-[9px] leading-4 text-black/55">适合人群：{item.summary.audience}</div>
              </div>
              <FoodThumb item={item} className="absolute right-0 top-0 h-full w-[130px] opacity-90" />
              <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#ffd400] text-[13px] font-black">{item.summary.badge}</span>
            </Surface>
          ))}
        </div>
        <div className="mt-6 rounded-[12px] bg-[#fff5bf] p-4 text-[10px] font-black leading-5">{data.summaryTip}</div>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <Button onClick={onConfirm}>去下单</Button>
          <Button variant="dark" onClick={onFavorite}>加入收藏</Button>
          <Button variant="pale" onClick={onPool}>更换对比对象</Button>
          <Button variant="pale" onClick={onShare}>分享给朋友</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function ConfirmScreen({ vertical, onBack, onDetail, onFavorite }) {
  const data = verticalData[vertical];
  const item = getItems(vertical)[0];

  return (
    <PhoneShell title={data.confirmTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto px-5 pb-5 pt-5">
        <h1 className="text-[18px] font-black">{data.confirmTitle}</h1>
        <Surface className="relative mt-4 min-h-[126px] overflow-hidden p-4">
          <FoodThumb item={item} className="absolute inset-0 h-full w-full opacity-35" />
          <div className="relative flex items-center">
            <FoodThumb item={item} className="h-12 w-12 rounded-full" />
            <div className="ml-4">
              <div className="text-[16px] font-black">{item.title}</div>
              <div className="mt-3 text-[11px] font-black text-[#10b979]">AI判断：{item.summary.label}</div>
            </div>
          </div>
        </Surface>
        <div className="mt-9 space-y-4">
          {data.confirmRows.map(([label, key]) => (
            <Surface key={key} className="flex h-[58px] items-center px-5">
              <div className="text-[12px] text-black/55">{label}</div>
              <div className="ml-auto max-w-[230px] text-right text-[12px] font-black">{item.metrics[key]}</div>
            </Surface>
          ))}
        </div>
        <div className="mt-10">
          <Button block onClick={onDetail}>{data.primaryAction}</Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Button variant="ghost" onClick={onBack}>返回对比页</Button>
          <Button variant="dark" onClick={onFavorite}>{data.favoriteAction}</Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function DetailScreen({ vertical, onBack }) {
  const data = verticalData[vertical];
  const item = getItems(vertical)[0];

  return (
    <PhoneShell title={data.detailTitle} onBack={onBack}>
      <div className="h-full overflow-y-auto bg-white pb-8">
        <div className="relative h-[116px] px-5 pt-3">
          <FoodThumb item={item} className="absolute left-5 top-3 h-[58px] w-[58px]" />
          <div className="pl-[74px]">
            <div className="text-[16px] font-black">{item.details.title}</div>
            <div className="mt-2 text-[10px] text-black/55">{item.details.subtitle}</div>
            <div className="mt-3 inline-flex rounded-full bg-[#fff4bd] px-3 py-1 text-[10px] font-black text-[#ff8a00]">
              {item.details.coupon}
            </div>
          </div>
        </div>
        <div className="flex border-b border-[#e8e5dd] px-5">
          {data.detailTabs.map((tab, index) => (
            <div key={tab} className={`mr-8 py-4 text-[13px] ${index === 0 ? "font-black text-[#111111]" : "text-black/45"}`}>
              {tab}
            </div>
          ))}
        </div>
        <div className="bg-[#f6f6f4] px-5 py-5">
          <Surface className="p-4">
            <div className="text-[13px] font-black">{vertical === "hotel" ? "可订房型" : "推荐内容"}</div>
            <div className="mt-4 space-y-4">
              {item.details.menu.map((name, index) => (
                <div key={name} className="flex items-center">
                  <FoodThumb item={item} className="h-[62px] w-[62px]" />
                  <div className="ml-3 min-w-0">
                    <div className="text-[12px] font-black">{name}</div>
                    <div className="mt-2 text-[10px] text-black/55">{index === 0 ? "AI推荐优先" : "可作为备选"}</div>
                  </div>
                  <button type="button" className="ml-auto rounded-[8px] bg-[#ffd400] px-3 py-2 text-[10px] font-black">
                    购买
                  </button>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="mt-4 p-4">
            <div className="text-[13px] font-black">使用提醒</div>
            <div className="mt-3 text-[10px] leading-5 text-black/55">
              下单前建议再次确认价格、库存、可用时间和退改规则，避免实时变化影响决策。
            </div>
          </Surface>
        </div>
      </div>
    </PhoneShell>
  );
}

function Modal({ open, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 grid place-items-center rounded-[60px] bg-black/42 px-8"
        >
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.96 }}
            className="w-full rounded-[16px] bg-white p-7"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BottomSheet({ open, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 rounded-[60px] bg-black/42"
        >
          <motion.div
            initial={{ y: 220 }}
            animate={{ y: 0 }}
            exit={{ y: 220 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-white px-5 pb-8 pt-5"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function App() {
  const [vertical, setVertical] = useState("waimai");
  const [screen, setScreen] = useState("home");
  const [modal, setModal] = useState("none");
  const [selectedByVertical, setSelectedByVertical] = useState(() => ({
    waimai: ["waimai-a", "waimai-b", "waimai-c"],
    store: ["store-a", "store-b", "store-c"],
    hotel: ["hotel-a", "hotel-b", "hotel-c"]
  }));

  const selectedIds = selectedByVertical[vertical];
  const data = verticalData[vertical];

  const history = useMemo(() => {
    if (screen === "home") return "首页";
    return `${data.name} / ${screenLabels[screen]}`;
  }, [data.name, screen]);

  function chooseVertical(nextVertical) {
    setVertical(nextVertical);
    setScreen("select");
    setModal("none");
  }

  function addCandidate(id) {
    if (!id) return;
    setSelectedByVertical((previous) => {
      const current = previous[vertical];
      if (current.includes(id)) return previous;
      return { ...previous, [vertical]: [...current, id].slice(0, 6) };
    });
  }

  function back() {
    if (screen === "home") return;
    if (screen === "select") {
      setScreen("home");
      return;
    }
    const order = ["select", "pool", "compare", "risk", "summary", "confirm", "detail"];
    const index = order.indexOf(screen);
    setScreen(order[Math.max(0, index - 1)]);
  }

  function renderScreen() {
    if (screen === "home") return <HomeScreen onSelect={chooseVertical} />;
    if (screen === "select") {
      return (
        <SelectScreen
          vertical={vertical}
          selectedIds={selectedIds}
          onBack={back}
          onAdd={addCandidate}
          onPool={() => setScreen("pool")}
          onSort={() => setModal("sort")}
        />
      );
    }
    if (screen === "pool") {
      return (
        <PoolScreen
          vertical={vertical}
          selectedIds={selectedIds}
          onBack={back}
          onCompare={() => setScreen("compare")}
          onContinue={() => setScreen("select")}
          onInsufficient={() => setModal("insufficient")}
        />
      );
    }
    if (screen === "compare") {
      return (
        <CompareScreen
          vertical={vertical}
          onBack={back}
          onRisk={() => setScreen("risk")}
          onSummary={() => setScreen("summary")}
          onPrice={() => setModal("price")}
        />
      );
    }
    if (screen === "risk") {
      return (
        <RiskScreen
          vertical={vertical}
          onBack={back}
          onCompare={() => setScreen("compare")}
          onSummary={() => setScreen("summary")}
          onAiError={() => setModal("aiError")}
        />
      );
    }
    if (screen === "summary") {
      return (
        <SummaryScreen
          vertical={vertical}
          onBack={back}
          onConfirm={() => setScreen("confirm")}
          onFavorite={() => setModal("favorite")}
          onShare={() => setModal("share")}
          onPool={() => setScreen("pool")}
        />
      );
    }
    if (screen === "confirm") {
      return (
        <ConfirmScreen
          vertical={vertical}
          onBack={back}
          onDetail={() => setScreen("detail")}
          onFavorite={() => setModal("confirmFavorite")}
        />
      );
    }
    return <DetailScreen vertical={vertical} onBack={back} />;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#f0eee8_100%)] px-6 py-8 font-sans text-[#111111]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-[18px] bg-white/85 p-5 shadow-card backdrop-blur">
          <div className="text-[20px] font-black">美团智能决策助手</div>
          <div className="mt-2 text-[12px] leading-6 text-black/55">
            当前：{history}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {verticalOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => chooseVertical(item)}
                className={`h-10 rounded-[10px] text-[12px] font-black ${item === vertical ? "bg-[#ffd400]" : "bg-[#f6f6f4]"}`}
              >
                {verticalData[item].name}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {Object.keys(screenLabels).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScreen(key)}
                className={`h-9 rounded-[9px] text-[11px] font-black ${key === screen ? "bg-[#111111] text-white" : "bg-[#f6f6f4]"}`}
              >
                {screenLabels[key]}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button variant="ghost" onClick={() => setModal("insufficient")}>候选不足</Button>
            <Button variant="ghost" onClick={() => setModal("price")}>价格更新</Button>
            <Button variant="ghost" onClick={() => setModal("aiError")}>AI失败</Button>
            <Button variant="ghost" onClick={() => setModal("share")}>分享面板</Button>
          </div>
        </aside>

        <div className="flex justify-center">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${vertical}-${screen}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.24 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            <Modal open={modal === "sort"}>
              <div className="space-y-4 text-center">
                <div className="text-[16px] font-black">排序筛选</div>
                {["距离优先", "价格优先", "评价优先", "最近购买"].map((item) => (
                  <button key={item} type="button" onClick={() => setModal("none")} className="block h-9 w-full rounded-[9px] bg-[#f6f6f4] text-[12px] font-black">
                    {item}
                  </button>
                ))}
              </div>
            </Modal>

            <Modal open={modal === "insufficient"}>
              <div className="text-center">
                <div className="text-[16px] font-black">候选对象不足</div>
                <div className="mt-3 text-[12px] leading-6 text-black/55">请至少选择 2 个对象进行对比。</div>
                <div className="mt-5">
                  <Button block onClick={() => setModal("none")}>继续添加</Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "price"}>
              <div className="text-center">
                <div className="text-[16px] font-black">价格已更新</div>
                <div className="mt-3 text-[12px] leading-6 text-black/55">价格或优惠发生变化，请重新计算到手价。</div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button onClick={() => setModal("none")}>重新计算</Button>
                  <Button variant="ghost" onClick={() => setModal("none")}>稍后再说</Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "aiError"}>
              <div className="text-center">
                <div className="text-[16px] font-black">AI总结加载失败</div>
                <div className="mt-3 text-[12px] leading-6 text-black/55">AI暂时无法生成总结，已有的基础对比仍可查看。</div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button onClick={() => { setModal("none"); setScreen("summary"); }}>重新生成</Button>
                  <Button variant="ghost" onClick={() => setModal("none")}>查看基础对比</Button>
                </div>
              </div>
            </Modal>

            <Modal open={modal === "favorite" || modal === "confirmFavorite"}>
              <div className="text-center">
                <div className="text-[16px] font-black">收藏成功</div>
                <div className="mt-3 text-[12px] leading-6 text-black/55">已将推荐对象加入收藏，之后可在收藏列表中查看。</div>
                <div className="mt-5">
                  <Button block onClick={() => setModal("none")}>知道了</Button>
                </div>
              </div>
            </Modal>

            <BottomSheet open={modal === "share"}>
              <div className="text-center text-[16px] font-black">分享至</div>
              <div className="mt-6 grid grid-cols-4 gap-y-6 text-center">
                {shareOptions.map(([label, color]) => (
                  <button key={label} type="button" onClick={() => setModal("none")}>
                    <span
                      className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[14px] font-black"
                      style={{ backgroundColor: color, color: color === "#ffd400" || color === "#d9d9d9" ? "#111111" : "#ffffff" }}
                    >
                      {label.slice(0, 1)}
                    </span>
                    <span className="mt-2 block text-[11px] text-black/45">{label}</span>
                  </button>
                ))}
              </div>
            </BottomSheet>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
