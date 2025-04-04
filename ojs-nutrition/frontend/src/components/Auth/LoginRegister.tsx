// src/pages/auth/LoginRegister.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { login, register, verifyEmail } from "../../services/authService";
import "./style.css";
import { User } from "../../types/User";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

const initialFormData: FormData = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  role: "user",
};

const LoginRegister: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // E-posta doğrulandıysa bildirim göster
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      toast.success(
        "E-posta başarıyla doğrulandı! Şimdi giriş yapabilirsiniz."
      );
    }
  }, [location]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError("");
    setFormData(initialFormData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Kayıt için gönderilen veriler:", formData);
    try {
      const response = await register(formData as unknown as User);
      console.log("Sunucudan gelen tam yanıt:", response.data);
      toast.success(
        "Kayıt başarılı! E-postanızı kontrol edin ve doğrulama linkine tıklayın.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast", // Özel class adı
          bodyClassName: "custom-toast-body",
        }
      );

      navigate("/login");
      setTabValue(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Kayıt başarısız! Lütfen tekrar deneyin"
      );
      console.error("Kayıt hatası:", error);
      console.error("Hata yanıtı:", error.response);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      Cookies.set("x-auth-token", response?.data?.token);
      try {
        await verifyEmail(response?.data?.token);
        toast.success("Token başarıyla doğrulandı!");
      } catch (error) {
        console.error("Doğrulama hatası:", error);
        toast.error("E mail doğrulaması başarısız oldu.");
      }

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Giriş sırasında bir hata oluştu"
      );
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="login-register-container"
      sx={{
        width: { xs: "90%", sm: "60%", md: "60%" },
        marginTop: { xs: "20px", sm: "110px", md: "110px" },
      }}
    >
      <Box
        className="tabs-container"
        sx={{ position: "relative", padding: 0, margin: 0 }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          sx={{
            position: "absolute",
            top: -64,
            width: "100%",
            borderBottom: "none",
          }}
        >
          <Tab
            sx={{
              textTransform: "none",
              border: "2px solid #F3F3F3",
              flexGrow: 1,
              marginRight: 2,
            }}
            label="Giriş Yap"
            className={`${tabValue === 0 ? "tab-selected" : "tab"}`}
          />
          <Tab
            sx={{
              textTransform: "none",
              border: "1px solid #F3F3F3",
              flexGrow: 1,
            }}
            label="Üye Ol"
            className={`${tabValue === 1 ? "tab-selected" : "tab"}`}
          />
        </Tabs>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={3} className="form-container">
        {tabValue === 0 ? (
          <LoginForm
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
          />
        ) : (
          <RegisterForm
            handleInputChange={handleInputChange}
            handleRegister={handleRegister}
          />
        )}
      </Grid>
    </Container>
  );
};

interface LoginFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleInputChange,
  handleLogin,
}) => {
  const textFieldStyle = {
    backgroundColor: "#F7F7F7",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#E5E5E5" },
    },
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ marginY: "8px", fontWeight: "500", color: "#222222" }}
        >
          *E-Posta
        </Typography>
        <TextField
          fullWidth
          name="email"
          variant="outlined"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ marginY: "8px", fontWeight: "500", color: "#222222" }}
        >
          *Şifre
        </Typography>
        <TextField
          fullWidth
          name="password"
          type="password"
          variant="outlined"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} textAlign="right">
        <Button
          variant="text"
          sx={{
            textUnderlineOffset: "4px",
            textTransform: "none",
            textDecoration: "underline",
            color: "#000000",
            "&:hover": {
              color: "#000000",
              textDecoration: "underline",
            },
          }}
        >
          Şifremi Unuttum?
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#000000",
            color: "white",
            height: "55px",
            "&:hover": {
              backgroundColor: "#000000",
            },
          }}
        >
          GİRİŞ YAP
        </Button>
      </Grid>
    </>
  );
};

interface RegisterFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleInputChange,
  handleRegister,
}) => {
  const textFieldStyle = {
    backgroundColor: "#F7F7F7",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#E5E5E5" },
    },
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "500", color: "#222222", marginY: "8px" }}
        >
          Ad
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="name"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "500", color: "#222222", marginY: "8px" }}
        >
          Soyad
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="last_name"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "500", color: "#222222", marginY: "8px" }}
        >
          E-Posta
        </Typography>
        <TextField
          fullWidth
          name="email"
          variant="outlined"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "500", color: "#222222", marginY: "8px" }}
        >
          Şifre
        </Typography>
        <TextField
          fullWidth
          name="password"
          type="password"
          variant="outlined"
          onChange={handleInputChange}
          sx={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleRegister}
          sx={{
            backgroundColor: "#000000",
            color: "white",
            height: "55px",
            "&:hover": {
              backgroundColor: "#000000",
            },
          }}
        >
          ÜYE OL
        </Button>
        <Typography variant="body1" sx={{ marginY: "18px" }}>
          Zaten hesabınız var mı?{" "}
          <Link
            to="/login"
            style={{
              color: "#8421ab",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Giriş Yap
          </Link>
        </Typography>
      </Grid>
    </>
  );
};
export default LoginRegister;