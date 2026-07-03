import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "muted";
type ButtonSize = "md" | "sm";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    block?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }
>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-ink hover:brightness-95",
  secondary: "bg-ink text-white hover:opacity-95",
  ghost: "bg-white text-ink ring-1 ring-black/5 hover:bg-white/90",
  muted: "bg-[#f3f3f1] text-black/65 hover:bg-[#ecebe7]"
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-[13px]",
  sm: "h-8 px-3 text-[12px]"
};

export function Button({
  block,
  children,
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-xl font-semibold transition",
        block ? "w-full" : "",
        sizeClasses[size],
        variantClasses[variant],
        className
      ]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
