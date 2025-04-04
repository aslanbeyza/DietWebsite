import React from 'react';
import { Box } from '@mui/material';

interface StarProps {
  marked: boolean;
  starId: number;
}

const Star: React.FC<StarProps> = ({ marked, starId }) => {
  return (
    <Box
      component="span"
      data-star-id={starId}
      sx={{
        color: '#FDD835',
        cursor: 'pointer',
        fontSize: '1.5rem',
      }}
      role="button"
    >
      {marked ? '\u2605' : '\u2606'}
    </Box>
  );
};

export default Star;