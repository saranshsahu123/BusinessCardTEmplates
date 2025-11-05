import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

interface BoldCardProps {
  data: BusinessCardData;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

export const BoldCard = ({
  data,
  fontFamily = "Poppins, sans-serif",
  fontSize,
  textColor = "#0f172a",
  accentColor = "#0ea5e9",
}: BoldCardProps) => {
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
      className="w-full aspect-[1.75/1] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10"
      style={{
        background:
          "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily,
        fontSize: fontSize ? `${fontSize}px` : "16px",
      }}
    >
      {/* Top Accent Bar */}
      <div
        className="h-1/3 p-6 flex items-center relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, #3b82f6)`,
        }}
      >
        {/* Soft glow effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.6), transparent 60%)",
          }}
        ></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-extrabold text-white mb-1 tracking-tight">
            {data.name || "Your Name"}
          </h3>
          <p className="text-sm text-white/80 font-light">
            {data.title || "Job Title"}
          </p>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="h-2/3 p-6 flex flex-col justify-between bg-white/70 backdrop-blur-sm">
        <div>
          <p
            className="text-xl font-semibold mb-4 uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            {data.company || "Company Name"}
          </p>
          <div className="space-y-2 text-sm leading-relaxed" style={{ color: textColor }}>
            {data.email && (
              <div className="flex items-center gap-2">
                <span style={{ color: accentColor }}>✉</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <span style={{ color: accentColor }}>☎</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.website && (
              <div className="flex items-center gap-2">
                <span style={{ color: accentColor }}>🌐</span>
                <span className="underline">{data.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* QR Code */}
        {data.name && data.email && (
          <div className="flex justify-end mt-3">
            <div
              className="p-2 rounded-xl shadow-md transition-transform transform hover:scale-105 bg-white border"
              style={{ borderColor: accentColor }}
            >
              <QRCodeSVG value={vCardData} size={60} />
            </div>
          </div>
        )}
      </div>

      {/* Subtle Light Reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.2), transparent 70%)",
        }}
      ></div>
    </div>
  );
};
