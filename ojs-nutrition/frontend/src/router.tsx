import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CategoryProductsPage from './components/Categories/CategoryProductsPage';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { About,Account,Contact,Homepage,Page404,Payment,SSS,Login,ProductList,Detail,} from './pages'; 
import { AddressProvider } from './context/AddressContext';

const AppRouter = () => {
  return (
    //alısveris sepeti artık tumune erişebilir demek bu  
    <ShoppingCartProvider>
      <AddressProvider>
      <Routes>
                <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/login" element={<MainLayout><Login/></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/404" element={<MainLayout><Page404 /></MainLayout>} />
                <Route path="/sss" element={<MainLayout><SSS /></MainLayout>} />
                <Route path="/product/:productId" element={<MainLayout><Detail /></MainLayout>} />
                <Route path="/all-products" element={<MainLayout><ProductList /></MainLayout>} />
                <Route path="/:categoryName" element={<MainLayout><CategoryProductsPage /></MainLayout>} />
                <Route path="*" element={<MainLayout><Page404 /></MainLayout>} /> {/* Catch-all route for 404 */}


      </Routes>
      </AddressProvider>
      </ShoppingCartProvider>
  )
}
export default AppRouter