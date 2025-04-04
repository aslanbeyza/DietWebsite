import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
const Contact = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5} mb={5}>
          <Typography variant="h4" component="h1" gutterBottom sx={{border:'3px', fontWeight:'bold'}}>
            Bize Ulaşın
          </Typography>
          <Typography variant="body1" gutterBottom textAlign={"left"}>
            Bize aşağıdaki iletişim ulaşabilirsiniz.
          </Typography>
        </Box>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                placeholder="İsim"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: '#F7F7F7',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E5E5', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor:'#E5E5E5', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:'#E5E5E5', // Border color when focused
                    },
                    '&.Mui-error fieldset': {
                      borderColor: '#f44336', // Border color when error
                    },
                  },
                }}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Soyad"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: '#F7F7F7',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E5E5', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor:'#E5E5E5', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:'#E5E5E5', // Border color when focused
                    },
                    '&.Mui-error fieldset': {
                      borderColor: '#f44336', // Border color when error
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="E-Posta"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: '#F7F7F7',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E5E5', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor:'#E5E5E5', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:'#E5E5E5', // Border color when focused
                    },
                    '&.Mui-error fieldset': {
                      borderColor: '#f44336', // Border color when error
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Mesaj"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                sx={{
                  backgroundColor: '#F7F7F7',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E5E5', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor:'#E5E5E5', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor:'#E5E5E5', // Border color when focused
                    },
                    '&.Mui-error fieldset': {
                      borderColor: '#f44336', // Border color when error
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3} >
            <Button variant="contained"  sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblack' } }} >
              GÖNDER
            </Button>
          </Box>
        </Box>
        <Box textAlign="left" mt={5}>
          <Typography variant="body2">
            *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00’a kadar verilen siparişler için geçerlidir.
            Siparişler kargoya verilince e-posta ve sms ile bilgilendirme yapılır.
          </Typography>
          <Typography variant="body2" my={6}>
            Telefon ile <b>0850 303 28 89</b> numarasını arayarak da bizlere sesli mesaj bırakabilirsiniz. Sesli mesajlarınıza hafta içi saat <b>09:00-17:00 </b>arasında dönüş sağlanmaktadır.
          </Typography>
        </Box>
      </Container>
     
    </div>
  );
}

export default Contact;