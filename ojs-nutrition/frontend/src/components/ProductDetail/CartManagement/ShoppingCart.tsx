import React from "react";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "./CartItem";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { useNavigate } from 'react-router-dom';

export const ShoppingCart: React.FC = () => {
  const { isOpen, setIsOpen, cartItems, getTotalPrice } = useShoppingCart();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();


  const handleNavigateToPayment = () => {
    setIsOpen(false); // Çekmeceyi kapat
    setTimeout(() => navigate("/payment"), 300); // Yönlendirmeyi biraz gecikmeli yap
  };


  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          width: 550,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Üst başlık */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sepetim
          </Typography>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              position: "absolute",
              right: 16,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* İçerik */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            background: "#F7F7F7",
            display: "flex",
            flexDirection: "column",
            justifyContent: cartItems.length === 0 ? "center" : "flex-start", // Ortalamayı sağlar
            alignItems: "center",
          }}
        >
          {cartItems.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                color: "#757575",
                textAlign: "center",
              }}
            >
              Sepetinizde ürün bulunmamaktadır
            </Typography>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.variantId}
                item={{
                  id: item.id,
                  variantId: item.variantId,
                  quantity: item.quantity,
                  name: item.name,
                  photo_src: item.photo_src,
                  price: item.price,
                  flavor: item.flavor,
                  size: item.size || " ",
                }}
              />
            ))
          )}
        </Box>

        {/* Alt bilgi */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            background: "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Toplam:</Typography>
            <Typography variant="h6">{totalPrice.toFixed(2)} ₺</Typography>
          </Box>
          {cartItems.length > 0 && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "black",
                color: "white",
                height: "55px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleNavigateToPayment}
            >
              Ödemeye Geç
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};