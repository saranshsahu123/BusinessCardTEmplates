//
// 💡 This is your new, "smarter" mock AI service
// Replace all of services/designService.ts with this
//

import type { BusinessCardData } from "@/components/BusinessCardForm";
import type { DesignConfig } from "@/components/templates/DynamicCard";

// --- 1. Define Professional Color Themes ---
// These are based on the "premium" examples you sent.
// We are no longer using getRandomColor().

type ColorTheme = {
  name: string;
  frontBg: string[];
  frontAccent: string;
  backBg: string[];
  backAccent: string;
};

const premiumThemes: ColorTheme[] = [
  {
    name: "Dark & Gold", // Like your "Michel Clark" example
    frontBg: ["#0a192f", "#0a192f"],
    frontAccent: "#d4af37",
    backBg: ["#ffffff", "#ffffff"],
    backAccent: "#0a192f",
  },
  {
    name: "Minimalist Contractor", // Like your "Model Contractor" example
    frontBg: ["#2d3748", "#2d3748"],
    frontAccent: "#e2e8f0",
    backBg: ["#ffffff", "#ffffff"],
    backAccent: "#2d3748",
  },
  {
    name: "Corporate Blue", // Like your "Code Pro" example
    frontBg: ["#ffffff", "#ffffff"],
    frontAccent: "#2563eb",
    backBg: ["#f4f4f5", "#f4f4f5"],
    backAccent: "#2563eb",
  },
  {
    name: "Light & Floral", // Like your "Baraa Lupaid" example
    frontBg: ["#ffffff", "#ffffff"],
    frontAccent: "#f59e0b",
    backBg: ["#f9fafb", "#f9fafb"],
    backAccent: "#f59e0b",
  },
  {
    name: "Bold Orange", // Like your "Favorites" example
    frontBg: ["#f97316", "#f97316"],
    frontAccent: "#ffffff",
    backBg: ["#ffffff", "#ffffff"],
    backAccent: "#f97316",
  },
  {
    name: "Elegant Teal",
    frontBg: ["#0d9488", "#0d9488"],
    frontAccent: "#f0abfc",
    backBg: ["#f0fdfa", "#f0fdfa"],
    backAccent: "#0d9488",
  },
];

// --- 2. Helper to Pick Random Items ---

const getRandomItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// --- 3. The New Mock AI Function ---

export const generateDesigns = async (
  count: number,
  data: BusinessCardData
): Promise<any[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const designs: any[] = [];

  // Define *better* layout and font options
  const layouts: DesignConfig["layout"][] = [
    "logo-centric-front",
    "info-grid-back",
    "elegant-curve", // New premium layout
    "minimal-border-left", // New premium layout
    "modern",
    "split",
    "centered",
  ];
  const decorations: DesignConfig["decoration"][] = [
    "none",
    "overlay-glow",
    "corner-shape",
    "subtle-pattern", // New premium decoration
  ];
  const fontFamilies = [
    "'Inter', sans-serif",
    "'Poppins', sans-serif",
    "'Merriweather', serif",
  ];
  const fontWeights: DesignConfig["fontWeight"][] = ["normal", "medium", "bold"];

  for (let i = 0; i < count; i++) {
    // --- THIS IS THE KEY ---
    // First, pick a professional theme
    const theme = getRandomItem(premiumThemes);

    // Then, pick layouts for front and back
    const frontLayout = getRandomItem(layouts.filter(l => l.includes('front') || l !== 'info-grid-back'));
    const backLayout = getRandomItem(layouts.filter(l => l.includes('back') || l !== 'logo-centric-front'));

    designs.push({
      id: `ai-design-${i + 1}`,
      name: theme.name,

      front: {
        bgStyle: getRandomItem(["solid", "gradient"]),
        bgColors: theme.frontBg,
        accentColor: theme.frontAccent,
        layout: frontLayout,
        decoration: getRandomItem(decorations),
        fontWeight: getRandomItem(fontWeights),
        fontFamily: getRandomItem(fontFamilies),
        borderStyle: "none",
      },
      back: {
        bgStyle: "solid",
        bgColors: theme.backBg,
        accentColor: theme.backAccent,
        layout: backLayout,
        decoration: getRandomItem(decorations.filter(d => d !== 'overlay-glow')), // No glow on white
        fontWeight: "normal",
        fontFamily: getRandomItem(fontFamilies),
        borderStyle: "none",
      },
    });
  }

  return designs;
};