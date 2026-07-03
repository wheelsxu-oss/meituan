import type { HTMLAttributes, PropsWithChildren } from "react";

type SurfaceProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean;
  }
>;

export function Surface({
  children,
  className = "",
  interactive = false,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={[
        "rounded-[18px] bg-white shadow-card",
        interactive ? "transition hover:-translate-y-0.5" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
