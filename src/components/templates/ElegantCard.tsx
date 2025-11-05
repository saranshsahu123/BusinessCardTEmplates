import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

interface ElegantCardProps {
  data: BusinessCardData;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

export const ElegantCard = ({
  data,
  fontFamily = "Poppins, sans-serif",
  fontSize,
  textColor = "#ffffff",
  accentColor = "#d4af37", // Gold Accent
}: ElegantCardProps) => {
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
      className="w-full aspect-[1.75/1] relative overflow-hidden shadow-2xl rounded-2xl flex flex-col justify-between p-8 transition-transform duration-300 hover:scale-[1.02]"
      style={{
        fontFamily,
        fontSize: fontSize ? `${fontSize}px` : "16px",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b 50%, #111827 100%)",
        color: textColor,
      }}
    >
      {/* Gradient glow edge */}
      <div
        className="absolute top-0 left-0 w-2 h-full"
        style={{
          background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
        }}
      ></div>

      {/* Decorative background shapes */}
      <div
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div
        className="absolute -top-10 -left-10 w-48 h-48 rotate-45 opacity-10 blur-xl"
        style={{ backgroundColor: accentColor }}
      ></div>

      {/* Info Section */}
      <div className="relative z-10 pl-6">
        <h3
          className="text-3xl font-semibold tracking-tight mb-2"
          style={{ color: textColor }}
        >
          {data.name || "Your Name"}
        </h3>
        <div
          className="h-[2px] w-16 mb-3"
          style={{ backgroundColor: accentColor }}
        ></div>
        <p
          className="text-sm font-medium mb-1 opacity-90"
          style={{ color: accentColor }}
        >
          {data.title || "Job Title"}
        </p>
        <p className="text-xs opacity-70">{data.company || "Company Name"}</p>
      </div>

      {/* Contact + QR Section */}
      <div className="flex justify-between items-end relative z-10 pl-6">
        <div className="space-y-1 text-sm opacity-80 leading-relaxed">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>

        {data.name && data.email && (
          <div className="bg-white p-2 rounded-xl shadow-md">
            <QRCodeSVG value={vCardData} size={60} />
          </div>
        )}
      </div>
    </div>
  );
};
