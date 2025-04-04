import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"; // İkonu dahil ettik.
import { Size } from "../../types/Size";

interface SizeSelectorProps {
  availableSizes: Size[];
  selectedSize: Size | null;
  onSizeSelect: (size: Size) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  availableSizes,
  selectedSize,
  onSizeSelect,
}) => (
  <Box>
    <Typography sx={{ marginTop: "16px", marginBottom: "8px", fontWeight: "bold", }}>
      Boyut:
    </Typography>
    <Box
      sx={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        justifyContent: "flex-start",
        
      }}
    >
      {availableSizes.map((size) => (
        <Box
          key={`${size.gram}-${size.pieces}`}
          sx={{
            position: "relative", 
            
          }}
        >
          <Button
            onClick={() => onSizeSelect(size)}
            sx={{
                
              border:
                selectedSize?.gram === size.gram
                  ? "2px solid #6200ea"
                  : "2px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              boxShadow:
                selectedSize?.gram === size.gram
                  ? "0 4px 6px rgba(0,0,0,0.2)"
                  : "none",
              minWidth: "120px",
              backgroundColor:
                selectedSize?.gram === size.gram ? "#f5f5f5" : "#fff",
              textAlign: "center",
              position: "relative", 
              color:"black"
            }}
          >
            <Box sx={{ fontWeight: "bold",marginRight:"4px" }}>{size.gram}G</Box>
            <Box sx={{ fontSize: "12px" }}>({size.pieces} servis)</Box>
          </Button>
          {selectedSize?.gram === size.gram && (
            <CheckIcon
              sx={{
                color: "#fff",
                fontSize: "15px",
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "#6200ea",
                borderRadius: "50%",
                padding: "2px",
                zIndex: 1, 
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);