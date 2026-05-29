"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CustomizationPopupProps {
  itemName: string;
  category: string;
  onConfirm: (customizations: Record<string, string>, specialNotes: string) => void;
  onClose: () => void;
}

const burgerCustomizations = [
  { id: "lettuce", name: "Lettuce", options: ["none", "regular", "extra"] },
  { id: "tomato", name: "Tomato", options: ["none", "regular", "extra"] },
  { id: "onion", name: "Onion", options: ["none", "regular", "extra"] },
  { id: "pickle", name: "Pickle", options: ["none", "regular", "extra"] },
  { id: "cheese", name: "Cheese", options: ["none", "regular", "extra"] },
  { id: "sauce", name: "Special Sauce", options: ["none", "regular", "extra"] },
];

const happyMealCustomizations = [
  { id: "side", name: "Side", options: ["Small Fries", "Apple Slices"] },
  { id: "drink", name: "Drink", options: ["Small Drink", "Milk", "Juice"] },
];

export function CustomizationPopup({ itemName, category, onConfirm, onClose }: CustomizationPopupProps) {
  const isHappyMeal = category === "Happy Meals" || category === "happymeals";
  const customizationOptions = isHappyMeal ? happyMealCustomizations : burgerCustomizations;

  const [customizations, setCustomizations] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    customizationOptions.forEach((c) => {
      initial[c.id] = c.options[isHappyMeal ? 0 : 1];
    });
    return initial;
  });
  const [specialNotes, setSpecialNotes] = useState("");

  const handleChange = (id: string, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(customizations, specialNotes);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20 animate-fadeIn max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Customize {itemName}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {customizationOptions.map((option) => (
            <div key={option.id}>
              <label className="block text-white/80 text-sm mb-2">{option.name}</label>
              <select
                value={customizations[option.id]}
                onChange={(e) => handleChange(option.id, e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-400"
              >
                {option.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-gray-800">
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-white/80 text-sm mb-2">Special Notes</label>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Any special requests..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400 resize-none"
              rows={3}
            />
          </div>
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
            className="flex-1 py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition-colors font-bold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
