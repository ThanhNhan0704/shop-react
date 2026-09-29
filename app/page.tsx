'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    loadCartFromStorage();
    window.addEventListener('storage', loadCartFromStorage);
    return () => {
      window.removeEventListener('storage', loadCartFromStorage);
    };
  }, []);

  const updateCartAndStorage = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // Chặn chuyển trang khi bấm nút thêm vào giỏ
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    updateCartAndStorage(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCartAndStorage(updatedCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    alert("Thanh toán thành công! Cảm ơn bạn 🎉");
    updateCartAndStorage([]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyShop.Portfolio</h1>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
            🛒 Giỏ hàng (<span>{totalCount}</span>)
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Sản phẩm nổi bật</h2>
          
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="🔍 Tìm kiếm sản phẩm..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500 col-span-2 text-center py-8">Không tìm thấy sản phẩm phù hợp.</p>
            ) : (
              filteredProducts.map(product => (
                <Link href={`/products/${product.id}`} key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                  <div>
                    <img src={product.image} alt={product.name} className="w-full h-52 object-cover rounded-lg mb-4 group-hover:opacity-90 transition" />
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition">{product.name}</h3>
                    <p className="text-red-600 font-bold mt-2">{product.price.toLocaleString('vi-VN')} đ</p>
                  </div>
                  <button 
                    onClick={(e) => addToCart(product, e)}
                    className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">Giỏ hàng đang trống.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3">
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.price.toLocaleString('vi-VN')} đ x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer">Xóa</button>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-6">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="text-red-600 font-bold text-lg">{totalPrice.toLocaleString('vi-VN')} đ</span>
          </div>
          <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer">
            Thanh toán ngay
          </button>
        </div>
      </main>
    </div>
  );
}