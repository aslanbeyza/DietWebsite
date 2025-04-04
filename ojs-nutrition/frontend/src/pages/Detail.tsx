import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { ProductDetails } from "../components/ProductDetail/ProductDetail";
import { getProductById } from "../services/productService";
import { getReviewsForProduct } from "../services/reviewService";
import Box from "@mui/material/Box";


const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        if (productId) {
          setLoading(true);
          const [productData] = await Promise.all([
            getProductById(Number(productId)),
            getReviewsForProduct(Number(productId)),
          ]);
          setProduct(productData);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProductAndReviews();
  }, [productId]);


  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ProductDetails product={product} />
      </Box>
   
    </>
  );
};

export default Detail;