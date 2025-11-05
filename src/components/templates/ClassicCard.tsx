//
// 💡 FILE 2: components/templates/ClassicCard.tsx
// (This is the new "premium" renderer for the Classic tab)
//

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { ClassicSideConfig } from "@/lib/classicTemplates";
import { BusinessCardData } from "../BusinessCardForm";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { getContrastingTextColor } from "@/lib/utils";
import clsx from "clsx"; // You may need to install this: npm install clsx

interface ClassicCardProps {
  data: BusinessCardData;
  config: ClassicSideConfig;
  // Overrides from the 'Customize' panel
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

// --- Helper Functions ---
const getBackgroundStyle = (config: ClassicSideConfig, overrideColor?: string): React.CSSProperties => {
  const [colorA, colorB] = config.bgColors;
  const style: React.CSSProperties = config.bgStyle === "gradient"
    ? { background: `linear-gradient(135deg, ${colorA}, ${colorB || colorA})` }
    : { backgroundColor: overrideColor || colorA };

  return style;
};

const getFontStyle = (config: ClassicSideConfig, overrideFont?: string, overrideText?: string): React.CSSProperties => {
  return {
    fontFamily: overrideFont || config.fontFamily,
    color: overrideText || config.textColor,
  };
};

export const ClassicCard: React.FC<ClassicCardProps> = ({
  data,
  config,
  fontFamily,
  fontSize,
  textColor,
  accentColor,
}) => {
  // Apply overrides if they exist
  const appliedText = textColor ?? config.textColor;
  const appliedAccent = accentColor ?? config.accentColor;
  const appliedFont = fontFamily ?? config.fontFamily;
  const readableAccentText = getContrastingTextColor(appliedAccent); // Text for on-accent backgrounds

  const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.title}\nORG:${data.company}\nEMAIL:${data.email}\nTEL:${data.phone}\nURL:${data.website}\nADR:${data.address}\nEND:VCARD`;

  const cardStyle: React.CSSProperties = {
    ...getBackgroundStyle(config, textColor ? appliedText : undefined),
    ...getFontStyle(config, fontFamily, textColor),
    fontSize: fontSize ? `${fontSize}px` : (config.orientation === 'vertical' ? '10px' : '14px'),
    lineHeight: config.orientation === 'vertical' ? '1.4' : '1.5',
  };

  const iconStyle = { color: appliedAccent };
  const initials = (data.company || "LG").slice(0, 2).toUpperCase();

  // --- Layout Renderer ---
  const renderLayout = () => {
    switch (config.layout) {
      // --- FRONT: Logo Centric (Horizontal) ---
      case "front-logo-centric":
        return (
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center border" style={{ borderColor: appliedAccent }}>
                <span className="text-2xl font-bold" style={{ color: appliedAccent }}>{initials}</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold mt-4" style={{ fontFamily: appliedFont }}>{data.company || "Company Name"}</h2>
          </div>
        );

      // --- FRONT: Logo Left (Horizontal) ---
      case "front-logo-left":
         return (
          <div className="relative z-10 flex items-center justify-start h-full p-8 space-x-4">
             {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div
                className="w-16 h-16 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: appliedAccent,
                  color: readableAccentText,
                }}
              >
                <span className="text-2xl font-bold">{initials}</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold" style={{ fontFamily: appliedFont }}>
              {data.company || "Company Name"}
            </h2>
          </div>
        );
      
      // --- FRONT: Minimal Vertical ---
      case "front-minimal-vertical":
        return (
          <div className="relative z-10 flex flex-col items-start justify-between h-full p-6">
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ borderColor: appliedAccent }}>
                <span className="text-lg font-bold" style={{ color: appliedAccent }}>{initials}</span>
              </div>
            )}
            <h2 className="text-lg font-bold uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px', color: appliedAccent }}>
              {data.company || "Company"}
            </h2>
          </div>
        );
      
      // --- FRONT: Pattern Band ---
      case "front-pattern-band":
         return (
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 overflow-hidden">
            <div className="absolute left-0 right-0 h-1/3 bottom-0" style={{ backgroundColor: appliedAccent, opacity: 0.5 }} />
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{initials}</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold mt-4" style={{ fontFamily: appliedFont }}>{data.company || "Company Name"}</h2>
            <p className="text-sm opacity-80">{data.title || "Company Slogan"}</p>
          </div>
        );

      // --- BACK: Elegant Curves ---
      case "back-elegant-curves":
        return (
          <div className="relative z-10 h-full p-6 flex flex-col justify-between overflow-hidden">
            <svg className="absolute top-0 left-0 w-2/3 h-2/5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,0 L 100,0 Q 50,50 100,100 L 0,100 Z" fill={appliedAccent} />
            </svg>
            <svg className="absolute bottom-0 right-0 w-2/3 h-2/5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 100,100 L 0,100 Q 50,50 0,0 L 100,0 Z" fill={appliedAccent} />
            </svg>
            <div className="relative z-10 text-right">
              <h3 className="text-xl font-bold">{data.name || "Michel Clark"}</h3>
              <p className="text-sm opacity-90" style={{ color: appliedText, opacity: 0.7 }}>{data.title || "General Manager"}</p>
            </div>
            <div className="relative z-10 text-right">
              <div className="text-xs space-y-1.5 opacity-90">
                {data.phone && <div className="flex items-center justify-end gap-1"><Phone style={{ color: appliedText, opacity: 0.7 }} className="w-3 h-3" /> {data.phone || "+00 1234 5678"}</div>}
                {data.email && <div className="flex items-center justify-end gap-1"><Mail style={{ color: appliedText, opacity: 0.7 }} className="w-3 h-3" /> {data.email || "yourmail@mail.com"}</div>}
              </div>
            </div>
          </div>
        );
        
      // --- BACK: Sidebar Right ---
      case "back-info-sidebar-right":
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold">{data.name || "Your Name"}</h3>
              <p className="text-sm" style={{ color: appliedAccent }}>{data.title || "Your Position"}</p>
              <hr className="my-4" />
              <div className="text-xs space-y-1.5 opacity-90">
                {data.email && <div className="flex items-center gap-2"><Mail style={iconStyle} className="w-3 h-3" /><span>{data.email}</span></div>}
                {data.phone && <div className="flex items-center gap-2"><Phone style={iconStyle} className="w-3 h-3" /><span>{data.phone}</span></div>}
                {data.website && <div className="flex items-center gap-2"><Globe style={iconStyle} className="w-3 h-3" /><span>{data.website}</span></div>}
              </div>
            </div>
            <div className="w-1/3 p-4 flex flex-col items-center justify-center" style={{ backgroundColor: appliedAccent }}>
              {data.name && data.email && (
                <div className="bg-white p-1 rounded-lg shadow-md">
                  <QRCodeSVG value={vCardData} size={config.orientation === 'vertical' ? 40 : 70} width="100%" />
                </div>
              )}
            </div>
          </div>
        );

      // --- BACK: Sidebar Left ---
      case "back-info-sidebar-left":
         return (
          <div className="flex h-full">
            <div className="w-1/3 p-4 flex flex-col items-center justify-between" style={{ backgroundColor: appliedAccent, color: readableAccentText }}>
              {data.name && data.email && (
                <div className="bg-white p-1 rounded-lg shadow-md">
                  <QRCodeSVG value={vCardData} size={config.orientation === 'vertical' ? 40 : 60} width="100%" />
                </div>
              )}
              <div className="text-xs opacity-80">
                {data.company || "Company"}
              </div>
            </div>
            <div className="w-2/3 p-5 flex flex-col justify-center">
              <h3 className="text-lg font-bold">{data.name || "Jhon Doech"}</h3>
              <p className="text-xs" style={{ color: appliedAccent }}>{data.title || "Founder"}</p>
              <hr className="my-3" />
              <div className="text-xs space-y-1 opacity-90">
                {data.phone && <div className="truncate">{data.phone}</div>}
                {data.email && <div className="truncate">{data.email}</div>}
                {data.address && <div className="truncate">{data.address}</div>}
              </div>
            </div>
          </div>
        );

      // --- BACK: Standard (Default) ---
      case "back-info-standard":
      default:
        return (
          <div className="relative z-10 h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold">{data.name || "Your Name"}</h3>
              <p className="text-sm opacity-90" style={{ color: appliedAccent }}>{data.title || "Job Title"}</p>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-xs space-y-1.5 opacity-90">
                {data.phone && <div className="flex items-center gap-2"><Phone style={iconStyle} className="w-3 h-3" /><span>{data.phone}</span></div>}
                {data.email && <div className="flex items-center gap-2"><Mail style={iconStyle} className="w-3 h-3" /><span>{data.email}</span></div>}
                {data.website && <div className="flex items-center gap-2"><Globe style={iconStyle} className="w-3 h-3" /><span>{data.website}</span></div>}
              </div>
              {data.name && data.email && (
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <QRCodeSVG value={vCardData} size={config.orientation === 'vertical' ? 40 : 60} />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      // --- This renders the card as Horizontal or Vertical in the PREVIEW box ---
      className={clsx(
        "w-full relative overflow-hidden rounded-lg shadow-xl transition-all",
        {
          "aspect-[1.75/1]": config.orientation === "horizontal",
          "aspect-[1/1.75]": config.orientation === "vertical",
        }
      )}
      style={cardStyle}
    >
      {/* Optional pattern from config */}
      {config.pattern === 'damask' && (
        <div 
          className="absolute inset-0 z-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '15px 15px',
            color: appliedAccent
          }} 
        />
      )}
      {renderLayout()}
    </div>
  );
};

export default ClassicCard;