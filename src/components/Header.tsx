import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Promoções', href: '#promocoes' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">Rango Goiano</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6 text-red-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onCartClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-gray-700 hover:text-red-600"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrinho
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}