export const BASE_URL = 'http://localhost:3000/api';

export const endpoints = {
    address: `${BASE_URL}/address`,
    auth: {
        register: `${BASE_URL}/auth/register`,
        login: `${BASE_URL}/auth/login`,
        me: `${BASE_URL}/auth/me`,
        verifyEmail: '${BASE_URL}/auth/verifyemail', // Endpoint doğru düzenlendi
    },
    category: `${BASE_URL}/category`,
    user: `${BASE_URL}/user`,
    product: `${BASE_URL}/product`,
    review: `${BASE_URL}/review`,
    order: `${BASE_URL}/order`,
    orderUser: `${BASE_URL}/order/user`,
    orderItem: `${BASE_URL}/orderItem`,
    payment: {
        base: `${BASE_URL}/payment`,
        stripe: `${BASE_URL}/payment/stripe`
      },
    priceInfo: `${BASE_URL}/priceInfo`,
};