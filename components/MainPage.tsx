"use client";

import { useState } from "react";
import { User, OrderItem, Condiment, StepName } from "@/types";
import { condimentsData } from "@/data/menuData";
import { useToast } from "@/components/Toast";
import { TopBar } from "@/components/TopBar";
import { OrderNameStep } from "@/components/steps/OrderNameStep";
import { OrderItemsStep } from "@/components/steps/OrderItemsStep";
import { CondimentsStep } from "@/components/steps/CondimentsStep";
import { PickupStep } from "@/components/steps/PickupStep";
import { PaymentStep } from "@/components/steps/PaymentStep";
import { ReviewStep } from "@/components/steps/ReviewStep";
import { ConfirmationStep } from "@/components/steps/ConfirmationStep";

interface MainPageProps {
  user: User;
  onSignOut: () => void;
}

export function MainPage({ user, onSignOut }: MainPageProps) {
  const [currentStep, setCurrentStep] = useState<StepName>("order-name");
  const [orderName, setOrderName] = useState("");
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem>>({});
  const [condiments, setCondiments] = useState<Record<string, Condiment>>(() => {
    const initial: Record<string, Condiment> = {};
    condimentsData.forEach((c) => {
      initial[c.id] = { name: c.name, quantity: 0, calories: c.calories };
    });
    return initial;
  });
  const [pickupMethod, setPickupMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [mobilePayType, setMobilePayType] = useState("");
  const [tip, setTip] = useState(0);
  const [orphanageDonation, setOrphanageDonation] = useState(0);
  const [healthcareDonation, setHealthcareDonation] = useState(0);

  const { showToast } = useToast();

  const calculateTotal = () => {
    let total = 0;
    Object.values(orderItems).forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const validateOrderName = () => {
    if (!orderName.trim()) {
      showToast("Please enter an order name", "error");
      return false;
    }
    return true;
  };

  const validateMenuItems = () => {
    const hasItems = Object.values(orderItems).some((item) => item.quantity > 0);
    if (!hasItems) {
      showToast("Please select at least one item from the menu", "error");
      return false;
    }
    return true;
  };

  const validatePickup = () => {
    if (!pickupMethod) {
      showToast("Please select a pickup method", "error");
      return false;
    }
    if (pickupMethod === "delivery" && !deliveryAddress.trim()) {
      showToast("Please enter a delivery address", "error");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      showToast("Please select a payment method", "error");
      return false;
    }
    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        showToast("Please fill in all card details", "error");
        return false;
      }
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(cardDetails.expiry)) {
        showToast("Please enter expiry date in MM/YY format", "error");
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    switch (currentStep) {
      case "order-name":
        if (validateOrderName()) setCurrentStep("order-items");
        break;
      case "order-items":
        if (validateMenuItems()) setCurrentStep("condiments");
        break;
      case "condiments":
        setCurrentStep("pickup");
        break;
      case "pickup":
        if (validatePickup()) setCurrentStep("payment");
        break;
      case "payment":
        if (validatePayment()) setCurrentStep("review");
        break;
      case "review":
        setCurrentStep("confirmation");
        break;
    }
  };

  const goBack = () => {
    switch (currentStep) {
      case "order-items":
        setCurrentStep("order-name");
        break;
      case "condiments":
        setCurrentStep("order-items");
        break;
      case "pickup":
        setCurrentStep("condiments");
        break;
      case "payment":
        setCurrentStep("pickup");
        break;
      case "review":
        setCurrentStep("payment");
        break;
    }
  };

  const resetOrder = () => {
    setCurrentStep("order-name");
    setOrderName("");
    setOrderItems({});
    const initialCondiments: Record<string, Condiment> = {};
    condimentsData.forEach((c) => {
      initialCondiments[c.id] = { name: c.name, quantity: 0, calories: c.calories };
    });
    setCondiments(initialCondiments);
    setPickupMethod("");
    setDeliveryAddress("");
    setPaymentMethod("");
    setCardDetails({ number: "", expiry: "", cvv: "", name: "" });
    setMobilePayType("");
    setTip(0);
    setOrphanageDonation(0);
    setHealthcareDonation(0);
  };

  const getThemeBackground = () => {
    if (user.theme === "sav") {
      return "url('https://wallpaperaccess.com/full/479670.jpg')";
    }
    return "url('https://getwallpapers.com/wallpaper/full/e/2/8/1121342-free-download-baby-kitten-wallpaper-1920x1080-1080p.jpg')";
  };

  const renderStep = () => {
    switch (currentStep) {
      case "order-name":
        return (
          <OrderNameStep
            orderName={orderName}
            setOrderName={setOrderName}
            onNext={goNext}
          />
        );
      case "order-items":
        return (
          <OrderItemsStep
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case "condiments":
        return (
          <CondimentsStep
            condiments={condiments}
            setCondiments={setCondiments}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case "pickup":
        return (
          <PickupStep
            pickupMethod={pickupMethod}
            setPickupMethod={setPickupMethod}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case "payment":
        return (
          <PaymentStep
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            mobilePayType={mobilePayType}
            setMobilePayType={setMobilePayType}
            tipAmount={tip}
            setTipAmount={setTip}
            orphanageDonation={orphanageDonation}
            setOrphanageDonation={setOrphanageDonation}
            healthcareDonation={healthcareDonation}
            setHealthcareDonation={setHealthcareDonation}
            orderTotal={calculateTotal()}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case "review":
        return (
          <ReviewStep
            orderName={orderName}
            orderItems={orderItems}
            condiments={condiments}
            pickupMethod={pickupMethod}
            deliveryAddress={deliveryAddress}
            paymentMethod={paymentMethod}
            tipAmount={tip}
            orphanageDonation={orphanageDonation}
            healthcareDonation={healthcareDonation}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case "confirmation":
        return <ConfirmationStep onNewOrder={resetOrder} />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: getThemeBackground(),
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/20 z-0" />
      <TopBar user={user} onSignOut={onSignOut} />
      <main className="flex-1 overflow-y-auto px-4 md:px-10 py-6 relative z-10">
        {renderStep()}
      </main>
    </div>
  );
}
