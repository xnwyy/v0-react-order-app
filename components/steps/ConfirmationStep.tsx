"use client";

interface ConfirmationStepProps {
  onNewOrder: () => void;
}

export function ConfirmationStep({ onNewOrder }: ConfirmationStepProps) {
  return (
    <section className="max-w-md mx-auto text-center animate-fadeIn">
      <div className="text-6xl mb-6">🎉</div>
      <h3 className="text-3xl font-bold text-green-400 mb-4">Order Submitted Successfully!</h3>
      <p className="text-white/70 mb-8">
        Thank you for your order. You will receive a confirmation shortly.
      </p>

      <button
        onClick={onNewOrder}
        className="py-3 px-8 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
      >
        Place New Order
      </button>
    </section>
  );
}
