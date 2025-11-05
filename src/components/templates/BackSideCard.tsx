// import { BusinessCardData } from "../BusinessCardForm";
// import { QRCodeSVG } from "qrcode.react";

// interface BackSideCardProps {
//   data: BusinessCardData;
//   background: { style: "solid" | "gradient"; colors: string[] };
//   textColor: string;
//   accentColor: string;
//   fontFamily?: string;
//   fontSize?: number;
// }

// export const BackSideCard = ({
//   data,
//   background,
//   textColor,
//   accentColor,
//   fontFamily = "Arial, sans-serif",
//   fontSize,
// }: BackSideCardProps) => {
//   const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.title}\nORG:${data.company}\nEMAIL:${data.email}\nTEL:${data.phone}\nURL:${data.website}\nADR:${data.address}\nEND:VCARD`;
//   const getBgStyle = () => {
//     if (background.style === "gradient" && background.colors.length >= 2) {
//       return { background: `linear-gradient(135deg, ${background.colors[0]}, ${background.colors[1]})` };
//     }
//     return { backgroundColor: background.colors[0] };
//   };

//   return (
//     <div
//       className="w-full aspect-[1.75/1] p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-lg rounded-xl"
//       style={{
//         ...getBgStyle(),
//         color: textColor,
//         fontFamily,
//         fontSize: fontSize ? `${fontSize}px` : "16px",
//       }}
//     >
//       <div className="w-full max-w-sm text-center space-y-3">
//         {data.email && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: accentColor }}>✉ </span>
//             <span>{data.email}</span>
//           </div>
//         )}
//         {data.phone && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: accentColor }}>✆ </span>
//             <span>{data.phone}</span>
//           </div>
//         )}
//         {data.website  && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: accentColor }}>⌂ </span>
//             <span>{data.website}</span>
//           </div>
//         )}
//         {data.address && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: accentColor }}>Address: </span>
//             <span>{data.address}</span>
//           </div>
//         )}
//       </div>
//       {/* {data.name && (data.email || data.phone) && (
//         <div className="mt-6 bg-white p-2 rounded-lg shadow-md">
//           <QRCodeSVG value={vCardData} size={64} />
//         </div>
//       )} */}
//     </div>
//   );
// };

// src/components/BackSideCard.tsx
// import React from "react";
// import { QRCodeSVG } from "qrcode.react";
// import type { ClassicDesignConfig } from "@/lib/classicTemplates";
// import { BusinessCardData } from "../BusinessCardForm";

// interface BackSideCardProps {
//   data: BusinessCardData;
//   config?: ClassicDesignConfig; // optional: if provided, back will match front
//   background?: { style: "solid" | "gradient"; colors: string[] };
//   textColor?: string;
//   accentColor?: string;
//   fontFamily?: string;
//   fontSize?: number;
//   patternOpacity?: number;
//   showQRCode?: boolean;
// }

// export const BackSideCard: React.FC<BackSideCardProps> = ({
//   data,
//   config,
//   background,
//   textColor,
//   accentColor,
//   fontFamily = "Inter, Arial, sans-serif",
//   fontSize,
//   patternOpacity = 0.08,
//   showQRCode = true,
// }) => {
//   // Choose values: prefer config (matching front) else background props
//   const bgStyle = config?.bgStyle ?? (background ? background.style : "solid");
//   const bgColors = config?.bgColors ?? (background ? background.colors : ["#ffffff"]);
//   const appliedText = textColor ?? config?.textColor ?? "#0f172a";
//   const appliedAccent = accentColor ?? config?.accentColor ?? "#1f2937";
//   const pattern = config?.pattern ?? "none";

//   const getBgStyle = (): React.CSSProperties => {
//     if (bgStyle === "gradient" && bgColors.length >= 2) {
//       const angle = config?.gradientAngle ?? 135;
//       return { background: `linear-gradient(${angle}deg, ${bgColors[0]}, ${bgColors[1]})` };
//     }
//     // pattern or solid base color
//     return { backgroundColor: bgColors[0] };
//   };

//   const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.title}\nORG:${data.company}\nEMAIL:${data.email}\nTEL:${data.phone}\nURL:${data.website}\nADR:${data.address}\nEND:VCARD`;

//   const patternMap: Record<string, (accent: string, scale?: number) => React.CSSProperties> = {
//     dots: (accent, scale = 22) => ({
//       backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     grid: (accent, scale = 26) => ({
//       backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     waves: (accent, scale = 180) => ({
//       backgroundImage: `radial-gradient(circle at 20% 30%, ${accent} 0%, transparent 35%), radial-gradient(circle at 80% 70%, ${accent} 0%, transparent 35%)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     zigzag: (accent, scale = 18) => ({
//       backgroundImage: `repeating-linear-gradient(45deg, ${accent}, ${accent} 2px, transparent 2px, transparent ${scale}px)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     mesh: (accent, scale = 220) => ({
//       backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     stripes: (accent, scale = 36) => ({
//       backgroundImage: `repeating-linear-gradient(135deg, ${accent}, ${accent} 10px, transparent 10px, transparent ${scale}px)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     radial: (accent, scale = 300) => ({
//       backgroundImage: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 45%)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     diagonal: (accent, scale = 60) => ({
//       backgroundImage: `repeating-linear-gradient(135deg, ${accent}, ${accent} 2px, transparent 2px, transparent ${scale}px)`,
//       backgroundSize: `${scale}px ${scale}px`,
//     }),
//     none: () => ({}),
//   };

