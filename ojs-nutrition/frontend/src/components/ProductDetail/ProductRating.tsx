import React from 'react';
import { Box } from '@mui/material';
import StarRating from '../StarRating/StarRating';
import ReviewStats from './CommentsStats';

interface ProductRatingProps {
  commentCount: number;
}

export const ProductRating: React.FC<ProductRatingProps> = ({ commentCount }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <StarRating interactive={false} rating={ReviewStats.length}  />
    <span>{commentCount} Yorum</span>
  </Box>
);