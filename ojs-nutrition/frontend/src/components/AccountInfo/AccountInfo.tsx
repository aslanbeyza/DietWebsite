
import { SetStateAction, useState } from 'react';
import { Container, Box, Typography, Grid, TextField, Button,MenuItem, Select, InputLabel, FormControl, InputAdornment } from '@mui/material';
import { useUser } from '../../context/UserContext';


const countryOptions = [
  { value: '+90', label: 'Türkiye', code: 'TR' },
  { value: '+1', label: 'Amerika Birleşik Devletleri', code: 'US' },
  { value: '+44', label: 'Birleşik Krallık', code: 'GB' },
  { value: '+33', label: 'Fransa', code: 'FR' },
  { value: '+49', label: 'Almanya', code: 'DE' },
];

const AccountInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0].value);
  const [phone, setPhone] = useState('');
  const { user } = useUser();
 
  const handleCountryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPhone(event.target.value);
  };

  const selectedCountryOption = countryOptions.find(option => option.value === selectedCountry);

  return (
    <Container maxWidth="lg">
        {/* Sağ Panel */}
        <Box sx={{ flex: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Hesap Bilgilerim
          </Typography>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Ad"
                  value={user?.name || ''} // Kullanıcı adı
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: '#F7F7F7',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E5E5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Soyad"
                  variant="outlined"
                  value={user?.lastName || ''}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: '#F7F7F7',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E5E5',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: 2 }}>
                    <InputLabel>Ülke Kodu</InputLabel>
                    <Select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      label="Ülke Kodu"
                      renderValue={() => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                          width='70%'
                            src={`https://flagcdn.com/w20/${selectedCountryOption!.code.toLowerCase()}.png`}
                            alt={selectedCountryOption!.label}
                           
                          />
                        </Box>
                      )}
                      sx={{
                        backgroundColor: '#F7F7F7',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#E5E5E5',
                          },
                          '&:hover fieldset': {
                            borderColor: '#E5E5E5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#E5E5E5',
                          },
                        },
                      }}
                    >
                      {countryOptions.map((country) => (
                        <MenuItem key={country.value} value={country.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                              alt={country.label}
                              style={{ marginRight: 8 }}
                            />
                            {country.label} ({country.value})
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={phone}
                    onChange={handlePhoneChange}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{selectedCountry}</InputAdornment>,
                    }}
                    sx={{
                      backgroundColor: '#F7F7F7',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#E5E5E5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#E5E5E5',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E5E5E5',
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-Posta"
                  variant="outlined"
                  margin="normal"
                  value={user?.email || ''}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    backgroundColor: '#F7F7F7',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#E5E5E5',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E5E5',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box textAlign="right" mt={3}>
              <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', marginBottom: '2rem', '&:hover': { backgroundColor: 'darkblack' } }}>
                Kaydet
              </Button>
            </Box>
          </Box>
        </Box>
    </Container>
  );
};
export default AccountInfo;