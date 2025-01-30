import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <section id="contato" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Onde Nos Encontrar
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.1785799756894!2d-49.25599892374086!3d-16.686389143975706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1346c2aa75b%3A0x6c64c00f242448!2sSetor%20Marista%2C%20Goi%C3%A2nia%20-%20GO!5e0!3m2!1sen!2sbr!4v1709669145799!5m2!1sen!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-gray-600">
                    Av. República do Líbano, 1234 - Setor Marista
                    <br />
                    Goiânia - GO, 74150-030
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-gray-600">(62) 3333-4444</p>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-red-500 mr-3" />
                  <p className="text-gray-600">(62) 98888-9999 (WhatsApp)</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Horário de Funcionamento
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Segunda a Sexta: 11h às 23h</p>
                <p>Sábado e Domingo: 11h às 00h</p>
                <p>Feriados: 11h às 22h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}