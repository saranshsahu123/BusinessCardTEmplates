import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";
import { Mail, Phone, Globe } from "lucide-react";

export const ModernCard = ({
  data,
  fontFamily = "'Poppins', sans-serif",
  fontSize = 16,
  textColor = "#ffffff",
  accentColor = "#2563eb", // blue accent
}) => {
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
      className="relative w-[370px] h-[210px] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between"
      style={{
        background: `linear-gradient(145deg, ${accentColor}, #0f172a)`,
        fontFamily,
        fontSize: `${fontSize}px`,
      }}
    >
      {/* Accent overlay & background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#ffffff_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      {/* Company branding */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-semibold tracking-wide text-white drop-shadow-sm">
            {data.name || "Your Name"}
          </h3>
          <p className="text-sm text-gray-200">{data.title || "Job Title"}</p>
        </div>
        <div className="text-xs font-semibold uppercase text-gray-100 bg-white/10 px-3 py-1 rounded-full">
          {data.company || "Company Name"}
        </div>
      </div>

      {/* Divider */}
      <div className="w-20 h-[2px] my-3 rounded-full" style={{ backgroundColor: textColor }}></div>

      {/* Contact section */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="space-y-1.5 text-xs text-gray-100">
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" style={{ color: accentColor }} />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" style={{ color: accentColor }} />
              <span>{data.phone}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" style={{ color: accentColor }} />
              <span>{data.website}</span>
            </div>
          )}
        </div>

        {/* QR code */}
        {data.name && data.email && (
          <div className="bg-white/90 p-2 rounded-xl shadow-md">
            <QRCodeSVG value={vCardData} size={55} />
          </div>
        )}
      </div>

      {/* Decorative watermark (Company initials) */}
      {data.company && (
        <div className="absolute bottom-3 right-4 text-5xl font-extrabold opacity-10 text-white tracking-tight">
          {data.company.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};
