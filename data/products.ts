export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
    { 
        id: 1, 
        name: "Áo Thun Nam Basic", 
        price: 250000, 
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
        description: "Áo thun nam chất liệu cotton 100% thông thoáng, thấm hút mồ hôi cực tốt, kiểu dáng basic dễ phối đồ."
    },
    { 
        id: 2, 
        name: "Giày Thể Thao Nam", 
        price: 850000, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        description: "Giày thể thao năng động, thiết kế ôm chân, đế êm ái thích hợp cho việc chạy bộ hoặc đi chơi hàng ngày."
    },
    { 
        id: 3, 
        name: "Balo Thời Trang", 
        price: 450000, 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
        description: "Balo thời trang đa năng, chống thấm nước nhẹ, nhiều ngăn tiện lợi đựng laptop và đồ dùng cá nhân."
    },
    { 
        id: 4, 
        name: "Mũ Lưỡi Trai Nam Nữ", 
        price: 150000, 
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60",
        description: "Mũ lưỡi trai phong cách trẻ trung, chất liệu kaki thoáng mát, dễ dàng điều chỉnh kích thước."
    }
];