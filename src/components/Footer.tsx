import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Rango Goiano</h3>
            <p className="text-gray-400">
              O melhor da culinária goiana em forma de hambúrguer artesanal.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#cardapio" className="text-gray-400 hover:text-white transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#promocoes" className="text-gray-400 hover:text-white transition-colors">
                  Promoções
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
            <p className="text-gray-400 mb-2">
              Acompanhe nossas redes sociais para novidades e promoções exclusivas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Rango Goiano. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}