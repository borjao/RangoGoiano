export const products = [
  {
    id: 1,
    name: "X-Tudo Goiano",
    description: "Hambúrguer artesanal, queijo, presunto, bacon, ovo, alface, tomate e molho especial",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    category: "burgers"
  },
  {
    id: 2,
    name: "X-Pequi",
    description: "Hambúrguer artesanal, queijo, pequi, bacon e molho especial",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500",
    category: "burgers"
  },
  {
    id: 3,
    name: "Batata Frita",
    description: "Porção de batatas fritas crocantes com sal e orégano",
    price: 19.90,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500",
    category: "sides"
  },
  {
    id: 4,
    name: "Refrigerante",
    description: "Coca-Cola, Guaraná ou Fanta (350ml)",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500",
    category: "drinks"
  },
] as const;

export const combos = [
  {
    id: 'combo1',
    name: "Combo Goiano",
    description: "X-Tudo Goiano + Batata Frita + Refrigerante",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500",
    savings: 5.80
  },
  {
    id: 'combo2',
    name: "Combo Pequi",
    description: "X-Pequi + Batata Frita + Refrigerante",
    price: 56.90,
    image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=500",
    savings: 5.80
  }
] as const;
