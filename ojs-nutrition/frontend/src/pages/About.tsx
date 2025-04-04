import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import IsoIcon from "@mui/icons-material/Verified";
import GmpIcon from "@mui/icons-material/LocalPharmacy";
import HappyIcon from "@mui/icons-material/SentimentVerySatisfied";

const About: React.FC = () => {
  return (
    <div>
      <Container>
        <Box m={5}>
          <Typography variant="h4" gutterBottom>
            <b>
              {" "}
              Sağlıklı ve Fit Yaşamayı Zevkli ve Kolay Hale Getirmek İçin Varız
            </b>
          </Typography>
          <Typography variant="body1" paragraph>
            2016 yılından beri sağlıklı, lezzetli ve fonksiyonel gıda
            ürünlerimizi müşterilerimize en kaliteli, güvenilir, destekleyici
            yaşam ortağı olarak sunuyoruz.
          </Typography>
          <Typography variant="body1" paragraph>
            Müşteri memnuniyetini en yüksek düzeyde tutmayı önemsiyoruz.
            Ürünlerimiz, yüksek kalite standartlarında titizlikle üretilip,
            sağlık ve iyi yaşam kurallarına uygun olarak hazırlanmıştır. Üretim
            süreçlerimizde en yüksek kalite standartlarına uyarak, doğal,
            yenilikçi, vitamin ve mineral açısından zengin içeriklerle
            performansınızı destekleyecek en kaliteli ürünleri değerli
            müşterilerimize sunuyoruz.
          </Typography>
          <Typography variant="body1" paragraph>
            Sadece ürünlerimizle değil, aynı zamanda spor, diyet ve wellness
            hizmetleri sunarak, daha sağlıklı ve güvenli bir yaşam tarzı
            geliştirmek ve yenilikçi çözümlerle desteklemek amacıyla deneyimli
            ve uzman diyetisyenler, fitness antrenörleri ve wellness koçları ile
            yanınızdayız.
          </Typography>
          <Typography variant="body1" paragraph>
            Evde sağlıklı yaşamı kolaylaştıran ürünlerimizle, üstün müşteri
            hizmetlerimizle değer veriyoruz. Siz de her an performansınızı en
            üst düzeye çıkararak ve sağlıklı yaşamı destekleyerek 1.000.000’dan
            fazla mutlu müşterimiz arasına katılabilirsiniz.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b> 1.000.000+ den Fazla Mutlu Müşteri</b>
          </Typography>
          <Typography variant="body1" paragraph>
            Sunduğumuz yenilikçi ürünler, müşteri odaklı hizmetler ve uygun
            fiyatlarla her alanda sağlıklı yaşamı ve beraberinde başardığımız
            1.000.000’den fazla kişiye ulaştık.
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>Sertifikalarımız</b>
          </Typography>
        </Box>
        <Box m={5}>
          <Grid container spacing={2} justifyContent="start">
            <Grid item>
              <IsoIcon />
            </Grid>
            <Grid item>
              <IsoIcon />
            </Grid>
            <Grid item>
              <IsoIcon />
            </Grid>
            <Grid item>
              <GmpIcon />
            </Grid>
            <Grid item>
              <HappyIcon />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <div>
      </div>
    </div>
  );
};

export default About;