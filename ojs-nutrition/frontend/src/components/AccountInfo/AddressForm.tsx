import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Button, Grid, TextField } from '@mui/material';
import { User } from "../../types/User";
import { Address } from "../../types/Address";
import { useAddress } from '../../context/AddressContext';
import Cookies from 'js-cookie';
import { getCurrentUser } from '../../services/authService';

interface AddressFormProps {
  initialAddress?: Address;
  onSubmit?: (address: Address) => Promise<void>;
  onCancel?: () => void;
  sx?: object; 
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  initialAddress, 
  onSubmit, 
  sx,
}) => {
  const { addAddress, updateExistingAddress, addresses } = useAddress();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Address>({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Turkey',
    is_primary: false,
    ...(initialAddress || {}),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get('x-auth-token');
        if (token) {
          const currentUser = await getCurrentUser(); 
          setUser(currentUser.id);
          setFormData((prevFormData) => ({
            ...prevFormData,
            UserId: currentUser.user,
          }));
        } else {
          console.error("No token found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!initialAddress) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [initialAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (onSubmit) {
        await onSubmit(formData);
        return;
      }

      if (user) {
        if (initialAddress) {
          await updateExistingAddress(initialAddress.id!, formData);
        } else {
          await addAddress(formData);
        }
        setFormData({
          address_line1: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'Turkey',
          is_primary: false,
          UserId: user.id,
        });
      }
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

/*   if (!user) {
    return (
      <Box>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>Adres Oluştur</Typography>
        <Alert severity="info" sx={{ fontSize: '0.75rem', padding: '6px 12px' }}>
          Adres işlemleri için lütfen giriş yapın.
        </Alert>
      </Box>
    );
  }
 */
  return (
    <Box sx={{ 
      padding: 1, 
      borderRadius: 2, 
      ...sx 
    }}>
      <Typography variant="h6" sx={{ fontSize: '1rem', marginBottom: 1 }}>
        {initialAddress ? 'Adresi Düzenle' : 'Adres Oluştur'}
      </Typography>
      {!initialAddress && addresses.length === 0 && (
        <Alert
          severity="info"
          sx={{ 
            backgroundColor: "#f4f1ff", 
            border: "1px solid #9C27B0",
            fontSize: '0.75rem',
            padding: '6px 12px',
            marginBottom: 1
          }}
        >
          Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres oluşturunuz.
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: "500", 
                color: "#222222", 
                fontSize: '0.75rem',
                marginBottom: 0.5 
              }}
            >
              *Adres Başlığı
            </Typography>
            <TextField
              onChange={handleInputChange}
              fullWidth
              name="address_line1"
              value={formData.address_line1}
              placeholder="ev, iş vb..."
              variant="outlined"
              required
              size="small"
              sx={{
                backgroundColor: "#F7F7F7",
                "& .MuiOutlinedInput-root": {
                  height: '40px',
                  "& input": { 
                    fontSize: '0.75rem',
                    padding: '8px 12px'
                  },
                  "& fieldset": { borderColor: "#E5E5E5" },
                },
              }}
            />
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *Ad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="name"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *Soyad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="lastName"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *Adres
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="address_line2"
                value={formData.address_line2}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *Şehir
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="city"
                value={formData.city}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *İlçe
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="state"
                value={formData.state}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 0.5 }}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ 
                  marginY: "2px", 
                  fontWeight: "500", 
                  color: "#222222", 
                  fontSize: '0.75rem',
                  marginBottom: 0.5 
                }}
              >
                *Telefon
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="phone"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    height: '40px',
                    "& input": { 
                      fontSize: '0.75rem',
                      padding: '8px 12px'
                    },
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box textAlign="right" mt={1}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "black",
                color: "white",
                fontSize: '0.75rem',
                padding: '8px 16px',
                "&:hover": { backgroundColor: "darkblack" },
              }}
            >
              Kaydet
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;