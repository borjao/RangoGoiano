import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import type { OrderFormData, Address } from '../types';
import { formatCurrency, formatWhatsAppMessage } from '../utils/formatters';
import { fetchAddressByCep, isInDeliveryArea } from '../services/cep';

interface CheckoutFormProps {
  items: CartItem[];
  onClose: () => void;
  isOpen: boolean;
  onOrderComplete?: () => void;
}

export function CheckoutForm({ items, onClose, isOpen, onOrderComplete }: CheckoutFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    deliveryType: 'delivery',
    paymentMethod: 'credit',
  });
  
  const [address, setAddress] = useState<Address>({
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: ''
  });
  
  const [orderDetails, setOrderDetails] = useState('');
  const [cepError, setCepError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleCepBlur = async () => {
    if (address.cep.length === 8) {
      setIsLoadingCep(true);
      setCepError(null);
      try {
        const data = await fetchAddressByCep(address.cep);
        
        if (!isInDeliveryArea(address.cep)) {
          setCepError('Desculpe, não entregamos nesta região');
          return;
        }

        setAddress(prev => ({
          ...prev,
          city: data.localidade,
          neighborhood: data.bairro,
          street: data.logradouro
        }));
      } catch (error) {
        setCepError('CEP não encontrado');
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrderCount = (parseInt(localStorage.getItem('orderCount') || '0', 10) + 1);
    localStorage.setItem('orderCount', newOrderCount.toString());

    const deliveryFee = formData.deliveryType === 'delivery' ? 5.00 : 0;
    const fullAddress = formData.deliveryType === 'delivery' 
      ? `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}\n${address.neighborhood}, ${address.city} - CEP: ${address.cep}`
      : 'Retirada no local';

    const message = formatWhatsAppMessage(
      newOrderCount,
      formData.name,
      formData.phone,
      fullAddress,
      formData.paymentMethod === 'credit' ? 'Cartão Crédito/Débito' :
      formData.paymentMethod === 'pix' ? 'PIX' : 'Dinheiro',
      items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        isPromo: item.isPromo,
        originalPrice: item.originalPrice
      })),
      deliveryFee,
      orderDetails
    );
    
    window.open(`https://wa.me/5561999487507?text=${encodeURIComponent(message)}`);
    onOrderComplete?.();
    onClose();
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.deliveryType === 'delivery' ? 5.00 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Finalizar Pedido</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="flex gap-4 p-2 bg-gray-50 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                formData.deliveryType === 'delivery'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setFormData({ ...formData, deliveryType: 'delivery' })}
            >
              Delivery
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                formData.deliveryType === 'pickup'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
            >
              Retirada
            </button>
          </div>
          
          {formData.deliveryType === 'delivery' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">CEP</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    maxLength={8}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={address.cep}
                    onChange={e => setAddress({ ...address, cep: e.target.value.replace(/\D/g, '') })}
                    onBlur={handleCepBlur}
                  />
                  {isLoadingCep && (
                    <div className="absolute right-3 top-2">
                      <Search className="animate-spin h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                {cepError && (
                  <p className="mt-1 text-sm text-red-600">{cepError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cidade</label>
                  <input
                    type="text"
                    required
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                    value={address.city}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bairro</label>
                  <input
                    type="text"
                    required
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                    value={address.neighborhood}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rua</label>
                <input
                  type="text"
                  required
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                  value={address.street}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={address.number}
                    onChange={e => setAddress({ ...address, number: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Complemento</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={address.complement}
                    onChange={e => setAddress({ ...address, complement: e.target.value })}
                    placeholder="Próximo à farmácia"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.paymentMethod}
              onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as OrderFormData['paymentMethod'] })}
            >
              <option value="credit">Cartão Crédito/Débito</option>
              <option value="cash">Dinheiro</option>
              <option value="pix">PIX</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Observações do Pedido</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              rows={2}
              value={orderDetails}
              onChange={e => setOrderDetails(e.target.value)}
              placeholder="Ex: Sem cebola"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Taxa de Entrega:</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(total + deliveryFee)}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Enviar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}