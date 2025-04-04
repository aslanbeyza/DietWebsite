import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";

interface SearchResultsModalProps {
  results: Product[]; // Tüm ürünlerin listesi
  searchTerm: string;
  onClose: () => void;
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  results,
  searchTerm,
  onClose,
}) => {
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = results.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  }, [searchTerm, results]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  if (!searchTerm) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "102%",
        left: 0,
        right: 0,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 1,
        maxHeight: "400px",
        overflowY: "auto",
        zIndex: 1000,
        color: "black",
      }}
    >
      {filteredResults.length > 0 ? (
        <List>
          {filteredResults.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem
                onClick={() => handleProductClick(product.id)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "black",
                  },
                  color: "black",
                }}
              >
                {/* Görsel */}
                <Box
                  component="img"
                  src={product.photo_src}
                  alt={product.name}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                  }}
                />

                {/* Yazı kısmı */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "black" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "10px",
                      color: "text.secondary",
                      mt: 0.5,
                    }}
                  >
                    {product.short_explanation}
                  </Typography>
                </Box>
              </ListItem>
              <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.1)" }} />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography
          sx={{
            p: 2,
            textAlign: "center",
            color: "black",
          }}
        >
          "{searchTerm}" ile ilgili sonuç bulunamadı
        </Typography>
      )}
    </Box>
  );
};

export default SearchResultsModal;
