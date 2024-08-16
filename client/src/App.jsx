import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cart.jsx";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";

import Landing from "./views/Landing.jsx";
import Credentials from "./views/Credentials.jsx";
import PayCart from "./views/PayCart.jsx";
import ConfirmAndPay from "./views/ConfirmAndPay.jsx";
import PaySuccess from "./views/PaySuccess.jsx";
import PayPending from "./views/PayPending.jsx";
import PayFailed from "./views/PayFailed.jsx";
import GetPayment from "./views/GetPayment.jsx";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Layout>
        <Header />
        <main className='grid items-center pb-12 px-6 md:px-12 lg:px-44'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/credentials' element={<Credentials />} />
            <Route path='/pay-cart' element={<PayCart />} />
            <Route path='/confirm-and-pay' element={<ConfirmAndPay />} />
            <Route path='/payment-success' element={<PaySuccess />} />
            <Route path='/payment-pending' element={<PayPending />} />
            <Route path='/payment-failed' element={<PayFailed />} />
            <Route path='/get-payment-info' element={<GetPayment />} />
          </Routes>
        </main>
      </Layout>
    </CartProvider>
  );
}

export default App;
