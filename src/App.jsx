import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Landing from "./components/Landing.jsx";
import PaySuccess from "./components/PaySucess.jsx";
import PayPending from "./components/PayPending.jsx";
import PayFailed from "./components/PayFailed.jsx";

import "./App.css";
import { CartProvider } from "./context/cart.jsx";

function App() {
  return (
    <CartProvider>
      <main className='grid justify-center items-center px-44 pt-8'>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/payment-success' element={<PaySuccess />} />
          <Route path='/payment-pending' element={<PayPending />} />
          <Route path='/payment-failed' element={<PayFailed />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
