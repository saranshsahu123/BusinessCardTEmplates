//
// 💡 This is your new "super-renderer"
// Replace all of templates/DynamicCard.tsx with this
// It includes the new premium layouts and decorations
//

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import type { BusinessCardData } from "../BusinessCardForm";
import { getContrastingTextColor } from "@/lib/utils";

// --- 1. Updated Config with new Premium options ---
export interface DesignConfig {
  id: string;
  name: string;
  bgStyle: "solid" | "gradient" | "radial";
  bgColors: string[];
  textColor: string;
  accentColor: string;
  layout:
    | "left-align"
    | "centered"
    | "split"
    | "modern"
    | "logo-centric-front"
    | "info-grid-back"
    | "elegant-curve" // <-- NEW
    | "minimal-border-left"; // <-- NEW
  decoration:
    | "none"
    | "overlay-glow"
    | "corner-shape"
    | "abstract-blobs"
    | "subtle-pattern"; // <-- NEW
  fontWeight: "normal" | "medium" | "bold";
  fontFamily: string;
  borderStyle: "none" | "solid" | "dashed";
}

interface DynamicCardProps {
  data: BusinessCardData;
  designConfig: DesignConfig;
}

// --- 2. Helper Functions (Unchanged) ---
const getBackgroundStyle = (
  style: DesignConfig["bgStyle"],
  colors: string[]
): React.CSSProperties => {
  const [colorA = "#ffffff", colorB = "#f0f0f0"] = colors;
  switch (style) {
    case "solid":
      return { backgroundColor: colorA };
    case "gradient":
      return { background: `linear-gradient(135deg, ${colorA}, ${colorB})` };
    case "radial":
      return { background: `radial-gradient(circle, ${colorA}, ${colorB})` };
    default:
      return { backgroundColor: colorA };
  }
};

const getFontStyle = (
  fontFamily: string,
  textColor: string,
  fontWeight: DesignConfig["fontWeight"]
): React.CSSProperties => {
  return {
    fontFamily: fontFamily || "'Poppins', sans-serif",
    color: textColor,
    fontWeight: fontWeight || "normal",
  };
};

