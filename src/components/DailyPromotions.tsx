import { Tag } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import type { DailyPromotion } from '../types';
import { dailyPromotions } from '../data/products'; // Certifique-se de que o caminho está correto

interface DailyPromotionsProps {
  promotions: DailyPromotion[];
  onAddToCart: (item: DailyPromotion) => void;
}

export function DailyPromotions({ promotions = dailyPromotions, onAddToCart }: DailyPromotionsProps) {
  return (
    <section id="promocoes" className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Promoções do Dia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map(promo => (
            <div
              key={promo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={promo.image}
                alt={promo.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {promo.name}
                </h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {formatCurrency(promo.price)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(promo.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center text-green-600 mt-1">
                      <Tag className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        Economia de {formatCurrency(promo.originalPrice - promo.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(promo)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}