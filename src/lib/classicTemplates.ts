//
// 💡 FILE 1: lib/classicTemplates.ts
// (Updated with more color variety and correct layouts)
//

// --- 1. Define the config for a SINGLE SIDE ---
export interface ClassicSideConfig {
  layout:
    | "front-logo-centric"
    | "front-minimal-vertical"
    | "front-logo-left"
    | "back-info-sidebar-right"
    | "back-info-sidebar-left"
    | "back-elegant-curves"
    | "back-info-standard"
    | "front-pattern-band";
  bgStyle: "solid" | "gradient";
  bgColors: string[];
  textColor: string;
  accentColor: string;
  fontFamily: string;
  orientation: "horizontal" | "vertical";
  pattern: "none" | "damask";
}

// --- 2. Define the config for a FULL TEMPLATE (Front + Back) ---
export interface ClassicTemplate {
  id: string;
  name: string;
  front: ClassicSideConfig;
  back: ClassicSideConfig;
}

// --- 3. Define Professional Palettes (NOW WITH MORE LIGHT OPTIONS) ---
const premiumPalettes = [
  {
    name: "Dark Teal & Gold", //
    bgDark: ["#0a192f", "#1a2f3e"],
    textLight: "#FFFFFF",
    accent: "#d4af37",
    bgLight: ["#FFFFFF"],
    textDark: "#0a192f",
  },
  {
    name: "Clean White", // Light Theme
    bgDark: ["#FFFFFF", "#FFFFFF"],
    textLight: "#222222",
    accent: "#007aff",
    bgLight: ["#F4F4F4", "#F4F4F4"],
    textDark: "#222222",
  },
  {
    name: "Warm Neutral", // Light Theme
    bgDark: ["#F3EFE0", "#F3EFE0"],
    textLight: "#5D4037",
    accent: "#8D6E63",
    bgLight: ["#FFFFFF"],
    textDark: "#5D4037",
  },
  {
    name: "Maroon & White", //
    bgDark: ["#5D001E", "#5D001E"],
    textLight: "#FFFFFF",
    accent: "#E3E2DF",
    bgLight: ["#FFFFFF"],
    textDark: "#3D3D3D",
  },
  {
    name: "Cream & Bronze", //
    bgDark: ["#F5EFE6", "#F5EFE6"],
    textLight: "#4E3629",
    accent: "#B08968",
    bgLight: ["#FFFFFF"],
    textDark: "#4E3629",
  },
];

// --- 4. Define Layout & Orientation Combinations ---
const layouts = [
  { 
    name: "Corporate Sidebar", 
    front: "front-logo-left", 
    back: "back-info-sidebar-right" 
  },
  { 
    name: "Elegant Curves", 
    front: "front-logo-centric", 
    back: "back-elegant-curves" 
  },
  { 
    name: "Minimalist Vertical", 
    front: "front-minimal-vertical", 
    back: "back-info-sidebar-left" 
  },
  { 
    name: "Classic Pattern", 
    front: "front-pattern-band", 
    back: "back-info-standard" 
  },
];

const fonts = ["'Inter', sans-serif", "'Merriweather', serif", "'Poppins', sans-serif"];

// --- 5. The Generator Function ---
export const generateClassicTemplates = (count: number): ClassicTemplate[] => {
  const templates: ClassicTemplate[] = [];

  for (let i = 0; i < count; i++) {
    const palette = premiumPalettes[i % premiumPalettes.length];
    const layout = layouts[i % layouts.length];
    const font = fonts[i % fonts.length];
    
    // Make vertical cards use vertical layouts
    const effectiveLayout = (i % 3 === 0) 
      ? layouts[2] // Force 'Minimalist Vertical'
      : layout;

    const effectiveOrientation = effectiveLayout.name === 'Minimalist Vertical' 
      ? 'vertical' 
      : 'horizontal';
      
    const name = `${palette.name} ${effectiveLayout.name}`;

    templates.push({
      id: `classic-${i.toString().padStart(3, "0")}`,
      name: name,
      front: {
        layout: effectiveLayout.front as ClassicSideConfig["layout"],
        bgStyle: "solid",
        bgColors: palette.bgDark,
        textColor: palette.textLight,
        accentColor: palette.accent,
        fontFamily: font,
        orientation: effectiveOrientation,
        pattern: effectiveLayout.name === 'Classic Pattern' ? 'damask' : 'none',
      },
      back: {
        layout: effectiveLayout.back as ClassicSideConfig["layout"],
        bgStyle: "solid",
        bgColors: palette.bgLight,
        textColor: palette.textDark,
        accentColor: palette.bgDark[0], 
        fontFamily: font,
        orientation: effectiveOrientation,
        pattern: "none",
      },
    });
  }

  return templates;
};