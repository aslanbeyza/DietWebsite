import React from "react";
import { createStripePayment } from "../../services/stripe";
import Button from '@mui/material/Button';

interface CreditCardFormProps {
  OrderId: number ;
  amount: number;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ OrderId, amount }) => {
  const handleCheckout = async () => {
    try {
      const stripeUrl = await createStripePayment(OrderId, amount);

      // Kullanıcıyı Stripe ödeme sayfasına yönlendir
      window.location.href = stripeUrl;
    } catch (error) {
      console.error("Checkout başlatılamadı:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleCheckout}
        sx={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "gray", 
          },
        }}
      >
        Ödemeye Git
      </Button>
    </div>
  );
};
export default CreditCardForm;