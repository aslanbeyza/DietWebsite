import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import './style.css';
import StarRating from '../StarRating/StarRating';

type Section = "products" | "categories" | "popular";

// Dinamik ürün verileri örneği
const products = [
  { id: 1, name: 'Whey Protein' },
  { id: 2, name: 'Cream of Rice' },
  { id: 3, name: 'Creatine' },
  { id: 4, name: 'BCAA+' },
  { id: 5, name: 'Pre-Workout' },
  { id: 6, name: 'Fitness Paketi' },
  { id: 7, name: 'Collagen' },
  { id: 8, name: 'Günlük Vitamin Paketi' },
  { id: 9, name: 'ZMA' },
];

// Footer bileşeni
const Footer = () => {
  const [accordionOpen, setAccordionOpen] = useState<Record<Section, boolean>>({
    products: true,
    categories: false,
    popular: false,
  });

  const toggleAccordion = (section: Section) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="footer">
      <Container>
        <Grid container className="allContainer">
          <Grid item xs={12} className="starsGrid">
            <Typography variant="body2" mb={2} textAlign="start">
              <StarRating value={0} />
              (140.000+)
            </Typography>
          </Grid>
          <Grid
            item
            className="textsWrapper"
            xs={12}
            gap={{ xs: 3, sm: 10, md: 26 }}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                mb={6}
                textAlign="left"
                fontWeight={500}
                lineHeight={2}
                fontSize={{ xs: 16, sm: 18, md: 20 }}
              >
                LABORATUVAR TESTLİ ÜRÜNLER AYNI GÜN & ÜCRETSİZ KARGO MEMNUNİYET
                GARANTİSİ
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                lineHeight={2}
                textAlign="left"
                fontSize={{ xs: 14, sm: 16 }}
              >
                200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi
                seveceğinize eminiz. Eğer herhangi bir sebeple memnun kalmazsan,
                bizimle iletişime geçtiğinde çözüme kavuşturacağız.
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} className="itemContainer">
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              className="productFooter"
              sx={{ height: { xs: "auto", sm: "100%", md: "100%" } }}
            >
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("products")}
                className={`accordion-toggle ${
                  accordionOpen.products ? "open" : ""
                }`}
                fontWeight={500}
                sx={{ display: { xs: "flex", sm: "none", md: "none" } }}
              >
                OJS NUTRITION
              </Typography>
              <Typography variant="h6" className="logo">
                <img src="../../../public/assets/whitelogo.png" alt="Logo" />
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.products ? "active" : ""
                }`}
              >
                {products.map(product => (
                  <li key={product.id}>
                    <Link to={`http://localhost:5173/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={4} md={3} className="productFooter">
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("categories")}
                className={`accordion-toggle ${
                  accordionOpen.categories ? "open" : ""
                }`}
              >
                KATEGORİLER
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.categories ? "active" : ""
                }`}
              >
                <li><Link to="/category/protein">Protein</Link></li>
                <li><Link to="/category/sport-foods">Spor Gıdaları</Link></li>
                <li><Link to="/category/health">Sağlık</Link></li>
                <li><Link to="/category/food">Gıda</Link></li>
                <li><Link to="/category/vitamin">Vitamin</Link></li>
                <li><Link to="/category/accessories">Aksesuar</Link></li>
                <li><Link to="/category/all-products">Tüm Ürünler</Link></li>
                <li><Link to="/category/packages">Paketler</Link></li>
                <li><Link to="/category/special-offers">Lansmana Özel Fırsatlar</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={4} md={3} className="productFooter">
              <Typography
                variant="h6"
                onClick={() => toggleAccordion("popular")}
                className={`accordion-toggle ${
                  accordionOpen.popular ? "open" : ""
                }`}
              >
                POPÜLER ÜRÜNLER
              </Typography>
              <ul
                className={`footer-list ${
                  accordionOpen.popular ? "active" : ""
                }`}
              >
                {products.map(product => (
                  <li key={product.id}>
                    <Link to={`/popular/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="body2" className="copyRight" textAlign="left">
          Copyright &copy; - Tüm Hakları Saklıdır.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;