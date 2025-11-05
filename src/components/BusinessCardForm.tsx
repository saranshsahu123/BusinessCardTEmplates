import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo?: string;
}

interface BusinessCardFormProps {
  data: BusinessCardData;
  onChange: (data: BusinessCardData) => void;
}

export const BusinessCardForm = ({ data, onChange }: BusinessCardFormProps) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof BusinessCardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      onChange({ ...data, logo: result });
    };
    reader.readAsDataURL(file);
  };

  // 🎨 Generate Card Design using Backend
  const handleGenerateDesign = async () => {
    try {
      setLoading(true);
      const prompt = `${data.name || "Professional"} business card with ${data.company || "Company"} logo and modern theme.`;

      const response = await fetch("http://localhost:8080/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();
      console.log("🎨 Generated Design:", result);
      setGeneratedDesign(result);
    } catch (err) {
      console.error("Error generating design:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Business Card Details
        </h2>

        <div className="space-y-5">
          {[
            { id: "name", label: "Full Name *", placeholder: "John Doe" },
            { id: "title", label: "Job Title *", placeholder: "CEO" },
            { id: "company", label: "Company Name *", placeholder: "Acme Corp" },
            { id: "email", label: "Email *", placeholder: "john@example.com" },
            { id: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
            { id: "website", label: "Website", placeholder: "www.example.com" },
          ].map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                value={data[field.id as keyof BusinessCardData] as string}
                onChange={(e) =>
                  handleChange(field.id as keyof BusinessCardData, e.target.value)
                }
                placeholder={field.placeholder}
                className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          ))}

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Business St, Suite 100, City, State 12345"
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>

          {/* Logo Upload */}
          <div>
            <Label htmlFor="logo">Company Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e.target.files?.[0] || null)}
              className="mt-1"
            />
            {data.logo && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={data.logo}
                  alt="Logo preview"
                  className="h-12 w-12 object-contain rounded-lg border"
                />
                <button
                  type="button"
                  className="text-sm text-red-600 underline"
                  onClick={() => onChange({ ...data, logo: "" })}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => setPreviewVisible(!previewVisible)}
            >
              {previewVisible ? "Hide Preview" : "Show Preview"}
            </button>

            <button
              type="button"
              className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-all"
              onClick={handleGenerateDesign}
              disabled={loading}
            >
              {loading ? "Generating..." : "✨ AI Design"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Live Card Preview */}
      {previewVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="rounded-2xl shadow-2xl text-white p-6 h-full flex flex-col justify-between relative overflow-hidden"
            style={{
              background:
                generatedDesign?.background ||
                "linear-gradient(to right, #2563eb, #9333ea)",
            }}
          >
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">
                  {data.company || "Company Name"}
                </h3>
                {data.logo && (
                  <img
                    src={data.logo}
                    alt="Company Logo"
                    className="h-10 w-10 rounded-full bg-white p-1"
                  />
                )}
              </div>

              <p className="text-xl font-semibold">{data.name || "Your Name"}</p>
              <p className="text-sm opacity-90">{data.title || "Your Title"}</p>

              <div className="mt-4 space-y-1 text-sm">
                {data.email && <p>📧 {data.email}</p>}
                {data.phone && <p>📞 {data.phone}</p>}
                {data.website && <p>🌐 {data.website}</p>}
                {data.address && <p>🏢 {data.address}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
