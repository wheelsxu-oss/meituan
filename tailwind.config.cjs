/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        phone: "0 32px 80px rgba(15, 23, 42, 0.16)",
        card: "0 12px 24px rgba(15, 23, 42, 0.08)"
      },
      colors: {
        shell: "#f3efe7",
        paper: "#f6f6f4",
        ink: "#111111",
        brand: "#ffd400",
        mellow: "#fff7cf",
        line: "#e8e5dd"
      },
      fontFamily: {
        sans: ["Noto Sans SC", "PingFang SC", "Microsoft YaHei", "sans-serif"]
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        floatIn: "floatIn 300ms ease-out"
      }
    }
  },
  plugins: []
};
