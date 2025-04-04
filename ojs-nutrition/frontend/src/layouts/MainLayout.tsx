// src/layouts/MainLayout.tsx
import React from 'react';
import Footer from '../components/Footer/Footer';
import { ShoppingCart } from '../components/ProductDetail/CartManagement/ShoppingCart';
import Header from '../components/Header/Header';




const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header/>
            <ShoppingCart />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
