"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Shoe = {
  colors: { name: string; hex: string }[];
  sizes: number[];
};

type Props = {
  shoe: Shoe;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: number;
  setSelectedSize: (size: number) => void;
};

export default function ShoeDetailsClient({
  shoe,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Color selection */}
      <div>
        <h3 className="text-sm font-medium text-foreground">
          Color:{" "}
          <span className="text-muted-foreground">{selectedColor}</span>
        </h3>
        <RadioGroup
          defaultValue={selectedColor ?? undefined}
          onValueChange={setSelectedColor}
          className="flex items-center gap-2 mt-2"
        >
          {shoe.colors.map((color) => (
            <React.Fragment key={color.name}>
              <RadioGroupItem
                value={color.name}
                id={`color-${color.name}`}
                className="sr-only"
              />
              <Label
                htmlFor={`color-${color.name}`}
                className={cn(
                  "w-8 h-8 rounded-full border-2 cursor-pointer",
                  selectedColor === color.name
                    ? "border-primary"
                    : "border-transparent"
                )}
              >
                <div
                  className="w-full h-full rounded-full border-2 border-background"
                  style={{ backgroundColor: color.hex }}
                />
              </Label>
            </React.Fragment>
          ))}
        </RadioGroup>
      </div>

      {/* Size selection */}
      <div>
        <h3 className="text-sm font-medium text-foreground">Size</h3>
        <RadioGroup
          onValueChange={(val) => setSelectedSize(Number(val))}
          className="flex flex-wrap items-center gap-2 mt-2"
        >
          {shoe.sizes.map((size) => (
            <React.Fragment key={size}>
              <RadioGroupItem
                value={String(size)}
                id={`size-${size}`}
                className="sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className={cn(
                  "h-10 w-14 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer transition-colors",
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-accent"
                )}
              >
                {size}
              </Label>
            </React.Fragment>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
