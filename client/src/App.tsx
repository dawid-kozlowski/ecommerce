
import Header from './components/Header';
import ProductListing from './components/ProductListing';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div>

        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Header />
          <ProductListing />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;

