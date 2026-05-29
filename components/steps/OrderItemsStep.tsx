"use client";

import { useState } from "react";
import { Search, X, Plus, Minus } from "lucide-react";
import { menuCategories, itemHasSizes } from "@/data/menuData";
import { CustomizationPopup } from "@/components/CustomizationPopup";
import { SizeSelectionPopup } from "@/components/SizeSelectionPopup";
import { OrderItem, MenuItem } from "@/types";
import { useToast } from "@/components/Toast";

interface OrderItemsStepProps {
  orderItems: Record<string, OrderItem>;
  setOrderItems: (items: Record<string, OrderItem>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OrderItemsStep({ orderItems, setOrderItems, onNext, onBack }: OrderItemsStepProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [customizationPopup, setCustomizationPopup] = useState<{
    show: boolean;
    itemKey: string;
    itemName: string;
    category: string;
  } | null>(null);
  const [sizePopupItem, setSizePopupItem] = useState<{ item: MenuItem; category: string } | null>(null);
  const { showToast } = useToast();

  const calculateTotal = () => {
    return Object.values(orderItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const needsCustomization = (item: MenuItem, category: string): boolean => {
    return item.needsCustomization || 
           category === "Happy Meals" ||
           category === "happymeals" ||
           (category === "burgers" && 
            (item.name.toLowerCase().includes("burger") || 
             item.name.toLowerCase().includes("sandwich") ||
             item.name.toLowerCase().includes("mac") ||
             item.name.toLowerCase().includes("quarter")));
  };

  const updateQuantity = (key: string, change: number, item?: MenuItem, category?: string) => {
    const newItems = { ...orderItems };
    
    if (!newItems[key] && item && category) {
      newItems[key] = {
        ...item,
        quantity: 0,
        category
      };
    }

    if (newItems[key]) {
      newItems[key].quantity = Math.max(0, newItems[key].quantity + change);
      
      if (newItems[key].quantity === 0) {
        const itemName = newItems[key].name;
        delete newItems[key];
        setOrderItems(newItems);
        showToast(`${itemName} removed from order`, 'error');
      } else {
        setOrderItems(newItems);
        
        if (change > 0) {
          showToast(`${newItems[key].name} added to order`, 'success');
        } else if (change < 0) {
          showToast(`${newItems[key].name} quantity: ${newItems[key].quantity}`, 'info');
        }
      }
    }
  };

  const handleSizeSelection = (item: MenuItem, category: string) => {
    setSizePopupItem({ item, category });
  };

  const handleSizeConfirm = (selections: { size: string; price: number; calories: number; quantity: number }[]) => {
    const category = sizePopupItem?.category || '';
    const item = sizePopupItem?.item;
    
    if (!item) return;
    
    const newItems = { ...orderItems };
    
    selections.forEach(selection => {
      const key = `${category}:${item.name}:${selection.size}`;
      
      if (newItems[key]) {
        // Item with this size already exists, increment the quantity
        newItems[key].quantity += selection.quantity;
      } else {
        // New size, create new entry
        newItems[key] = {
          name: item.name,
          price: selection.price,
          calories: selection.calories,
          quantity: selection.quantity,
          category,
          size: selection.size
        };
      }
    });
    
    setOrderItems(newItems);
    
    selections.forEach(selection => {
      if (selection.quantity > 0) {
        showToast(`${item.name} (${selection.size}) added to order`, 'success');
      }
    });
    
    setSizePopupItem(null);
  };

  const handleItemClick = (item: MenuItem, category: string) => {
    if (itemHasSizes(item)) {
      handleSizeSelection(item, category);
    } else if (needsCustomization(item, category)) {
      const key = `${category}:${item.name}`;
      updateQuantity(key, 1, item, category);
      setCustomizationPopup({
        show: true,
        itemKey: key,
        itemName: item.name,
        category
      });
    } else {
      const key = `${category}:${item.name}`;
      updateQuantity(key, 1, item, category);
    }
  };

  const handleCustomizationConfirm = (customizations: Record<string, string>, specialNotes: string) => {
    if (customizationPopup) {
      const newItems = { ...orderItems };
      if (newItems[customizationPopup.itemKey]) {
        newItems[customizationPopup.itemKey].customizations = customizations;
        newItems[customizationPopup.itemKey].specialNotes = specialNotes;
        
        let extraCost = 0;
        Object.entries(customizations).forEach(([key, value]) => {
          if (value === 'extra') {
            extraCost += key === 'cheese' ? 0.50 : 0.25;
          }
        });
        newItems[customizationPopup.itemKey].price += extraCost;
        
        setOrderItems(newItems);
        showToast(`${customizationPopup.itemName} customized`, 'success');
      }
    }
    setCustomizationPopup(null);
  };

  const getItemQuantity = (item: MenuItem, category: string): number => {
    if (itemHasSizes(item)) {
      return Object.entries(orderItems)
        .filter(([key]) => key.startsWith(`${category}:${item.name}:`))
        .reduce((sum, [, orderItem]) => sum + orderItem.quantity, 0);
    }
    const key = `${category}:${item.name}`;
    return orderItems[key]?.quantity || 0;
  };

  const getSizeBreakdown = (item: MenuItem, category: string): { size: string; quantity: number }[] => {
    if (!itemHasSizes(item)) return [];
    
    return Object.entries(orderItems)
      .filter(([key]) => key.startsWith(`${category}:${item.name}:`))
      .map(([key, orderItem]) => ({
        size: orderItem.size || key.split(':')[2],
        quantity: orderItem.quantity
      }))
      .filter(s => s.quantity > 0);
  };

  const filteredCategories = menuCategories.filter(category => {
    if (!searchQuery) return true;
    return category.items.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Step 2: Select Items</h3>
        <p className="text-white/60">Choose from our delicious menu</p>
      </div>

      {/* Running Total */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20 z-10">
        <div className="text-center text-2xl font-bold text-white">
          Total: ${calculateTotal().toFixed(2)}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-pink-400 transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {menuCategories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === index
                ? "bg-pink-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {category.emoji} {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-3 mb-8">
        {filteredCategories[activeTab]?.items.map((item) => {
          const quantity = getItemQuantity(item, filteredCategories[activeTab].id);
          const hasSizes = itemHasSizes(item);
          const sizeBreakdown = getSizeBreakdown(item, filteredCategories[activeTab].id);
          
          return (
            <div
              key={item.name}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleItemClick(item, filteredCategories[activeTab].id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-white/60">
                    ${hasSizes ? item.sizes?.[0]?.price.toFixed(2) || '0.00' : item.price.toFixed(2)}
                    {hasSizes && ' - '}
                    {hasSizes && item.sizes?.map(s => s.size).join(' / ')}
                    {' • '}
                    {hasSizes ? item.sizes?.[0]?.calories || 0 : item.calories} cal
                  </div>
                  {item.includes && (
                    <div className="text-xs text-pink-400 mt-1">
                      Includes: {item.includes.join(', ')}
                    </div>
                  )}
                  {/* Size Breakdown Display */}
                  {hasSizes && sizeBreakdown.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sizeBreakdown.map((s) => (
                        <span 
                          key={s.size} 
                          className="inline-flex items-center px-2 py-1 bg-pink-500/20 border border-pink-500/40 rounded-full text-xs text-pink-300"
                        >
                          {s.quantity} - {s.size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {quantity > 0 && (
                    <>
                      <button
                        onClick={() => {
                          if (hasSizes) {
                            handleSizeSelection(item, filteredCategories[activeTab].id);
                          } else {
                            const key = `${filteredCategories[activeTab].id}:${item.name}`;
                            updateQuantity(key, -1, item, filteredCategories[activeTab].id);
                          }
                        }}
                        className="w-8 h-8 rounded-full border border-pink-400 text-pink-400 flex items-center justify-center hover:bg-pink-400 hover:text-black transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-white font-bold">{quantity}</span>
                    </>
                  )}
                  <button
                    onClick={() => handleItemClick(item, filteredCategories[activeTab].id)}
                    className="w-8 h-8 rounded-full bg-pink-500 text-black flex items-center justify-center hover:bg-pink-400 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
          disabled={calculateTotal() === 0}
          className="flex-1 py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {"Next: Condiments →"}
        </button>
      </div>

      {/* Popups */}
      {customizationPopup && (
        <CustomizationPopup
          itemName={customizationPopup.itemName}
          category={customizationPopup.category}
          onConfirm={handleCustomizationConfirm}
          onClose={() => setCustomizationPopup(null)}
        />
      )}
      
      {sizePopupItem && (
        <SizeSelectionPopup
          item={sizePopupItem.item}
          category={sizePopupItem.category}
          onConfirm={handleSizeConfirm}
          onClose={() => setSizePopupItem(null)}
        />
      )}
    </div>
  );
}
