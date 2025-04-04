import { Box, Typography } from '@mui/material';
import { useShoppingCart } from '../context/ShoppingCartContext';
import VerticalLinearStepper from '../components/Payment/Step';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '../context/UserContext';

const stripePromise = loadStripe('pk_test_51QTrHhDmeOtxZbxLePXbArIebDdEzT73dIYapUKq3c8mC7arpsczwVcnTFwrdCv6DdQawCSj4ZHx6jj955e4vkXy00vBtnzPYl');

const Payment = () => {
  const { cartItems, getTotalPrice } = useShoppingCart();
  const totalPrice = getTotalPrice();
  const { user } = useUser();

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      gap: 2,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
    }}>
      {/* Sol Panel - Stepper */}
      <Box sx={{
  flex: '1', 
  backgroundColor: 'white',
  m: 3,
  display: 'flex',
  flexDirection: 'column',
}}>
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    mb: 4,
    pb: 2,
  }}>
    <img src="../../public/assets/blacklogo.png" alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Typography variant="h6">
        {user?.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.875rem' }}>
        {user?.email}
      </Typography>
    </Box>
  </Box>

  <Elements
    stripe={stripePromise}
    options={{
      mode: 'payment',
      amount: totalPrice * 100,
      currency: 'try',
    }}
  >
    <VerticalLinearStepper />
  </Elements>
</Box>




      {/* Sağ Panel - Sipariş Özeti */}
      <Box sx={{
        flex: '1', // Bu panelin genişliği %50 olacak şekilde ayarlandı
        backgroundColor: '#e1e9f0',
        px: 3,
        position: 'sticky',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Ürün listesi */}
        <Box sx={{ mb: 4 }}>
          {cartItems.map((item) => (
            <Box
              key={item.variantId}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.photo_src}
                    alt={item.name}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 10,
                      borderRadius: '4px',
                      objectFit: 'cover',
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quantity} adet
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>
                  {(item.price * item.quantity).toFixed(2)} TL
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Fiyat detayları */}
        <Box sx={{
          pt: 2,
          mt: 2,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary">Ara Toplam</Typography>
            <Typography>{totalPrice.toFixed(2)} TL</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary">Kargo</Typography>
            <Typography color="success.main">Ücretsiz</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            pt: 2,
            borderTop: '1px dashed #e0e0e0'
          }}>
            <Typography variant="h6">Toplam</Typography>
            <Typography variant="h6" color="primary">
              {totalPrice.toFixed(2)} TL
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Payment;