import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProductHeaderProps {
  name: string;
  shortExplanation: string;
  tags: string[];
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  name, 
  shortExplanation, 
  tags 
}) => (
  <>
    <Typography variant="h4" sx={{ margin: "8px 0 4px" }}>
      {name}
    </Typography>
    <Typography variant="body1" sx={{ margin: "4px 0" }}>
      {shortExplanation}
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
      {tags.map((tag, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  </>
);