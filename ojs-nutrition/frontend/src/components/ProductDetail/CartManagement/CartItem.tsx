import { Box, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { useShoppingCart } from '../../../context/ShoppingCartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const {removeFromCart, increaseCartAmount, decreaseCartAmount } = useShoppingCart();

  const createCartItemData = (): CartItemType => ({
    id: item.id,
    variantId: item.variantId,
    quantity: 1,
    name: item.name,
    photo_src: item.photo_src,
    price: item.price,
    flavor: item.flavor,
    size: item.size,
  });

  const handleDecrease = () => {
    const cartItemData = createCartItemData();
    decreaseCartAmount(cartItemData);
  };

  const handleIncrease = () => {
    const cartItemData = createCartItemData();
    increaseCartAmount(cartItemData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        background:'#F7F7F7'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          src={item.photo_src}
          alt={item.name}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'fill',
          }}
        />

        <Box>
          <Typography fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.flavor} {item.size}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #eee',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <IconButton
            size="small"
            onClick={handleDecrease}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ px: 2 }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={handleIncrease}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Typography fontWeight="bold">
          {(item.price * item.quantity).toFixed(2)}TL
        </Typography>

        <IconButton
          onClick={() => removeFromCart(item.variantId)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
    
      </Box>
    </Box>
  );
};