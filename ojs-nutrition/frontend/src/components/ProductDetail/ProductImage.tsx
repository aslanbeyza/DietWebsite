import React from "react";
import Box from "@mui/material/Box";

interface ProductImageProps {
  product: { name: string | null };
  selectedPhoto: string; // Seçili varyant veya ürün ana fotoğrafı
  discountPercentage?: number | null;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  selectedPhoto,
  discountPercentage,
}) => {
  return (
    <Box
      style={{
        position: "relative", // Badge için gerekli
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "400px",
        height: "500px",
        padding: "20px",
        margin: "10px",
      }}
    >
      {discountPercentage! > 0 && ( // Koşullu render doğru şekilde yerleştirildi
       <Box
       sx={{
         position: "absolute",
         textAlign: "center",
         width: "70px",
         height: "70px",
         top: "10px",
         left: "400px",
         backgroundColor: "red",
         color: "white",
         fontWeight: "bold",
         zIndex: 100,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         fontSize: "14px",
         flexDirection: "column" 
       }}
     >
       <span style={{ fontSize: "16px", display: "block" }}>
         %{discountPercentage}
       </span>
       İNDİRİM
     </Box>
     
      )}
      <img
        src={selectedPhoto}
        alt={product.name || "Product"}
        style={{
          width: "120%",
          height: "100%", 
          objectFit: "fill", 
        }}
      />
    </Box>
  );
};