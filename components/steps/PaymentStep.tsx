"use client";

import { useState } from "react";

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  cardDetails: { number: string; expiry: string; cvv: string; name: string };
  setCardDetails: (details: { number: string; expiry: string; cvv: string; name: string }) => void;
  mobilePayType: string;
  setMobilePayType: (type: string) => void;
  tipAmount: number;
  setTipAmount: (amount: number) => void;
  orphanageDonation: number;
  setOrphanageDonation: (amount: number) => void;
  healthcareDonation: number;
  setHealthcareDonation: (amount: number) => void;
  orderTotal: number;
}

export function PaymentStep({
  onNext,
  onBack,
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
  mobilePayType,
  setMobilePayType,
  tipAmount,
  setTipAmount,
  orphanageDonation,
  setOrphanageDonation,
  healthcareDonation,
  setHealthcareDonation,
  orderTotal
}: PaymentStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!cardDetails.number) newErrors.number = "Card number is required";
      if (!cardDetails.expiry) newErrors.expiry = "Expiry date is required";
      if (!cardDetails.cvv) newErrors.cvv = "CVV is required";
      if (!cardDetails.name) newErrors.name = "Cardholder name is required";
    }

    if (paymentMethod === "mobile" && !mobilePayType) {
      newErrors.mobilePayType = "Please select a mobile payment type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleCardChange = (field: string, value: string) => {
    setCardDetails({ ...cardDetails, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const totalWithExtras = orderTotal + tipAmount + orphanageDonation + healthcareDonation;

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Step 5: Payment Information</h3>
        <p className="text-white/60">Enter your payment details</p>
      </div>

      {/* Payment Container */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 space-y-6">
        {/* Payment Method Dropdown */}
        <div>
          <label className="block text-white font-semibold mb-2">Payment Method *</label>
          <select
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              if (errors.paymentMethod) {
                setErrors({ ...errors, paymentMethod: "" });
              }
            }}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-400"
          >
            <option value="" className="bg-gray-800">Select payment method...</option>
            <option value="credit" className="bg-gray-800">Credit Card</option>
            <option value="debit" className="bg-gray-800">Debit Card</option>
            <option value="cash" className="bg-gray-800">Cash</option>
            <option value="mobile" className="bg-gray-800">Mobile Payment</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-400 text-sm mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        {/* Card Details */}
        {(paymentMethod === "credit" || paymentMethod === "debit") && (
          <div className="space-y-4 bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold">Card Details</h4>
            
            <div>
              <label className="block text-white/80 text-sm mb-1">Card Number *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => handleCardChange("number", e.target.value)}
                maxLength={19}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
              />
              {errors.number && <p className="text-red-400 text-sm mt-1">{errors.number}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-1">Expiry Date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardChange("expiry", e.target.value)}
                  maxLength={5}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
                />
                {errors.expiry && <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1">CVV *</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardChange("cvv", e.target.value)}
                  maxLength={3}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
                />
                {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1">Cardholder Name *</label>
              <input
                type="text"
                placeholder="Enter cardholder name..."
                value={cardDetails.name}
                onChange={(e) => handleCardChange("name", e.target.value)}
                maxLength={50}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          </div>
        )}

        {/* Mobile Payment */}
        {paymentMethod === "mobile" && (
          <div className="space-y-4 bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold">Select Mobile Payment</h4>
            <select
              value={mobilePayType}
              onChange={(e) => {
                setMobilePayType(e.target.value);
                if (errors.mobilePayType) {
                  setErrors({ ...errors, mobilePayType: "" });
                }
              }}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-400"
            >
              <option value="" className="bg-gray-800">Choose mobile payment...</option>
              <option value="apple-cash" className="bg-gray-800">Apple Cash</option>
              <option value="cashapp" className="bg-gray-800">CashApp</option>
              <option value="venmo" className="bg-gray-800">Venmo</option>
              <option value="zelle" className="bg-gray-800">Zelle</option>
              <option value="paypal" className="bg-gray-800">PayPal</option>
            </select>
            {errors.mobilePayType && (
              <p className="text-red-400 text-sm mt-1">{errors.mobilePayType}</p>
            )}
          </div>
        )}

        {/* Tip Section */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Tip (Optional)</h4>
          <div className="flex items-center gap-2">
            <span className="text-white/60">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={tipAmount || ""}
              onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>

        {/* Orphanage Donation */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Orphanage Donation (Optional)</h4>
          <div className="flex items-center gap-2">
            <span className="text-white/60">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={orphanageDonation || ""}
              onChange={(e) => setOrphanageDonation(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>

        {/* Healthcare Donation */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Healthcare Donation (Optional)</h4>
          <div className="flex items-center gap-2">
            <span className="text-white/60">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={healthcareDonation || ""}
              onChange={(e) => setHealthcareDonation(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-400/30">
          <div className="space-y-2 text-white">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            {tipAmount > 0 && (
              <div className="flex justify-between">
                <span>Tip:</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
            )}
            {orphanageDonation > 0 && (
              <div className="flex justify-between">
                <span>Orphanage Donation:</span>
                <span>${orphanageDonation.toFixed(2)}</span>
              </div>
            )}
            {healthcareDonation > 0 && (
              <div className="flex justify-between">
                <span>Healthcare Donation:</span>
                <span>${healthcareDonation.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${(orderTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
              <span>Total:</span>
              <span>${(totalWithExtras + orderTotal * 0.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all duration-300 hover:scale-105"
        >
          {"← Back"}
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105"
        >
          {"Review Order →"}
        </button>
      </div>
    </div>
  );
}
