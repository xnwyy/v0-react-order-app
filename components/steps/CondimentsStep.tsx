"use client";

import { Plus, Minus } from "lucide-react";
import { condimentsData } from "@/data/menuData";
import { Condiment } from "@/types";

interface CondimentsStepProps {
  condiments: Record<string, Condiment>;
  setCondiments: (condiments: Record<string, Condiment>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CondimentsStep({ condiments, setCondiments, onNext, onBack }: CondimentsStepProps) {
  const updateCondiment = (id: string, change: number) => {
    const data = condimentsData.find(c => c.id === id);
    if (!data) return;

    setCondiments({
      ...condiments,
      [id]: {
        name: data.name,
        quantity: Math.max(0, Math.min(10, (condiments[id]?.quantity || 0) + change)),
        calories: data.calories
      }
    });
  };

  const selectedCount = Object.values(condiments).reduce((sum, c) => sum + c.quantity, 0);

  return (
    <section className="max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Step 3: Condiments</h3>
        <p className="text-white/60">Add sauces and extras to your order (optional)</p>
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/20 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-white">Sauces & Extras</h4>
          <span className="text-pink-400 text-sm">{selectedCount} items selected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {condimentsData.map((item) => {
            const quantity = condiments[item.id]?.quantity || 0;
            
            return (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/5 rounded-xl p-3"
              >
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  <div className="text-sm text-white/50">{item.calories} cal each</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCondiment(item.id, -1)}
                    disabled={quantity === 0}
                    className="w-8 h-8 rounded-full border border-pink-400 text-pink-400 flex items-center justify-center hover:bg-pink-400 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => updateCondiment(item.id, 1)}
                    disabled={quantity >= 10}
                    className="w-8 h-8 rounded-full bg-pink-500 text-black flex items-center justify-center hover:bg-pink-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="py-3 px-6 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
        >
          {"← Back"}
        </button>
        <button
          onClick={onNext}
          className="py-3 px-8 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          {"Next: Pickup →"}
        </button>
      </div>
    </section>
  );
}
