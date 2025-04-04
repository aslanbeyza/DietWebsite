import React from 'react';
import { Box } from '@mui/material';
import Star from './Star';

interface StarRatingProps {
  value?: number;
  rating?: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  interactive?: boolean; 

}

const StarRating: React.FC<StarRatingProps> = ({interactive, value = 0, rating, setRating }) => {
  const [internalRating, setInternalRating] = React.useState<number>(value);
  const [selection, setSelection] = React.useState<number>(0);

  const hoverOver = (event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    let val = 0;
    const target = event.target as HTMLElement;
    if (target && target.getAttribute('data-star-id')) {
      val = parseInt(target.getAttribute('data-star-id') || '0');
    }
    setSelection(val);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    const target = event.target as HTMLElement;
    const selectedRating = parseInt(target.getAttribute('data-star-id') || internalRating.toString());
    
    if (setRating) {
      // `setRating` işlevini doğrudan değer olarak kullanıyoruz
      setRating(selectedRating);
    } else {
      setInternalRating(selectedRating);
    }
  };

  return (
    <Box
      onMouseOut={() => interactive && setSelection(0)} // Etkileşim devre dışıysa sıfırlama yapma
      onClick={handleClick}
      onMouseOver={hoverOver}
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        pointerEvents: interactive ? 'auto' : 'none', // Etkileşim kontrolü
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : (rating ?? internalRating) >= i + 1}
        />
      ))}
    </Box>
  );
};

export default StarRating;