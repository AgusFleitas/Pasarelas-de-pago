import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Landing from "./views/Landing.jsx";
import PayCart from "./views/PayCart.jsx";
import PaySuccess from "./views/PaySuccess.jsx";
import PayPending from "./views/PayPending.jsx";
import PayFailed from "./views/PayFailed.jsx";

import "./App.css";
import { CartProvider } from "./context/cart.jsx";

function App() {
  return (
    <CartProvider>
        <Header />
      <main className='grid items-center px-44 pt-8'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/pay-cart' element={<PayCart />} />
          <Route path='/payment-success' element={<PaySuccess />} />
          <Route path='/payment-pending' element={<PayPending />} />
          <Route path='/payment-failed' element={<PayFailed />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
