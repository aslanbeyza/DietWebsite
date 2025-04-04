import * as React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddressSelection from "./AddressSelectionStep";
import CreditCardForm from "./CreditCardForm";
import { Address } from "./../../types/Address";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { createOrder, createOrderItem } from "../../services/orderService";
import { OrderItem } from "../../types/OrderItem";
import { getCurrentUser } from '../../services/authService';

const steps = [
  {
    label: "Adres",
    description: "Teslimat Adresi",
  },
  {
    label: "Kargo",
    description:
      "Ücretsiz Kargo (16:00 öncesi siparişler aynı gün kargolanır).",
  },
  {
    label: "Ödeme",
    description: "Siparişinizi kontrol edin ve onaylayın.",
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(
    null
  );
  const [orderResponse, setOrderResponse] = React.useState<OrderItem>();
  const { cartItems, getTotalPrice } = useShoppingCart();
  const location = useLocation(); // useLocation ile URL parametrelerini alıyoruz
  const [paymentStatus, setPaymentStatus] = React.useState<
    "idle" | "success" | "failure"
  >("idle");

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    setPaymentStatus(status as "idle" | "success" | "failure");
    if (status === "failure") {
      setActiveStep(1);
    } else if (status === "success") {
      setTimeout(() => {
        window.location.href = "/"; // Ödeme başarılıysa anasayfaya yönlendir
      }, 5000);
    }
  }, [location.search]);

  const handleNext = async (address?: Address) => {
    if (activeStep === 0 && address) {
      setSelectedAddress(address);

      try {
        // Sipariş oluştur
        const currentUser = await getCurrentUser();
        const order = await createOrder({
          total: getTotalPrice(),
          status: "pending",
          UserId: Number(currentUser?.id),  
          imageUrl: cartItems[0].photo_src,
        });
          console.log("createOrder",order);
        setOrderResponse(order);  // Siparişi state'e kaydet
 
       // 2. OrderItem oluştur
        await Promise.all(
          cartItems.map((item) =>
            createOrderItem({
              quantity: item.quantity,
              price: item.price,
              OrderId: order.id, // Dönen OrderId kullanılıyor
              ProductId: item.id,
              imageUrl: item.photo_src,
              UserId: Number(currentUser?.id),
            })
          )
        );
        console.log("Order and items created successfully:", order);
        setActiveStep(2); // Ödeme adımına geçiyoruz
      } catch (error) {
        console.error("Sipariş oluşturma hatası:", error);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 120px)", // Header için alan bırakıyoruz
        overflowY: "auto",
        px: 4, // Yanlarda padding
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          width: "100%",
          "& .MuiStep-root": {
            mb: 3, // Her adım arasında boşluk
            "& .MuiStepLabel-root": {
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              bgcolor: "white",
            },
            "& .MuiStepContent-root": {
              ml: 3,
              borderLeft: "2px solid #e0e0e0",
              p: 2,
              mt: 2,
            },
          },
        }}
      >
        {paymentStatus === "failure" && (
          <Box color={"red"}>Ödeme Başarılı olmadı! Tekrar deneyiniz. </Box>
        )}
        {paymentStatus === "success" ? (
          <Box color={"green"}>Ödeme Başarılı! Siparişiniz alınmıştır.</Box>
        ) : (
          steps.map((step, index) => (
            <Step key={step.label}>

              
              <StepLabel>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
  <Box
    sx={{
      bgcolor: "white",
      p: 3,
      borderRadius: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    {index === 0 ? (
      <AddressSelection
        onAddressSelect={(address) => handleNext(address)}
      />
    ) : index === 1 ? (
      <Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {step.description}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleNext()}
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "black" },
          }}
        >
          Devam Et
        </Button>
      </Box>
    ) : (
      index === 2 && (
        <Box>
          {/* Eğer ödeme başarısızsa, hata mesajı göster */}
          {paymentStatus === "failure" && (
            <Typography variant="body1" color="error">
              Ödeme Başarısız! Lütfen tekrar deneyin.
            </Typography>
          )}

          {/* Eğer `orderResponse` yüklenmemişse, hata mesajı göster */}
          {!orderResponse?.id ? (
            <Typography variant="body2" color="error">
              Sipariş bilgisi bulunamadı. Lütfen geri giderek tekrar deneyin.
            </Typography>
          ) : (
            <CreditCardForm
              amount={getTotalPrice()}
              OrderId={orderResponse.id}
            />
          )}
        </Box>
      )
    )}
  </Box>
</StepContent>

            </Step>
          ))
        )}
      </Stepper>

      {activeStep === steps.length && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "white",
            borderRadius: 1,
            mt: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Siparişiniz Tamamlandı
          </Typography>
          {selectedAddress && (
            <Typography variant="body2" color="text.secondary">
              Teslimat Adresi: {selectedAddress.address_line1}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
