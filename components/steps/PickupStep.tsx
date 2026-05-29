"use client";

interface PickupStepProps {
  pickupMethod: string;
  setPickupMethod: (method: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PickupStep({ pickupMethod, setPickupMethod, deliveryAddress, setDeliveryAddress, onNext, onBack }: PickupStepProps) {
  return (
    <section className="max-w-md mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Step 4: Pickup Options</h3>
        <p className="text-white/60">{"Choose how you'd like to receive your order"}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Pickup Method *</label>
          <select
            value={pickupMethod}
            onChange={(e) => setPickupMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-500 transition-all"
          >
            <option value="" className="bg-gray-800">Select pickup method...</option>
            <option value="pickup" className="bg-gray-800">Store Pickup</option>
            <option value="delivery" className="bg-gray-800">Delivery</option>
          </select>
        </div>

        {pickupMethod === "delivery" && (
          <div>
            <label className="block text-white font-semibold mb-2">Delivery Address *</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-500 transition-all resize-none"
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
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
          {"Next: Payment →"}
        </button>
      </div>
    </section>
  );
}
