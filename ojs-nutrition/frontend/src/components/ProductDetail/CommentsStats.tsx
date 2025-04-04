import { Box, Typography, Grid } from "@mui/material";
import StarRating from '../StarRating/StarRating';

const calculateReviewStats = (comments: Comment[]) => {
  const totalReviews = comments.length;
  const ratingCounts = [0, 0, 0, 0, 0]; 

  comments.forEach((comment: { rating: number }) => {
    ratingCounts[comment.rating - 1] += 1; 
  });

  const averageRating =
    comments.reduce(
      (sum: number, comment: { rating: number }) => sum + comment.rating,
      0
    ) / totalReviews;

  return {
    totalReviews,
    ratingCounts,
    averageRating: averageRating.toFixed(1),
  };
};

interface Comment {
  rating: number;
}

interface ReviewStatsProps {
  comments: Comment[];
}

const ReviewStats = ({ comments }: ReviewStatsProps) => {
  const { totalReviews, ratingCounts, averageRating } =
    calculateReviewStats(comments);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between" 
      sx={{
        marginBottom: 6,
        maxWidth: "1200px",
      }}
    >
      {/* Left: Main Rating */}
      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          flex: 1,
          maxWidth: "30%",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
           {!isNaN(Number(averageRating)) && averageRating !== null ? Number(averageRating) : 0}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            marginBottom: 1,
          }}
        >
          {totalReviews} Yoruma Göre
        </Typography>
      </Box> 

      {/* Right: Rating Breakdown */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "35%",
        }}
      >
              {ratingCounts.map((count, index) => {
          const starCount = 5 - index; // Yıldız sayısı
          return (
            <Box
              key={starCount}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              {/* Star Rating */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 1,
                }}
              >
                <StarRating rating={starCount} interactive={false} />
              </Box>
              {/* Progress Bar */}
              <Box
                sx={{
                  flexGrow: 1,
                  height: "10px",
                  backgroundColor: "#eee",
                  position: "relative",
                  overflow: "hidden",
                  width: "30%",
                }}
              >
                <Box
                  sx={{
                    width: `${((count / totalReviews) * 100).toFixed(1)}%`,
                    height: "100%",
                    backgroundColor: "#007AFF",
                  }}
                />
              </Box>
              {/* Count */}
              <Typography
                variant="body2"
                sx={{ width: "10%", marginLeft: 1, textAlign: "left" }}
              >
                ({count})
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

export default ReviewStats;