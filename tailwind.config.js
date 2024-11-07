/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        pocket: "300px",
        tablet: "750px",
        desktop: "1285px",
      },
      colors: {
        primaryBg: "#F5F5F5",
        secondaryBg: "#ECECEC",
        primaryBtn: " #28A745",
        primaryBtnHover: "#218838",
        secondaryBtn: "#007BFF",
        secondaryBtnHover: "#0056b3",
        warning: "#FFC107",
        warningHover: "#FF8800",
        info: "#17A2B8",
        infoHover: "#0096C7",
        danger: "#DC3545",
        dangerHover: "#C82333",
        formBg: "#F8F9FA",
        formHeaderBg: "#121063",
        inputBorder: "#CED4DA",
        inputBorderFocus: "#80BDFF",
        inputText: "#495057",
        placeHolderText: "#6C757D",
      },
      boxShadow: {
        sm: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        md: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        lg: "0px 6px 12px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "slide-up": "slide-up 0.20s ease-in",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-motion"),
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        // this customization only for firefox
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#121063 #F5F5F5",
        },

        // this customization for chrome, safari, edge etc..
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#121063 #F5F5F5",
            border: "1px solid white",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
