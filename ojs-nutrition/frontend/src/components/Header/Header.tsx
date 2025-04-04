import React, { useState } from "react";
import {AppBar,Toolbar,InputBase,IconButton,Box,Button,Menu,MenuItem,Typography,Drawer,List,ListItem,ListItemText} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useShoppingCart } from '../../context/ShoppingCartContext';
import SearchResultsModal from './SearchResultModal';
import {useEffect} from 'react';
import useDebounce from '../../hooks/useDebounce';
import {useRef} from 'react';
import { searchProducts } from '../../services/productService';
import { useUser } from '../../context/UserContext';

const categories = [
  { id: 1, name: "PROTEİN", title: "protein" },
  { id: 2, name: "SPOR GIDALARI", title: "spor-gidalari" },
  { id: 3, name: "KARBONHİDRATLAR", title: "karbonhidrat" },
  { id: 4, name: "GIDA", title: "gida" },
  { id: 5, name: "SAĞLIK", title: "saglik" },
  { id: 6, name: "VİTAMİN", title: "vitamin" },
  { id: 7, name: "TÜM ÜRÜNLER", title: "all-products" },
];

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    padding: "0px",
    background: "red",
  },
}));

const Logo = styled("img")({
  width: "100%",
});

const Header: React.FC = () => {
  const { cartQuantity, setIsOpen } = useShoppingCart();
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Arama terimi değiştiğinde otomatik arama
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.trim()) {
        try {
          const results = await searchProducts(debouncedSearchTerm);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Arama sırasında hata oluştu:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenu(event.currentTarget);
  };



  const handleClose = () => {
    setAccountMenu(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    setUser(null); // Kullanıcı çıkış yaptığında UserContext sıfırlanır
    setAccountMenu(null);
  };


  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
          height: { xs: "auto", sm: "175px", md: "169px" },
          background: "#fff",

        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: 0,
          }}
        >
          <Box
            sx={{
              flexDirection: { xs: "column", sm: "row", md: "row" },
              display: "flex",
              justifyContent: {
                xs: "space-around",
                sm: "space-between",
                md: "space-between",
              },
              width: { xs: "88%", sm: "80%", md: "80%" },
              alignItems: "center",
              mb: { xs: "0px", sm: "20px", md: "20px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: { xs: "120%", sm: "15%", md: "15%" },
                marginTop: { xs: "5%", sm: "0", md: "0" },
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{ display: { xs: "flex", sm: "none", md: "none" } }}
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}> <Logo
                src="/assets/blacklogo.png"
                alt="Logo"
                sx={{
                  width: { xs: "100px", sm: "150%", md: "120%" },
                  marginLeft: { xs: "0", sm: "-80px", md: "0" },
                }}
              /></Link>
             
              <Box
                sx={{
                  display: { xs: "flex", sm: "none", md: "none" },
                  alignItems: "center",
                  width: { xs: "0", sm: "15%", md: "15%" },
                }}
              >
                <StyledBadge badgeContent={1} color="secondary">
                  <ShoppingCartIcon sx={{ color: "black" }} />
                </StyledBadge>
              </Box>
            </Box>
            {/* Wrapper for Search Bar */}
            <Box
             ref={searchContainerRef}
              sx={{
                width: { xs: "100%", sm: "35%", md: "40%" },
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: { xs: "25px", sm: "0", md: "0" },
                mb: { xs: "10px", sm: "0", md: "0" },
              }}
            >
              <Box
                sx={{
                  borderRadius: { xs: "100px", sm: "4px", md: "4px" },
                  display: "flex",
                  width: { xs: "100%", sm: "100%", md: "100%" },
                  border: {
                    xs: "none",
                    sm: "2px solid #a9a2a2",
                    md: "2px solid #a9a2a2",
                  },
                  backgroundColor: { xs: "#F3F3F3", sm: "#fff", md: "#fff" },
                  overflow: "hidden",
                }}
              >
                <InputBase
                  sx={{
                    "&::placeholder": {
                      fontSize: { xs: "0", sm: "14px", md: "16px" }, // Ekran boyutuna göre font boyutu
                    },
                    flex: 1,
                    paddingLeft: "8px",
                    height: "45px",
                  }}
                  placeholder="Aradığınız ürünü yazınız"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
              onChange={handleSearchChange}
                />
          {/* Arama Sonuçları Modal'ı */}
            {showResults && (
              <SearchResultsModal
                results={searchResults}
                searchTerm={searchTerm}
                onClose={() => setShowResults(false)}
              />
            )}
                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "100%", sm: "0px", md: "20%" },
                    backgroundColor: "#919191",
                    height: "45px",
                    display: { xs: "none", sm: "flex", md: "flex" },
                    borderRadius: { xs: "100px", sm: "4px", md: "0px" },
                  }}
                >
                  ARA
                </Button>
              </Box>
            </Box>
            {/* Wrapper for Account and Cart Buttons */}
            <Box
              sx={{
                width: { xs: "100%", sm: "auto", md: "auto" },
                display: { xs: "none", sm: "flex", md: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
                gap: { xs: "10px", sm: "15px", md: "15px" },
                flexWrap: "nowrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<PersonOutlineOutlinedIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
                sx={{
                  color: "#919191",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  height: "46px",
                  minWidth: "125px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Hesap
              </Button>
              <Menu
        anchorEl={accountMenu}
        open={Boolean(accountMenu)}
        onClose={handleClose}
      >
        {user ? ( // Kullanıcı giriş yaptıysa
          <>
            <MenuItem onClick={handleClose}><Link to='/account' style={{ textDecoration: "none", color: "inherit" }}>Hesabım</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/account' style={{ textDecoration: "none", color: "inherit" }}>Siparişlerim</Link></MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            <Link to='/login' style={{ textDecoration: "none", color: "inherit" }}>Çıkış Yap</Link>
            </MenuItem>
          </>
        ) : ( //  Kullanıcı giriş yapmadıysa
          <>
            <MenuItem onClick={handleClose}><Link to='/login' style={{ textDecoration: "none", color: "inherit" }}>Giriş Yap</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/login' style={{ textDecoration: "none", color: "inherit" }}>Üye Ol</Link></MenuItem>
          </>
        )}
      </Menu>

              <Button
                onClick={() => setIsOpen(true)}
                variant="contained"
                sx={{
                  backgroundColor: "#919191",
                  color: "#fff",
                  textTransform: "none",
                  height: "46px",
                  minWidth: "115px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  padding: "0 12px",
                }}
              >
                <StyledBadge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCartIcon>{cartQuantity}</ShoppingCartIcon>
                </StyledBadge>
                <Typography sx={{ ml: 1 }}>SEPET</Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
        <Box sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#333",
              padding: "10px 0",
              justifyContent: "space-evenly",
              "& a": { color: "white", textDecoration: "none" },
              "& a:hover": { textDecoration: "underline" },
            }}
          >
           {categories.map((category) => (
              <Link
                key={category.id}
                to={`/${category.title}`} // Dinamik URL'ye yönlendirme
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {category.name}
              </Link>
            ))}
          </Box>
        </Box>
      </AppBar>
      {/* Mobil Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          display: { xs: "block", sm: "none", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "320px",
            height: "calc(100% - 120px)", // Belirli bir yüksekliği tanımlar
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Üst ve alt container'ları ayırmak için
          },
        }}
      >
        {/* Üst Kısım: Kategori Listesi */}
        <Box sx={{ flex: "1", backgroundColor: "#fff", overflowY: "auto" }}>
          <List>
            <ListItem>
              <ListItemText primary="PROTEİN" />
              <Typography sx={{ color: "black", fontSize: "20px" }}>
                <ArrowForwardIosIcon />
              </Typography>{" "}
              {/* Kırmızı renkte > ikonu */}
            </ListItem>
            <ListItem>
              <ListItemText primary="SPOR GIDALARI" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="SAĞLIK" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="GIDA" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="VİTAMİN" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="TÜM ÜRÜNLER" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
export default Header;
