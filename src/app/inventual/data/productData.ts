export interface ProductInterfaceData {
    id: any;
    image: string;
    name: string;
    code: number;
    category: string;
    subCategory: string;
    brand: string;
    unit: string;
    variant: number | string; // It can be a number or a string
    stock: number;
    price: number;
    tax: number;
    discount: number;
    subTotal: number;
    action?: any;
    quantity: any;
    isFeatured?: boolean,
    selected?: boolean,
    type?: any,
  }
  export const productData: ProductInterfaceData[] = [
    {
        id: 1,
        image: '../../../assets/img/product/tab-3.png',
        name: 'Cotton T-shirt',
        code: 875952214,
        category: 'Fashion',
        subCategory: 'Cloth',
        brand: 'Ayam Goreng',
        unit: 'Quantity (q)',
        variant: 3,
        stock: 725,
        price: 200,
        tax: 5,
        discount: 10,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
        isFeatured: true,
    },
    {
        id: 2,
        image: '../../../assets/img/product/tab-8.png',
        name: 'Green Lemon',
        code: 875952215,
        category: 'Food',
        subCategory: 'Food',
        brand: 'Organic Food',
        unit: 'Kilogram (kg)',
        variant: 'N/A',
        stock: 200,
        price: 141,
        tax: 6,
        discount: 8,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 3,
        image: '../../../assets/img/product/tab-7.png',
        name: 'Ladies Bag',
        code: 875952216,
        category: 'Fashion',
        subCategory: 'Bag',
        brand: 'Denim',
        unit: 'Quantity (q)',
        variant: 5,
        stock: 420,
        price: 550,
        tax: 5,
        discount: 7,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 4,
        image: '../../../assets/img/product/tab-4.png',
        name: 'Denim Bag',
        code: 875952217,
        category: 'Fashion',
        subCategory: 'Bag',
        brand: 'Denim',
        unit: 'Quantity (q)',
        variant: 'Red',
        stock: 150,
        price: 120,
        tax: 5,
        discount: 0,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        isFeatured: true,
        type: 'addition',
    },
    {
        id: 5,
        image: '../../../assets/img/product/tab-9.png',
        name: 'Shoe',
        code: 875952218,
        category: 'Fashion',
        subCategory: 'Cloth',
        brand: 'Adidas',
        unit: 'Quantity (q)',
        variant: 2,
        stock: 310,
        price: 800,
        tax: 0,
        discount: 8,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 6,
        image: '../../../assets/img/product/tab-6.png',
        name: 'Fish',
        code: 875952219,
        category: 'Food',
        subCategory: 'Fish',
        brand: 'Organic Food',
        unit: 'Kilogram (kg)',
        variant: 'N/A',
        stock: 300,
        price: 80,
        tax: 6,
        discount: 9,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 7,
        image: '../../../assets/img/product/tab-10.png',
        name: 'Ladies Lipstick',
        code: 875952220,
        category: 'Fashion',
        subCategory: 'Cosmetics',
        brand: 'Denim',
        unit: 'Quantity (q)',
        variant: 4,
        stock: 600,
        price: 350,
        tax: 15,
        discount: 10,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        isFeatured: true,
        type: 'addition',
    },
    {
        id: 8,
        image: '../../../assets/img/product/tab-2.png',
        name: 'Red Fruit',
        code: 875952221,
        category: 'Food',
        subCategory: 'Food',
        brand: 'Organic Food',
        unit: 'Kilogram (kg)',
        variant: 'N/A',
        stock: 200,
        price: 141,
        tax: 5,
        discount: 8,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 9,
        image: '../../../assets/img/product/tab-1.png',
        name: 'Laptop',
        code: 875952222,
        category: 'Accessories',
        subCategory: 'Gadget',
        brand: 'Dell',
        unit: 'Quantity (q)',
        variant: 'N/A',
        stock: 200,
        price: 600,
        tax: 10,
        discount: 12,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 10,
        image: '../../../assets/img/product/tab-11.png',
        name: 'Smart LED TV',
        code: 875952223,
        category: 'Accessories',
        subCategory: 'Gadget',
        brand: 'Dell',
        unit: 'Quantity (q)',
        variant: 'N/A',
        stock: 180,
        price: 150,
        tax: 5,
        discount: 15,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        isFeatured: true,
        type: 'addition',
    },
    {
        id: 11,
        image: '../../../assets/img/product/tab-12.png',
        name: 'Led Bulb',
        code: 875952242,
        category: 'Electronics',
        subCategory: 'Bulb',
        brand: 'Redmi',
        unit: 'Quantity (q)',
        variant: 'N/A',
        stock: 180,
        price: 150,
        tax: 15,
        discount: 10,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
    {
        id: 12,
        image: '../../../assets/img/product/tab-5.png',
        name: 'Smart phone',
        code: 875952367,
        category: 'Accessories',
        subCategory: 'Gadget',
        brand: 'Redmi',
        unit: 'Quantity (q)',
        variant: 'N/A',
        stock: 180,
        price: 150,
        tax: 5,
        discount: 7,
        subTotal: 0,
        action: 'action',
        quantity: 1,
        type: 'addition',
    },
  ];
  