"use client";

interface OrderNameStepProps {
  orderName: string;
  setOrderName: (name: string) => void;
  onNext: () => void;
}

export function OrderNameStep({ orderName, setOrderName, onNext }: OrderNameStepProps) {
  return (
    <section className="max-w-md mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Step 1: Enter Order Name</h3>
        <p className="text-white/60">Give your order a memorable name</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Order Name *</label>
          <input
            type="text"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            placeholder="Enter order name..."
            maxLength={50}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onNext}
            className="py-3 px-8 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            {"Next: Order Items →"}
          </button>
        </div>
      </div>
    </section>
  );
}
