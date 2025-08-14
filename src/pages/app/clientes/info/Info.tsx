import React from 'react'

interface InfoProps {
  cliente: {
    nomeEmpresa: string
    cnpjCpf: string
    ie: string
    categoria: string
    email: string
    telefone: string
    endereco: string
    numeroEndereco: string
    complemento: string
    bairro: string
    cep: string
    cidade: string
    estado: string
  } | null // Pode ser null enquanto os dados estão sendo carregados
}

const Info: React.FC<InfoProps> = ({ cliente }) => {
  // Verifica se o cliente está carregado antes de renderizar
  if (!cliente) {
    return <div>Carregando informações do cliente...</div>
  }

  return (
    <div>
      <p>
        <strong>Nome da Empresa:</strong> {cliente.nomeEmpresa}
      </p>
      <p>
        <strong>CNPJ/CPF:</strong> {cliente.cnpjCpf}
      </p>
      <p>
        <strong>Inscrição Estadual:</strong> {cliente.ie}
      </p>
      <p>
        <strong>Categoria:</strong> {cliente.categoria}
      </p>
      <p>
        <strong>Email:</strong> {cliente.email}
      </p>
      <p>
        <strong>Telefone:</strong> {cliente.telefone}
      </p>
      <p>
        <strong>Endereço:</strong> {cliente.endereco}
      </p>
      <p>
        <strong>Número do Endereço:</strong> {cliente.numeroEndereco}
      </p>
      <p>
        <strong>Complemento:</strong> {cliente.complemento}
      </p>
      <p>
        <strong>Bairro:</strong> {cliente.bairro}
      </p>
      <p>
        <strong>CEP:</strong> {cliente.cep}
      </p>
      <p>
        <strong>Cidade:</strong> {cliente.cidade}
      </p>
      <p>
        <strong>Estado:</strong> {cliente.estado}
      </p>
    </div>
  )
}

export default Info