//   const borderClass = config?.borderStyle === "rounded" ? "rounded-xl" : config?.borderStyle === "dashed" ? "border-2 border-dashed" : "";

//   return (
//     <div
//       className={`w-full aspect-[1.75/1] p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-lg ${borderClass}`}
//       style={{
//         ...getBgStyle(),
//         color: appliedText,
//         fontFamily,
//         fontSize: fontSize ? `${fontSize}px` : "15px",
//       }}
//     >
//       {/* pattern overlay */}
//       {pattern && pattern !== "none" && (
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             ...(patternMap[pattern] ? patternMap[pattern](appliedAccent, config?.patternScale) : {}),
//             opacity: patternOpacity,
//             mixBlendMode: bgStyle === "gradient" ? "overlay" : "soft-light",
//           }}
//         />
//       )}

//       <div className="w-full max-w-sm text-center z-10 space-y-3">
//         {data.email && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: appliedAccent }}>
//               ✉
//             </span>{" "}
//             <span>{data.email}</span>
//           </div>
//         )}
//         {data.phone && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: appliedAccent }}>
//               ✆
//             </span>{" "}
//             <span>{data.phone}</span>
//           </div>
//         )}
//         {data.website && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: appliedAccent }}>
//               ⌂
//             </span>{" "}
//             <span>{data.website}</span>
//           </div>
//         )}
//         {data.address && (
//           <div className="text-sm">
//             <span className="font-semibold" style={{ color: appliedAccent }}>
//               📍
//             </span>{" "}
//             <span>{data.address}</span>
//           </div>
//         )}
//       </div>

//       {showQRCode && data.name && (data.email || data.phone) && (
//         <div className="mt-6 bg-white/80 p-2 rounded-lg shadow-md z-10">
//           <QRCodeSVG value={vCardData} size={64} />
//         </div>
//       )}
//     </div>
//   );
// };
// export default BackSideCard;

// src/components/BackSideCard.tsx
import React from "react";
import type { ClassicDesignConfig } from "@/lib/classicTemplates";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  data: {
    name?: string;
    title?: string;
    company?: string;
    logo?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  config?: ClassicDesignConfig;
  background?: { style: "solid" | "gradient"; colors: string[] };
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
  fontSize?: number;
  showLargeQR?: boolean;
}

export const BackSideCard: React.FC<Props> = ({
  data,
  config,
  background,
  textColor,
  accentColor,
  fontFamily,
  fontSize = 15,
  showLargeQR = true,
}) => {
  const appliedAccent = accentColor ?? config?.accentColor ?? "#4f46e5";
  const appliedText = textColor ?? config?.textColor ?? "#ffffff";

  const bgStyle: React.CSSProperties = (() => {
    const style = config?.bgStyle ?? background?.style ?? "gradient";
    const colors = config?.bgColors ?? background?.colors ?? ["#0f172a", "#1e293b"];
    if (style === "gradient" && colors.length >= 2) {
      return {
        background: `linear-gradient(145deg, ${colors[0]}, ${colors[1]})`,
      };
    }
    return { backgroundColor: colors[0] };
  })();

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.title}
ORG:${data.company}
EMAIL:${data.email}
TEL:${data.phone}
URL:${data.website}
ADR:${data.address}
END:VCARD`;

  return (
    <div
      className="w-full aspect-[1.75/1] relative overflow-hidden rounded-2xl shadow-2xl border border-white/10"
      style={{
        ...bgStyle,
        color: appliedText,
        fontFamily: fontFamily ?? config?.fontFamily ?? "Poppins, Inter, sans-serif",
        fontSize,
      }}
    >
      {/* Subtle radial light glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 70%)",
        }}
      ></div>

      {/* Decorative gradient stripes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[120%] h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-2"
          style={{ filter: "blur(1px)" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[120%] h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-2"
          style={{ filter: "blur(1px)" }}
        ></div>
      </div>

      {/* Glass overlay card */}
      <div className="absolute inset-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center text-center p-6 z-10">
        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {data.email && (
            <div className="text-sm tracking-wide">
              <span style={{ color: appliedAccent }}>✉ </span>
              {data.email}
            </div>
          )}
          {data.phone && (
            <div className="text-sm tracking-wide">
              <span style={{ color: appliedAccent }}>☎ </span>
              {data.phone}
            </div>
          )}
          {data.website && (
            <div className="text-sm tracking-wide">
              <span style={{ color: appliedAccent }}>🌐 </span>
              {data.website}
            </div>
          )}
          {data.address && (
            <div className="text-sm tracking-wide opacity-90">
              <span style={{ color: appliedAccent }}>📍 </span>
              {data.address}
            </div>
          )}
        </div>

        {/* QR Code Section */}
        {showLargeQR && (data.email || data.phone) && (
          <div className="bg-white/90 p-3 rounded-xl shadow-md mt-3 hover:scale-105 transition-transform duration-300">
            <QRCodeSVG value={vCardData} size={90} />
          </div>
        )}

        {/* Subtle footer text */}
        <div className="mt-4 text-xs text-white/60 font-light tracking-widest">
          {data.company ? data.company.toUpperCase() : "YOUR COMPANY"}
        </div>
      </div>
    </div>
  );
};

export default BackSideCard;
