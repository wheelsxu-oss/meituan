import type { PropsWithChildren } from "react";

type PhoneShellProps = PropsWithChildren<{
  pageTitle: string;
  backLabel?: string;
  onBack?: () => void;
  showBack?: boolean;
}>;

export function PhoneShell({
  backLabel = "<",
  children,
  onBack,
  pageTitle,
  showBack = true
}: PhoneShellProps) {
  return (
    <div className="relative h-[874px] w-[402px] overflow-hidden rounded-[54px] bg-paper shadow-phone">
      <div className="absolute inset-x-0 top-0 z-20 h-[94px] bg-white">
        <div className="flex items-end justify-between px-6 pb-4 pt-5 text-[17px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-4 rounded-sm border border-black/70" />
            <span className="h-3 w-4 rounded-sm border border-black/70" />
            <span className="h-4 w-6 rounded-[4px] border border-black/70" />
          </div>
        </div>
        <div className="flex items-center gap-2 px-5 pb-3">
          <button
            className={[
              "h-7 w-7 text-left text-[24px] leading-none text-ink",
              showBack ? "" : "pointer-events-none opacity-0"
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={onBack}
            type="button"
          >
            {backLabel}
          </button>
          <div className="flex-1 pr-9 text-center text-[15px] font-bold text-[#1f1f1f]">
            {pageTitle}
          </div>
        </div>
        <div className="h-px w-full bg-line" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[34px]">
        <div className="absolute bottom-2 left-1/2 h-[5px] w-36 -translate-x-1/2 rounded-full bg-black" />
      </div>
      <div className="absolute inset-0 overflow-hidden pt-[94px]">{children}</div>
    </div>
  );
}
