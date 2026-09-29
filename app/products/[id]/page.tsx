'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      const total = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(total);
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm!</h2>
        <Link href="/" className="text-blue-600 hover:underline">← Quay lại trang chủ</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const savedCart = localStorage.getItem('cart');
    let cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cartItems.find((item: any) => item.id === product.id);
    if (existingItem) {
      cartItems = cartItems.map((item: any) => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    const total = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(total);

    alert(`Đã thêm "${product.name}" vào giỏ hàng thành công! 🎉`);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Quay lại trang chủ
          </Link>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
            🛒 Giỏ hàng ({cartCount})
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-xl shadow-md" />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl text-red-600 font-bold mb-4">{product.price.toLocaleString('vi-VN')} đ</p>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}