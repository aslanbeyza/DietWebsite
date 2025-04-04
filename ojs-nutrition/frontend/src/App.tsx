import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from './context/UserContext';



// Stripe'ı yükle


function App() {
  return (
    <>
      <UserProvider>
      <BrowserRouter>
      <ToastContainer /> 
        <AppRouter />
      </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;