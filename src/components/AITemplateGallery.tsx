import { useState, useEffect, useRef } from "react";
import { BusinessCardData } from "./BusinessCardForm";
import { DynamicCard } from "./templates/DynamicCard";
import { Button } from "./ui/button";
import { Loader2, Sparkles, Check, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDesigns } from "@/services/designService";

// --- UPDATED IMPORTS ---
import { downloadAsImage, getContrastingTextColor } from "@/lib/utils";

// --- UPDATED TEMPLATE CARD ---
// This component now renders a 3D flipper card

interface TemplateCardProps {
  design: any; // This will now have 'front' and 'back' properties
  index: number;
  selectedDesignId?: string;
  onSelectTemplate: (designConfig: any) => void;
  data: BusinessCardData;
}

const TemplateCard = ({
  design,
  index,
  selectedDesignId,
  onSelectTemplate,
  data,
}: TemplateCardProps): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Updated download handler for front/back
  const handleDownload = (e: React.MouseEvent, side: "front" | "back") => {
    e.stopPropagation();
    const node = cardRef.current?.querySelector(`.card-${side}`);
    if (node) {
      downloadAsImage(
        node as HTMLElement,
        `business-card-${design.id}-${side}.png`
      );
    }
  };

  // Check if design has the new front/back structure
  if (!design.front || !design.back) {
    console.warn("Invalid design format received from AI", design);
    return (
      <div className="aspect-[1.75/1] bg-muted rounded-lg p-2 text-xs text-destructive-foreground">
        Invalid AI design format
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-pointer aspect-[1.75/1] [perspective:1000px]"
      onClick={() => onSelectTemplate(design)}
    >
      {/* --- Card Flipper Container --- */}
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* --- Card Front --- */}
        <div className="absolute w-full h-full [backface-visibility:hidden] card-front">
          <DynamicCard data={data} designConfig={design.front} />
        </div>

        {/* --- Card Back --- */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] card-back">
          <DynamicCard data={data} designConfig={design.back} />
        </div>
      </div>

      {/* --- Selection & Download UI --- */}
      {selectedDesignId === design.id && (
        <>
          <div className="absolute top-2 left-2 z-20">
            <Check className="w-5 h-5 text-green-500 bg-white rounded-full p-1 shadow-lg" />
          </div>
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
            <Button
              size="sm"
              onClick={(e) => handleDownload(e, "front")}
              variant="secondary"
              title="Download Front"
            >
              <Download className="w-4 h-4" />
            </Button>
            {/* Show back download on hover */}
            <Button
              size="sm"
              onClick={(e) => handleDownload(e, "back")}
              variant="secondary"
              title="Download Back"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

// --- UPDATED GALLERY COMPONENT ---

interface AITemplateGalleryProps {
  data: BusinessCardData;
  onSelectTemplate: (designConfig: any) => void;
  selectedDesignId?: string;
}

/**
 * Helper to process and apply guardrails to a single card side config
 */
const processCardSide = (sideConfig: any, defaultAccent: string) => {
  const primaryBg = sideConfig.bgColors?.[0] || "#ffffff";
  const readableText = getContrastingTextColor(primaryBg);

  return {
    bgStyle: sideConfig.bgStyle || "solid",
    bgColors: Array.isArray(sideConfig.bgColors)
      ? sideConfig.bgColors
      : ["#ffffff", "#f0f0f0"],
    textColor: readableText, // <-- FIX: Force readable text
    accentColor: sideConfig.accentColor || defaultAccent,
    layout: sideConfig.layout || "logo-centric-front",
    decoration: sideConfig.decoration || "none",
    fontWeight: sideConfig.fontWeight || "normal",
    fontFamily: sideConfig.fontFamily || "Arial",
    borderStyle: sideConfig.borderStyle || "none",
  };
};

export const AITemplateGallery = ({
  data,
  onSelectTemplate,
  selectedDesignId,
}: AITemplateGalleryProps) => {
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const requestDesigns = async (count: number = 100) => {
    setIsLoading(true);
    try {
      const designs = await generateDesigns(count, data);

      if (!Array.isArray(designs)) {
        throw new Error("Invalid response format from AI service");
      }

      // --- UPDATED PROCESSING LOGIC ---
      // This now processes the new front/back structure

      const processedDesigns = designs.map((design: any, index: number) => {
        const defaultAccent = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        return {
          id: design.id || `design-${index}`,
          name: design.name || `Design ${index + 1}`,
          // Process front and back sides independently
          front: processCardSide(
            design.front || {},
            design.back?.accentColor || defaultAccent
          ),
          back: processCardSide(
            design.back || {},
            design.front?.accentColor || defaultAccent
          ),
        };
      });
      // --- END OF UPDATED LOGIC ---

      setDesigns(processedDesigns);

      toast({
        title: "Success!",
        description: `Generated ${processedDesigns.length} unique designs`,
      });
    } catch (error: any) {
      console.error("Error generating designs:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate designs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestDesigns(100);
  }, []); // Note: 'data' is not in dependency array, generation is manual

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI-Generated Templates
        </h2>
        <Button
          onClick={() => requestDesigns(100)}
          disabled={isLoading}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Regenerate
            </>
          )}
        </Button>
      </div>

      {isLoading && designs.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-[1.75/1] bg-muted rounded-lg animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, index) => (
            <TemplateCard
              key={design.id}
              design={design}
              index={index}
              selectedDesignId={selectedDesignId}
              onSelectTemplate={onSelectTemplate}
              data={data}
            />
          ))}
        </div>
      )}
    </div>
  );
};