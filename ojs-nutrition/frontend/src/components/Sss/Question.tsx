import React, { useState } from 'react';
import {
  AppBar, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails,
  TextField, Button, Container, Typography, Box
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container sx={{ margin: 2 }}>
          {children}
        </Container>
      )}
    </div>
  );
}

const Question: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const faqs = [
    "OJS Nutrition ürünlerinin menşei neresi?",
    "Hangi sertifikalarınız var?",
    "Satılan ürünler garantili midir? Değişim var mı?",
    "Sipariş verirken sorun yaşıyorum, ne yapmam gerekir?",
    "OJS Nutrition ürünlerini nereden satın alayım?",
    "Yüksek proteinli ürünleri kimler kullanabilir?",
    "Taksit seçeneği neden yok?",
    "Siparişimi nasıl iptal edebilirim?",
    "Kapıda ödemek kolay mı?",
    "Satın aldığınız ürünler iade edilebilir mi?",
    "Kapıda ödeme var mı?",
    "Sipariş verirken nelere dikkat etmeliyim?",
    "Kapıda ödeme hizmetiniz var mı?",
    "Sipariş teslimatı nasıl yapılabilir?",
    "Lojistik ve kargo maliyetleri toplam hesaba ne zaman eklenir?"
  ];

  return (
    <Container sx={{ marginTop: 4 }}>
      <AppBar position="static" sx={{ marginBottom: 4, backgroundColor:'transparent' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
         sx={{color:"black"}}          
        >
          <Tab label="Genel" sx={{ textTransform: 'none' }} />
          <Tab label="Ürünler" sx={{ textTransform: 'none' }} />
          <Tab label="Kargo" sx={{ textTransform: 'none' }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: -.5 }}>
            <AccordionSummary
              expandIcon={<AddBoxOutlinedIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{faq}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Cevap burada.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Ürünler</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Kargo</Typography>
      </TabPanel>
      <Box 
      ml={25}
        component="form"
        sx={{
          width:'700px',
          display:'flex',
          
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
         
          marginTop: 4,
          '& .MuiTextField-root': { marginBottom: 2 },
          '& .MuiButton-root': { marginTop: 2 }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField fullWidth label="İsim" required variant="outlined" />
        <TextField fullWidth label="E-posta" required variant="outlined" />
        <TextField fullWidth label="Mesaj" required variant="outlined" multiline rows={4} />
        <Button variant="contained" color="primary" type="submit" sx={{textAlign:'center', marginBottom:'30px'}} >
          Gönder
        </Button>
      </Box>
    </Container>
  );
};

export default Question;