import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddressForm from "./AddressForm";
import { Address } from '../../types/Address';
import { useAddress } from '../../context/AddressContext';

const AddressList = () => {
  const { 
    addresses, 
    loading, 
    fetchAddresses, 
    removeAddress, 
    updateExistingAddress 
  } = useAddress();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleDeleteAddress = async (id: number) => {
    await removeAddress(id);
  };

  const handleAddressEdit = (address: Address) => {
    setSelectedAddress(address);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedAddress(null);
    setIsEditing(false);
  };

  const handleUpdateAddress = async (updatedAddress: Address) => {
    if (selectedAddress?.id) {
      await updateExistingAddress(selectedAddress.id, updatedAddress);
      setIsEditing(false);
      setSelectedAddress(null);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  if (addresses.length === 0) {
    return <AddressForm />;
  }

  if (isEditing) {
    return (
      <AddressForm 
        initialAddress={selectedAddress!} 
        onSubmit={handleUpdateAddress}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Adreslerim
      </Typography>
      <Grid container sx={{ m: 4 }}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 300,
                mt: 2,
                mb: 2,
                mx: "auto",
                border: "1px solid #000",
                margin: "4px",
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  <Box>{address.address_line1}</Box>
                  <Box my={2}>{address.address_line2 && <>{address.address_line2}</>}</Box>
                  <Box my={2}>{address.state}, {address.city}</Box>
                  <Box my={2}>
                    {address.postal_code} {address.country}
                  </Box>
                </Typography>
              </CardContent>
              <Grid container justifyContent="space-between" sx={{ pb: 2, px: 1 }}>
                <Grid item>
                  <Button
                    onClick={() => handleDeleteAddress(address.id!)}
                    variant="text"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ color: "black" }}
                  >
                    Sil
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => handleAddressEdit(address)}
                    variant="text"
                    size="small"
                    sx={{ color: "black" }}
                  >
                    Adresi Düzenle
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddressList;