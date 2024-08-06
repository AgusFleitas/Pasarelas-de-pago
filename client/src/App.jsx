import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cart.jsx";

import Layout from "./components/Layout.jsx";
import Header from "./components/Header.jsx";

import Landing from "./views/Landing.jsx";
import PayCart from "./views/PayCart.jsx";
import ConfirmAndPay from "./views/ConfirmAndPay.jsx";
import PaySuccess from "./views/PaySuccess.jsx";
import PayPending from "./views/PayPending.jsx";
import PayFailed from "./views/PayFailed.jsx";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Layout>
        <Header />
        <main className='grid items-center px-44'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/pay-cart' element={<PayCart />} />
            <Route path='/confirm-and-pay' element={<ConfirmAndPay />} />
            <Route path='/payment-success' element={<PaySuccess />} />
            <Route path='/payment-pending' element={<PayPending />} />
            <Route path='/payment-failed' element={<PayFailed />} />
          </Routes>
        </main>
      </Layout>
    </CartProvider>
  );
}

export default App;
