import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

export const ElegantCard = ({
  data,
  fontFamily = "'Poppins', sans-serif",
  fontSize = 16,
  textColor = "#ffffff",
  accentColor = "#0ea5e9",
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
      className="relative w-[370px] h-[210px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${accentColor}, #111827)`,
        fontFamily,
        fontSize: `${fontSize}px`,
        color: textColor,
      }}
    >
      {/* Background accent shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold tracking-wide">{data.name || "Your Name"}</h3>
        <p className="text-sm opacity-80">{data.title || "Job Title"}</p>
        <p className="text-xs opacity-60 mt-1">{data.company || "Company Name"}</p>
      </div>

      {/* Divider line */}
      <div
        className="w-20 h-[2px] mt-3 mb-2 rounded-full"
        style={{ backgroundColor: textColor }}
      ></div>

      {/* Footer section */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="text-xs space-y-1 opacity-90">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>

        {data.name && data.email && (
          <div className="bg-white/90 p-2 rounded-xl shadow-md">
            <QRCodeSVG value={vCardData} size={55} />
          </div>
        )}
      </div>

      {/* Company logo watermark */}
      {data.company && (
        <div className="absolute bottom-2 right-3 text-4xl font-extrabold opacity-10">
          {data.company.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};
