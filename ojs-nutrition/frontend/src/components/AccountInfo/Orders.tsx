import {Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";
import { Order } from "../../types/Order";



const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      console.log("Gelen Siparişler:", response); 
      setOrders(response);
      console.log("first ordesdsr", response);
    };
    fetchOrders();
  }, []);
    

  return (
    <Grid container spacing={2}>
    {orders?.map((order) => (
      <Grid item xs={12} key={order.id}>
        <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #E5E5E5", paddingBottom: 2, marginBottom: 2 }}>
          <Box component="img" src={order.imageUrl} sx={{ width: 50, height: 50, marginRight: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="textSecondary">{order.createdAt} Tarihinde Sipariş Verildi</Typography>
            <Typography variant="body2" color="textSecondary">{order.id} numaralı sipariş</Typography>
          </Box>
          <Button variant="outlined">Detay Görüntüle</Button>
        </Box>
      </Grid>
    ))}
  </Grid>
  
  );
};

export default Orders;