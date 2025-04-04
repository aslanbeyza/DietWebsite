import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { getProductsByCategoryId } from "../../services/categoryService";
import { Product } from "../../types/Product";
import StarRating from "../StarRating/StarRating";

// Sabit kategori eşleştirmeleri
const CATEGORY_MAPPINGS = {
  protein: { id: 1, name: "PROTEİN" },
  "spor-gidalari": { id: 2, name: "SPOR GIDALARI" },
  karbonhidrat: { id: 3, name: "KARBONHİDRATLAR" },
  gida: { id: 4, name: "GIDA" },
  saglik: { id: 5, name: "SAĞLIK" },
  vitamin: { id: 6, name: "VİTAMİN" },
};

// Kategori adını getiren fonksiyon
const getCategoryName = (categoryTitle: string | undefined): string => {
  if (!categoryTitle) return "";
  return (
    CATEGORY_MAPPINGS[categoryTitle as keyof typeof CATEGORY_MAPPINGS]?.name ||
    ""
  );
};

// URL'deki title'dan kategori ID'sini bulan fonksiyon
const getCategoryIdFromTitle = (categoryTitle: string): number | undefined => {
  return CATEGORY_MAPPINGS[categoryTitle as keyof typeof CATEGORY_MAPPINGS]?.id;
};

const CategoryProductsPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;

      try {
        setLoading(true);
        const categoryId = getCategoryIdFromTitle(categoryName);

        if (categoryId) {
          const productsData = await getProductsByCategoryId(categoryId);
          setProducts(productsData.data);
          console.log("API Response:", productsData); // Yanıtı kontrol edin
        }
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleCardClick = (productId: number) => {
    navigate(`/product/${productId}`); // Ürünün detay sayfasına yönlendirme
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <div>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" gutterBottom textAlign={"center"} mb={5}>
          {getCategoryName(categoryName)}
        </Typography>
        <Grid container spacing={2} sx={{ width: "80%" }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                onClick={() => handleCardClick(product.id)} 
                  sx={{
                    cursor: "pointer",
                    height: "440px",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "none",
                  }}
                >
                  <CardMedia
                    sx={{
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      height: "60%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "none",
                    }}
                    component="img"
                    image={product.photo_src}
                    alt={product.name || "resim işte uzatma"}
                  />
                  <CardContent
                    sx={{
                      textAlign: "center",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        lineHeight: "1.2rem",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        lineHeight: "1.2rem",
                      }}
                    >
                      {product.short_explanation}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        lineHeight: "1.2rem",
                      }}
                    >
                      <StarRating
                        value={product?.reviewSummary?.averageRating}
                      />
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        lineHeight: "1.2rem",
                      }}
                    >
                      {product.reviewSummary?.reviewCount} Yorum
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.5rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        lineHeight: "1.2rem",
                      }}
                    >
                      {/* {product.priceInfo.total_price} TL */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CategoryProductsPage;