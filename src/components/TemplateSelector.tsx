//
// 💡 FILE 3: components/TemplateSelector.tsx
// (This fixes the crash and uses the correct ClassicCard component)
//

import { useState, useRef, useEffect } from "react"; // <-- Import useEffect
import { BusinessCardData } from "./BusinessCardForm";
import { ClassicCard } from "./templates/ClassicCard"; // <-- Using the correct ClassicCard
import { Check, Download } from "lucide-react";
import { downloadAsImage } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  generateClassicTemplates,
  ClassicTemplate,
  ClassicSideConfig, // <-- Import this type
} from "@/lib/classicTemplates";
import clsx from "clsx"; 

// --- Generate 50+ templates ---
const templates = generateClassicTemplates(50);

interface TemplateSelectorProps {
  data: BusinessCardData;
  selectedFont?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

export const TemplateSelector = ({
  data,
  selectedFont,
  fontSize,
  textColor,
  accentColor,
}: TemplateSelectorProps) => {
  // --- FIX: Initialize state with null, then set it to prevent crash ---
  const [selectedTemplate, setSelectedTemplate] = useState<ClassicTemplate | null>(null);
  
  useEffect(() => {
    // Set the initial template only after the component mounts
    if (templates.length > 0) {
      setSelectedTemplate(templates[0]);
    }
  }, []); // Empty dependency array ensures this runs only once

  const previewRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const hasOverrides =
    selectedFont || fontSize || textColor || accentColor;

  // Create a new config object with user overrides applied
  const getOverriddenConfig = (config?: ClassicSideConfig): ClassicSideConfig | undefined => {
    if (!config) return undefined; // Guard against undefined config
    return {
      ...config,
      ...(selectedFont && { fontFamily: selectedFont }), // <-- Fixed 'fontFamily' is not defined error
      ...(fontSize && { fontSize: fontSize }),
      ...(textColor && { textColor: textColor }),
      ...(accentColor && { accentColor: accentColor }),
    };
  };

  // --- FIX: Add a loading state if selectedTemplate is not ready ---
  if (!selectedTemplate) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* --- Selected Design Preview (Front & Back) --- */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            Selected Design Preview
          </h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                previewRef.current &&
                downloadAsImage(previewRef.current, `${selectedTemplate.id}-front`)
              }
              variant="outline" size="sm" className="gap-2"
            >
              <Download className="w-4 h-4" /> Download Front
            </Button>
            <Button
              onClick={() =>
                backRef.current &&
                downloadAsImage(backRef.current, `${selectedTemplate.id}-back`)
              }
              variant="outline" size="sm" className="gap-2"
            >
              <Download className="w-4 h-4" /> Download Back
            </Button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-muted to-background p-8 rounded-lg">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            
            {/* --- Preview wrapper now controls aspect ratio --- */}
            <div 
              ref={previewRef}
              className={clsx(
                "rounded-xl overflow-hidden shadow-lg",
                selectedTemplate.front.orientation === 'horizontal' 
                  ? "aspect-[1.75/1]" 
                  : "aspect-[1/1.75]"
              )}
            >
              <ClassicCard
                data={data}
                config={getOverriddenConfig(selectedTemplate.front)!}
              />
            </div>
            
            {/* --- Preview wrapper now controls aspect ratio --- */}
            <div 
              ref={backRef}
              className={clsx(
                "rounded-xl overflow-hidden shadow-lg",
                selectedTemplate.back.orientation === 'horizontal' 
                  ? "aspect-[1.75/1]" 
                  : "aspect-[1/1.75]"
              )}
            >
              <ClassicCard
                data={data}
                config={getOverriddenConfig(selectedTemplate.back)!}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Choose Template Grid (NOW WITH FLIPPERS) --- */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Choose Template ({templates.length} Options)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {templates.map((template) => {
            const isSelected = selectedTemplate.id === template.id;
            return (
              <div
                key={template.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                {/* --- This wrapper is a square to fix the "messy" grid --- */}
                <div
                  className={clsx(
                    "relative w-full aspect-square rounded-xl overflow-hidden [perspective:1000px] border-2 transition-all",
                    isSelected
                      ? "border-primary shadow-lg"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                  >
                    {/* --- Card Front --- */}
                    <div className="absolute w-full h-full [backface-visibility:hidden]">
                      <ClassicCard
                        data={data}
                        config={getOverriddenConfig(template.front)!}
                      />
                    </div>
                    {/* --- Card Back --- */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <ClassicCard
                        data={data}
                        config={getOverriddenConfig(template.back)!}
                      />
                    </div>
                  </div>
                </div>
                
                {/* --- Selected Checkmark --- */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                
                {/* --- Template Name --- */}
                <p className="text-sm text-center font-medium text-muted-foreground mt-2 truncate" title={template.name}>
                  {template.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};