interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const DELIVERY_AREAS = ['74150', '74180', '74140']; // Example CEP prefixes for delivery area

export async function fetchAddressByCep(cep: string): Promise<CepResponse> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  
  return data;
}

export function isInDeliveryArea(cep: string): boolean {
  const cepPrefix = cep.substring(0, 5);
  return DELIVERY_AREAS.includes(cepPrefix);
}