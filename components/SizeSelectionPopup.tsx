"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

interface SizeSelectionPopupProps {
  item: {
    name: string;
    sizes?: { size: string; price: number; calories: number }[];
  };
  category: string;
  onConfirm: (selections: { size: string; price: number; calories: number; quantity: number }[]) => void;
  onClose: () => void;
}

export function SizeSelectionPopup({ item, onConfirm, onClose }: SizeSelectionPopupProps) {
  const [selections, setSelections] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    item.sizes?.forEach((s) => {
      initial[s.size] = 0;
    });
    return initial;
  });

  const updateQuantity = (size: string, change: number) => {
    setSelections((prev) => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + change),
    }));
  };

  const handleConfirm = () => {
    const result = item.sizes
      ?.filter((s) => selections[s.size] > 0)
      .map((s) => ({
        size: s.size,
        price: s.price,
        calories: s.calories,
        quantity: selections[s.size],
      }));
    onConfirm(result || []);
  };

  const hasSelections = Object.values(selections).some((q) => q > 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 rounded-2xl p-6 w-full max-w-md border border-white/20 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{item.name}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-white/60 mb-4">Select size and quantity:</p>

        <div className="space-y-3">
          {item.sizes?.map((size) => (
            <div
              key={size.size}
              className="flex justify-between items-center bg-white/5 rounded-xl p-4"
            >
              <div>
                <div className="text-white font-medium">{size.size}</div>
                <div className="text-sm text-white/60">
                  ${size.price.toFixed(2)} • {size.calories} cal
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(size.size, -1)}
                  className="w-8 h-8 rounded-full border border-pink-400 text-pink-400 flex items-center justify-center hover:bg-pink-400 hover:text-black transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-white font-bold">
                  {selections[size.size] || 0}
                </span>
                <button
                  onClick={() => updateQuantity(size.size, 1)}
                  className="w-8 h-8 rounded-full bg-pink-500 text-black flex items-center justify-center hover:bg-pink-400 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasSelections}
            className="flex-1 py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
