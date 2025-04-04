import React, { useEffect, useState, useRef, useCallback } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../../types/Product";
import { getProducts } from "../../services/productService";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const ITEMS_PER_PAGE = 12;

export const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts(page, ITEMS_PER_PAGE);
      console.log("first product", data);
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        data.forEach((product: Product) => {
          if (!newProducts.some((p) => p.id === product.id)) {
            newProducts.push(product);
          }
        });
        return newProducts;
      });

      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
      setError(
        "Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center" mb={5}>
        TÜM ÜRÜNLER
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        {products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4} // Her satırda 3 ürün göstermek için md={4} ayarı kullanılıyor.
            key={product.id}
            ref={index === products.length - 1 ? lastProductRef : null}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {loading && <div className="text-center py-8">Yükleniyor...</div>}
    </Container>
  );
};
export default ProductListPage;
