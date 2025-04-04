import { Box, TextField, Button } from "@mui/material";
import { Review } from "../../types/Review";
import { Dispatch, SetStateAction } from "react";
import StarRating from '../StarRating/StarRating';

const ReviewForm = ({
  onSubmit,
  loading,
  productId,
  onReset,
  rating,
  description,
  setRating,
  setDescription,
}: {
  onSubmit: (review: Review) => void;
  loading: boolean;
  productId: number | null;
  onReset?: () => void;
  rating: number | null;
  description: string;
  setRating: Dispatch<SetStateAction<number>>;
  setDescription: Dispatch<SetStateAction<string>>;
}) => {
  const handleSubmit = () => {
    if (productId && rating !== null && description.trim()) {
      onSubmit({
        ProductId: Number(productId), rating, description,
      });
      if (onReset) {
        onReset();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "40%",
        alignItems: "start",
        color:"#797676"
      }}
    >
      <StarRating
          rating={rating || 0} // Varsayılan değer olarak 0
          setRating={setRating}
          interactive={true} // Kullanıcının yıldızları seçebilmesi için
        />
        Yorumunuzu ve puanınızı belirtin!

      <TextField
        placeholder="Yorum yazın..."
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
        required
        sx={{
          marginBottom: "2px",
          backgroundColor: "#F7F7F7",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#E5E5E5" },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{backgroundColor: "black", color: "white", fontWeight: "bold"}} 
        disabled={
          loading || !productId || rating === null || !description.trim()
        }
      >
        Gönder
      </Button>
    </Box>
  );
};

export default ReviewForm;
