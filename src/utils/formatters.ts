export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatWhatsAppMessage = (
  orderNumber: number,
  customerName: string,
  customerPhone: string,
  customerAddress: string,
  paymentMethod: string,
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    isPromo?: boolean;
    originalPrice?: number;
  }>,
  deliveryFee: number,
  orderDetails?: string
) => {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + deliveryFee;

  const itemsList = items.map((item, index) => {
    const itemEmoji = item.name.toLowerCase().includes('x-') ? '🍔' : 
                     item.name.toLowerCase().includes('batata') ? '🍟' : 
                     item.name.toLowerCase().includes('refrigerante') ? '🥤' : '🍽️';
    
    if (item.isPromo && item.originalPrice) {
      return `${index + 1}. ${itemEmoji} ${item.name} - De ~${formatCurrency(item.originalPrice)}~ *Agora ${formatCurrency(item.price)}* (Promoção)`;
    }
    
    return `${index + 1}. ${itemEmoji} ${item.name} - ${formatCurrency(item.price)}`;
  }).join('\n');

  let message = `*🍔 NOVO PEDIDO 🕒 ${time} - #${orderNumber} do dia*

> *- 📋 INFORMAÇÕES DO CLIENTE -*
> *👤 Nome:* ${customerName}
> *📞 Telefone:* ${customerPhone}
> *🏠 Endereço:* ${customerAddress}
> *💳 Forma de Pagamento:* _${paymentMethod}_

*🍴PEDIDO:*
${itemsList}

*🚚 Taxa de Entrega:* ${formatCurrency(deliveryFee)}

*💰TOTAL:* ${formatCurrency(total)}`;

  if (orderDetails) {
    message += `\n\n*📝 Observações:* ${orderDetails}`;
  }

  return message;
};