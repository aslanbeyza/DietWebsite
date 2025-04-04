import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Size } from "../../types/Size";
import { Variant } from "../../types/Variant";
import CheckIcon from "@mui/icons-material/Check";

interface FlavorSelectorProps {
  groupedVariants: Record<string, Variant[]>;
  selectedFlavor: string;
  onFlavorSelect: (flavor: string, firstSize: Size) => void;
}

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  groupedVariants,
  selectedFlavor,
  onFlavorSelect,
}) => (
  <Box>
    <Typography
      sx={{ marginBottom: "4px", fontWeight: "bold", fontSize: "14px" }}
    >
      Aroma:
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "flex-start",
      }}
    >
      {Object.entries(groupedVariants).map(([flavor, variants]) => (
        <Box
          key={flavor}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80px", // Sabit genişlik
            height: "110px", // Sabit yükseklik
            textAlign: "center",
          }}
        >
          <Button
            onClick={() => onFlavorSelect(flavor, variants[0].Sizes[0])}
            sx={{
              border:
                selectedFlavor === flavor
                  ? "2px solid blue"
                  : "2px solid #ccc",
              padding: "6px",
              borderRadius: "6px",
              boxShadow:
                selectedFlavor === flavor
                  ? "0 2px 4px rgba(0,0,0,0.2)"
                  : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              aspectRatio: 1 / 1,
              height: "70px",
              textAlign: "center",
            }}
          >
            {selectedFlavor === flavor && (
              <CheckIcon
                sx={{
                  color: "#fff",
                  fontSize: "20px",
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "blue",
                  borderRadius: "50%",
                  zIndex: "10",
                }}
              />
            )}
            <img
              src={variants[0].aroma_photo}
              alt={flavor}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "4px",
              }}
            />
          </Button>
          <Typography
            sx={{
              fontWeight: selectedFlavor === flavor ? "bold" : "normal",
              color: selectedFlavor === flavor ? "blue" : "black",
              fontSize: "8px",
              marginTop: "4px", // Buton ile yazı arasında mesafe
              textAlign: "center",
            }}
          >
            {flavor}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);