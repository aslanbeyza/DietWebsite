import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: 'PROTEİN', title: 'protein', image: 'assets/Homepage/1.png' },
  { id: 2, name: 'SPOR GIDALARI', title: 'spor-gidalari', image: 'assets/Homepage/2.png' },
  { id: 3, name: 'KARBONHİDRATLAR', title: 'karbonhidrat', image: 'assets/Homepage/3.png' },
  { id: 4, name: 'GIDA', title: 'gida', image: 'assets/Homepage/4.png' },
  { id: 5, name: 'SAĞLIK', title: 'saglik', image: 'assets/Homepage/5.png' },
  { id: 6, name: 'VİTAMİN', title: 'vitamin', image: 'assets/Homepage/6.png' },
];

const CategoryCard = ({ name, title, image }: { id: number; name: string; title: string; image: string }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/${title}`);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        marginTop: '25px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: { xs: '120px', sm: '150px', md: '200px' },
          objectFit: 'fill',
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: { xs: '-45%', sm: '-70px', md: '-21%' },
          left: '65%',
          transform: 'translate(-50%,-50%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
          }}
        >
          {name}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor:'black',
            borderRadius: '10px',
            fontSize: { xs: '10px', sm: '12px', md: '14px' },
            padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
            mb: { xs: '0px', sm: '20px', md: '20px' },
          }}
          onClick={handleViewClick}
        >
          İNCELE
        </Button>
      </CardContent>
    </Card>
  );
};

const CategoriesGrid = () => (
  <Container maxWidth="lg">
    <Grid container spacing={2} mb={6}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={4} key={category.id}>
          <CategoryCard id={category.id} title={category.title} image={category.image} name={category.name} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default CategoriesGrid;