import React from 'react';
import { combos } from '../data/products';
import { Tag } from 'lucide-react';

export function ComboSection() {
  return (
    <section id="promocoes" className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Combos Especiais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map(combo => (
            <div
              key={combo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={combo.image}
                alt={combo.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {combo.name}
                </h3>
                <p className="text-gray-600 mb-4">{combo.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-red-600">
                      R$ {combo.price.toFixed(2)}
                    </span>
                    <div className="flex items-center text-green-600 mt-1">
                      <Tag className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        Economia de R$ {combo.savings.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                    Pedir Agora
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