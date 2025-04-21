module.exports = {
    content: ["./src/**/*.{astro,js,jsx,ts,tsx}"],
    theme: {
      extend: {
        keyframes: {
          gradientFlow: {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
          },
          textGlow: {
            "0%, 100%": {
              textShadow: "0 0 4px rgba(255,255,255,0.2)",
            },
            "50%": {
              textShadow: "0 0 8px rgba(255,255,255,0.6)",
            },
          },
        },
        animation: {
          gradientFlow: "gradientFlow 6s ease-in-out infinite",
          textGlow: "textGlow 3s ease-in-out infinite",
        },
      },
    },
    plugins: [],
};
  