// --- 3. Updated Decorations ---
const renderDecoration = (
  decoration: DesignConfig["decoration"],
  accentColor: string
) => {
  switch (decoration) {
    // --- NEW: A subtle background pattern ---
    case "subtle-pattern":
      return (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, " +
              accentColor +
              " 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      );
    case "overlay-glow":
      return (
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${accentColor}, transparent 70%)`,
          }}
        />
      );
    case "corner-shape":
      return (
        <div
          className="absolute top-0 left-0 w-0 h-0 border-t-[80px] border-r-[80px] border-t-transparent opacity-30"
          style={{ borderRightColor: accentColor }}
        />
      );
    // ... (other decorations)
    default:
      return null;
  }
};

// --- 4. Main Component (with Contrast Fix) ---
export const DynamicCard = ({ data, designConfig }: DynamicCardProps) => {
  const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.title}\nORG:${data.company}\nEMAIL:${data.email}\nTEL:${data.phone}\nURL:${data.website}\nADR:${data.address}\nEND:VCARD`;

  const {
    bgStyle,
    bgColors,
    accentColor,
    layout,
    decoration,
    fontWeight,
    fontFamily,
    borderStyle,
  } = designConfig;

  // --- Contrast Fix (Ensures text is always readable) ---
  const primaryBgColor = designConfig.bgColors[0] || "#ffffff";
  const readableTextColor = getContrastingTextColor(primaryBgColor);
  // ---

  const cardStyle: React.CSSProperties = {
    ...getBackgroundStyle(bgStyle, bgColors),
    ...getFontStyle(fontFamily, readableTextColor, fontWeight),
    border:
      borderStyle !== "none" ? `2px ${borderStyle} ${accentColor}` : "none",
  };

  const iconStyle = { color: accentColor };
  const initials = (data.company || "AC").slice(0, 2).toUpperCase();

  // --- 5. Updated Layout Renderer ---
  const renderLayout = () => {
    switch (layout) {
      // --- NEW PREMIUM LAYOUT: Elegant Curve ---
      // (Inspired by your "Michel Clark" example)
      case "elegant-curve":
        return (
          <div className="relative z-10 h-full p-6 flex flex-col justify-between">
            <div
              className="absolute top-0 left-0 w-3/5 h-2/5 rounded-br-full"
              style={{ backgroundColor: accentColor }}
            />
            <div
              className="absolute bottom-0 right-0 w-3/5 h-2/5 rounded-tl-full"
              style={{ backgroundColor: accentColor }}
            />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold">{data.company || "Company"}</h3>
              <p className="text-sm opacity-90">{data.title || "Job Title"}</p>
            </div>
            
            <div className="relative z-10 text-right">
              <h3 className="text-xl font-bold">{data.name || "Your Name"}</h3>
              <div className="text-xs space-y-1 opacity-90 mt-2">
                {data.phone && <div className="flex items-center justify-end gap-1"><Phone style={iconStyle} className="w-3 h-3" /> {data.phone}</div>}
                {data.email && <div className="flex items-center justify-end gap-1"><Mail style={iconStyle} className="w-3 h-3" /> {data.email}</div>}
                {data.website && <div className="flex items-center justify-end gap-1"><Globe style={iconStyle} className="w-3 h-3" /> {data.website}</div>}
              </div>
            </div>
          </div>
        );

      // --- NEW PREMIUM LAYOUT: Minimal Border ---
      // (Inspired by your clean, corporate examples)
      case "minimal-border-left":
        return (
          <div className="relative z-10 h-full p-6 flex items-center">
            <div
              className="absolute left-0 top-0 h-full w-2"
              style={{ backgroundColor: accentColor }}
            />
            <div className="pl-6 w-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-3xl font-bold">{data.name || "Your Name"}</h3>
                  <p className="text-lg" style={{ color: accentColor }}>{data.title || "Job Title"}</p>
                </div>
                {data.name && data.email && (
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <QRCodeSVG value={vCardData} size={60} />
                  </div>
                )}
              </div>
              <hr className="my-3" style={{ borderColor: accentColor + '40' }} />
              <p className="text-sm font-medium mb-3">{data.company || "Company Name"}</p>
              <div className="text-xs space-y-1.5 opacity-90">
                {data.email && <div className="flex items-center gap-2"><Mail style={iconStyle} className="w-3 h-3" /><span>{data.email}</span></div>}
                {data.phone && <div className="flex items-center gap-2"><Phone style={iconStyle} className="w-3 h-3" /><span>{data.phone}</span></div>}
                {data.website && <div className="flex items-center gap-2"><Globe style={iconStyle} className="w-3 h-3" /><span>{data.website}</span></div>}
              </div>
            </div>
          </div>
        );

      // --- Logo-Centric Front ---
      case "logo-centric-front":
        // ... (code from previous step, unchanged)
        return (
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
            {data.logo ? (
              <img src={data.logo} alt="Company Logo" className="w-24 h-24 object-contain" />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: accentColor,
                  color: getContrastingTextColor(accentColor),
                }}
              >
                <span className="text-4xl font-bold">{initials}</span>
              </div>
            )}
            <h3 className="text-3xl font-bold mt-4">{data.company || "Company Name"}</h3>
          </div>
        );

      // --- Info-Grid Back ---
      case "info-grid-back":
        // ... (code from previous step, unchanged)
        return (
          <div className="relative z-10 flex justify-between h-full p-6">
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold">{data.name || "Your Name"}</h3>
                <p className="text-sm opacity-90" style={{ color: accentColor }}>
                  {data.title || "Job Title"}
                </p>
              </div>
              <div className="text-xs space-y-1.5 opacity-90">
                {data.phone && <div className="flex items-center gap-2"><Phone style={iconStyle} className="w-3 h-3" /><span>{data.phone}</span></div>}
                {data.email && <div className="flex items-center gap-2"><Mail style={iconStyle} className="w-3 h-3" /><span>{data.email}</span></div>}
                {data.website && <div className="flex items-center gap-2"><Globe style={iconStyle} className="w-3 h-3" /><span>{data.website}</span></div>}
                {data.address && <div className="flex items-center gap-2"><MapPin style={iconStyle} className="w-3 h-3" /><span>{data.address}</span></div>}
              </div>
            </div>
            {data.name && data.email && (
              <div className="flex items-end">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <QRCodeSVG value={vCardData} size={70} />
                </div>
              </div>
            )}
          </div>
        );
        
      // --- Other layouts (split, modern, centered) ---
      // ... (put the other cases from the previous file here) ...


      // --- Default/Left-Align Layout ---
      case "left-align":
      default:
        // ... (code from previous step, unchanged)
        return (
          <div className="relative z-10 flex flex-col justify-between h-full p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{data.name || "Your Name"}</h3>
                <p className="text-sm opacity-90">{data.title || "Job Title"}</p>
                <p className="text-xs opacity-75">{data.company || "Company Name"}</p>
              </div>
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg"
                style={{
                  background: accentColor,
                  color: getContrastingTextColor(accentColor),
                }}
              >
                {initials}
              </div>
            </div>
            <div className="flex justify-between items-end text-xs opacity-90">
              <div className="space-y-1">
                {data.email && <div className="flex items-center gap-1"><Mail style={iconStyle} className="w-3 h-3" /> {data.email}</div>}
                {data.phone && <div className="flex items-center gap-1"><Phone style={iconStyle} className="w-3 h-3" /> {data.phone}</div>}
                {data.website && <div className="flex items-center gap-1"><Globe style={iconStyle} className="w-3 h-3" /> {data.website}</div>}
              </div>
              {data.name && data.email && (
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <QRCodeSVG value={vCardData} size={60} />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full aspect-[1.75/1] rounded-lg overflow-hidden shadow-xl"
      style={cardStyle}
    >
      {renderDecoration(decoration, accentColor)}
      {renderLayout()}
    </div>
  );
};