"use client";

import { Clock, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import { OrderItem, Condiment } from "@/types";

interface ReviewStepProps {
  orderName: string;
  orderItems: Record<string, OrderItem>;
  condiments: Record<string, Condiment>;
  pickupMethod: string;
  deliveryAddress: string;
  paymentMethod: string;
  tipAmount: number;
  orphanageDonation: number;
  healthcareDonation: number;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewStep({
  orderName,
  orderItems,
  condiments,
  pickupMethod,
  deliveryAddress,
  paymentMethod,
  tipAmount,
  orphanageDonation,
  healthcareDonation,
  onNext,
  onBack
}: ReviewStepProps) {
  const calculateEstimatedTime = (): string => {
    const totalItems = Object.values(orderItems).reduce((sum, item) => sum + item.quantity, 0);
    let baseTime: number;
    
    switch (pickupMethod) {
      case 'delivery':
        baseTime = 25;
        break;
      case 'dine-in':
        baseTime = 8;
        break;
      default: // pickup
        baseTime = 12;
    }
    
    const estimatedMinutes = Math.min(baseTime + (totalItems * 2), 60);
    
    if (estimatedMinutes >= 60) {
      const hours = Math.floor(estimatedMinutes / 60);
      const minutes = estimatedMinutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`;
    }
    return `${estimatedMinutes} minutes`;
  };

  const getTimeLabel = (): string => {
    switch (pickupMethod) {
      case 'delivery':
        return 'Estimated Delivery Time';
      case 'dine-in':
        return 'Estimated Wait Time';
      default:
        return 'Estimated Pickup Time';
    }
  };

  const groupedItems: { name: string; size?: string; quantity: number; price: number; customizations?: Record<string, string> }[] = [];
  
  Object.values(orderItems).forEach(item => {
    if (item.quantity > 0) {
      groupedItems.push({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        customizations: item.customizations
      });
    }
  });

  const subtotal = Object.values(orderItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + tipAmount + orphanageDonation + healthcareDonation;

  const selectedCondiments = Object.values(condiments).filter(c => c.quantity > 0);

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Step 6: Review Your Order</h3>
        <p className="text-white/60">Please review before submitting</p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20 mb-6">
        {/* Order Name */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <ShoppingBag className="text-pink-400" size={24} />
          <div>
            <div className="text-sm text-white/60">Order Name</div>
            <div className="text-lg font-bold text-white">{orderName}</div>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <Clock className="text-green-400" size={24} />
          <div>
            <div className="text-sm text-white/60">{getTimeLabel()}</div>
            <div className="text-lg font-bold text-white">{calculateEstimatedTime()}</div>
          </div>
        </div>

        {/* Pickup/Delivery */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <MapPin className="text-blue-400" size={24} />
          <div>
            <div className="text-sm text-white/60">
              {pickupMethod === 'delivery' ? 'Delivery Address' : 
               pickupMethod === 'dine-in' ? 'Order Type' : 'Pickup Method'}
            </div>
            <div className="text-lg font-bold text-white">
              {pickupMethod === 'delivery' ? deliveryAddress : 
               pickupMethod === 'dine-in' ? 'Dine-In' : 'Store Pickup'}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="text-yellow-400" size={24} />
          <div>
            <div className="text-sm text-white/60">Payment Method</div>
            <div className="text-lg font-bold text-white capitalize">
              {paymentMethod === 'credit' ? 'Credit Card' : 
               paymentMethod === 'debit' ? 'Debit Card' : 
               paymentMethod === 'mobile' ? 'Mobile Payment' : 'Cash'}
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20 mb-6">
        <h4 className="text-lg font-bold text-white mb-4">Items Ordered</h4>
        
        <div className="space-y-3">
          {groupedItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b border-white/10 last:border-0">
              <div className="flex-1">
                <div className="text-white font-medium">
                  {item.quantity}x {item.name}
                  {item.size && <span className="text-pink-400 ml-2">({item.size})</span>}
                </div>
                {item.customizations && Object.keys(item.customizations).length > 0 && (
                  <div className="text-sm text-white/60 mt-1">
                    {Object.entries(item.customizations).map(([key, value]) => (
                      <span key={key} className="mr-2">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-white font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Condiments */}
        {selectedCondiments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <h5 className="text-sm font-medium text-white/60 mb-2">Condiments</h5>
            {selectedCondiments.map(condiment => (
              <div key={condiment.name} className="text-sm text-white/80">
                {condiment.name} x{condiment.quantity}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-white/80">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between text-white/80">
              <span>Tip</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
          )}
          {orphanageDonation > 0 && (
            <div className="flex justify-between text-white/80">
              <span>Orphanage Donation</span>
              <span>${orphanageDonation.toFixed(2)}</span>
            </div>
          )}
          {healthcareDonation > 0 && (
            <div className="flex justify-between text-white/80">
              <span>Healthcare Donation</span>
              <span>${healthcareDonation.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-white font-bold text-xl pt-2 border-t border-white/10">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all duration-300 font-medium"
        >
          {"← Back"}
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-black rounded-lg transition-all duration-300 font-bold"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
