/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Divider,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import {
  createReview,
  getReviewsForProduct,
} from "../../services/reviewService";
import ReviewStats from "./CommentsStats";
import ReviewForm from "./ReviewForm";
import { Review } from "../../types/Review";
import { useUser } from '../../context/UserContext';

interface Comment {
  id: number;
  content: string;
  user: string;
  createdAt: string;
  rating: number; // Her yorum için bir puan
  verified: boolean; // Kullanıcı doğrulaması
}

interface CommentSectionProps {
  productId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  productId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const { user } = useUser(); 

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getReviewsForProduct(productId); 
      if (!response) {
        console.log("first comment", response);
        throw new Error("API Response not OK");
      }

      // Gelen verileri formatlama

      const formattedComments: Comment[] = response.map((item: any) => ({
        id: item.id,
        content: item.description,
        user:item.UserId || "",
        createdAt: item.createdAt,
        rating: item.rating,
        verified: true,
      }));
        console.log("item",response);
      setComments(formattedComments);
      setTotalPages(Math.ceil(response.length / 5));
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleAddComment = async (
    newComments: Omit<Review, "id" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    try {
      const response = await createReview(newComments);
      if (response?.status === 201) {
        fetchComments();
        resetForm(); // Formu sıfırla
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // ReviewForm'u kullanırken resetleme işlemini sağlayın
  const resetForm = () => {
    setRating(null);
    setDescription("");
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const loadComments = async () => {
      await fetchComments();
    };
    loadComments();
  }, [fetchComments]); // Eğer sayfa değişiminde de çalışması gerekiyorsa page bağımlılığını ekleyin

  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Yorumlar ({comments.length})
      </Typography>
      <ReviewStats comments={comments} />

     {comments?.map((comment) => (
  <Paper
    key={comment.id}
    elevation={1}
    sx={{
      padding: 2,
      marginBottom: 2,
      borderRadius: "12px",
      backgroundColor: "#f9f9f9",
      width: "80%",
    }}
  >
    <Grid container justifyContent="space-between" alignItems="center">
      {/* Sol kısım: Kullanıcı bilgisi ve yıldızlar */}
      <Grid item xs={6} display="flex" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Box>
            {Array.from({ length: comment.rating }).map((_, index) => (
              <span
                key={index}
                style={{
                  color: "#FFD700",
                  fontSize: "16px",
                  marginRight: 2,
                }}
              >
                ★
              </span>
            ))}
            {Array.from({ length: 5 - comment.rating }).map((_, index) => (
              <span
                key={index}
                style={{
                  color: "#CCC",
                  fontSize: "16px",
                  marginRight: 2,
                }}
              >
                ★
              </span>
            ))}
          </Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginRight: 1 }}
          >
            {`${user?.name || ""} ${user?.lastName?.charAt(0) || ""}`} .
          </Typography>
          {comment.verified && (
            <Chip
              label="Doğrulanmış Satıcı"
              size="small"
              sx={{
                backgroundColor: "#e0f7fa",
                color: "#00796b",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>
      </Grid>

      {/* Sağ kısım: Tarih */}
      <Grid item xs={6} textAlign="right">
        <Typography
          variant="body2"
          sx={{ textAlign: "right", color: "gray" }}
        >
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </Grid>
    </Grid>

    {/* Alt Satır: Yorum İçeriği */}
    <Typography
      variant="body2"
      sx={{
        marginTop: 1,
        fontSize: "14px",
        color: "#555",
        textAlign: "left",
      }}
    >
      {comment.content}
    </Typography>
  </Paper>
))}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />
      <Divider sx={{ margin: "20px 0", width: "80%" }} />
      <ReviewForm
        onSubmit={handleAddComment}
        loading={loading}
        productId={productId}
        onReset={resetForm}
        rating={rating ?? 1}
        description={description}
        setRating={setRating as React.Dispatch<React.SetStateAction<number>>} 
        setDescription={setDescription}
      />
    </Box>
  );
};
