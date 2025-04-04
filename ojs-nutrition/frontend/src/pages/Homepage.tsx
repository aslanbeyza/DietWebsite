import { Box, useMediaQuery, useTheme } from "@mui/material";
import AutoPlaySlider from '../components/Review/Slider/Slider';
import CategoriesGrid from '../components/Categories/CategoriesGrid';
import "slick-carousel/slick/slick.css";


const Homepage = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // Ekran boyutuna göre objectPosition değerini ayarlayın
  let objectPosition = "center";
  let height = "400px"; 

  if (isXs) {
    objectPosition = "right";
    height = "300px";
  } else if (isSm) {
    objectPosition = "center";
    height = "350px";
  } else if (isMd) {
    objectPosition = "center";
    height = "480px";
  }

  return (
    <div>
      <Box
        sx={{
          mt: { xs: "-5px", sm: "-30px", md: "-30px" },
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <img
          src="assets/Homepage/banner.png"
          alt="Banner"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        />
      </Box>
      <CategoriesGrid />
{/*       <Typography variant="h6" gutterBottom textAlign="center" mt={3}>
        ÇOK SATANLAR
      </Typography> */}
      
      <Box
        sx={{
          width: "100%",
          maxWidth: isMd ? "1920px" : isSm ? "960px" : "600px", // maxWidth belirleme
          minWidth: isMd ? "960px" : isSm ? "600px" : "320px", // minWidth belirleme
          height: height, // Responsive yükseklik
          margin: "auto", // Ortalamak için margin auto kullanın
          marginBottom: "40px",
        }}
      >
        <img
          src="assets/Homepage/figure.png"
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: objectPosition, // Dinamik olarak belirlenen objectPosition değeri
          }}
        />
      </Box>
      <Box sx={{ marginY: "60px" }}>
        <AutoPlaySlider />
      </Box>
   
    </div>
  );
};

export default Homepage;
