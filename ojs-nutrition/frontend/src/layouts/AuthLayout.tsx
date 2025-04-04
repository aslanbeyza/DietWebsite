// src/layouts/AuthLayout.tsx
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
};

export default AuthLayout;
