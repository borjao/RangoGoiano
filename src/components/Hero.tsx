import React from 'react';

export function Hero() {
  return (
    <section id="sobre" className="pt-20 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sabor Autêntico da Culinária Goiana
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Desde 2010, o Rango Goiano tem se dedicado a trazer o melhor da culinária 
              goiana em forma de hambúrgueres artesanais. Nossa história começou com uma 
              receita de família e o sonho de unir o tradicional ao moderno.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoje, somos referência em hambúrgueres artesanais que misturam ingredientes 
              típicos de Goiás, como o pequi, com o clássico hambúrguer americano. Cada 
              hambúrguer é preparado com carne selecionada e ingredientes frescos, 
              garantindo uma experiência única em sabor e qualidade.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1550317138-10000687a72b?w=800"
              alt="Hambúrguer artesanal"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}