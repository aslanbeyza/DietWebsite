import React, { useState } from "react";
import {
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Address } from "../../types/Address";
import { useAddress } from "../../context/AddressContext";
import AddressForm from "../AccountInfo/AddressForm";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
interface AddressSelectionProps {
  onAddressSelect?: (address: Address) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ onAddressSelect }) => {
  const {
    addresses,
    addAddress,
    selectAddress,
    selectedAddress,
  } = useAddress();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const addressId = Number(event.target.value);
    if (addressId === -1) {
      setShowAddressForm(true);
    } else {
      setShowAddressForm(false);
      const address = addresses.find((addr) => addr.id === addressId);
      if (address) {
        selectAddress(address);
      }
    }
  };

  const handleNewAddressSubmit = async (newAddress: Address) => {
    try {
      const createdAddress = await addAddress(newAddress);
      setShowAddressForm(false);
      if (onAddressSelect) {
        onAddressSelect(createdAddress);
      }
    } catch (error) {
      console.error("Error adding address", error);
    }
  };

  const handleProceed = () => {
    if (selectedAddress && onAddressSelect) {
      onAddressSelect(selectedAddress);
    }
  };



  return (
    <Box sx={{ paddingX: 3, paddingY: 2, maxWidth: "600px", margin: "0 auto" }}>
      <RadioGroup
        value={showAddressForm ? -1 : selectedAddress?.id || ""}
        onChange={handleAddressChange}
        sx={{ mt: 2 }}
      >
        {addresses.map((address) => (
          <FormControlLabel
            key={address.id}
            value={address.id}
            control={<Checkbox checked={selectedAddress?.id === address.id} icon={<CheckCircleIcon />} />}
            label={`${address.address_line1}, ${address.city}, ${address.state}`}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          />
        ))}

        <FormControlLabel
          value={-1}
          control={<Checkbox checked={showAddressForm} icon={<CheckCircleIcon />} />}
          label="Yeni Adres Ekle"
        />
        <Button
          variant="outlined"
          onClick={() => setShowAddressForm(true)}
          sx={{ color: "black", borderColor: "black", fontSize: "0.875rem", mt: 1 }}
        >
          Yeni Adres Ekle
        </Button>
      </RadioGroup>

      {showAddressForm && (
        <AddressForm
          onSubmit={handleNewAddressSubmit}
          onCancel={() => setShowAddressForm(false)}
          sx={{
            width: "100%",
            margin: "1rem auto",
            border: "1px solid #ccc",
            padding: "1rem",
            background:'#f9f9f9',
            borderRadius: "8px",
          }}
        />
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={handleProceed}
          disabled={!selectedAddress && !showAddressForm}
          sx={{
            backgroundColor: "black",
            color: "white",
            fontSize: "0.875rem",
            "&:disabled": {
              backgroundColor: "#e0e0e0",
              color: "#a0a0a0",
            },
          }}
        >
          Devam Et
        </Button>
      </Box>
    </Box>
  );
};

export default AddressSelection;