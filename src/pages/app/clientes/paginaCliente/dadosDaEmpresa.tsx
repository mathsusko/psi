import { useParams } from 'react-router-dom'
import { useCliente } from '@/hooks/useCliente'
import { Skeleton } from '@/components/ui/skeleton'

export default function DadosDaEmpresa() {
  const { id } = useParams<{ id: string }>()
  const { data: cliente, isLoading } = useCliente(id ?? '')

  if (isLoading || !cliente) {
    return (
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-full" />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">Dados da Empresa</h2>
      <div>
        <strong>Nome da Empresa:</strong> {cliente.nomeEmpresa}
      </div>
      <div>
        <strong>CNPJ/CPF:</strong> {cliente.cnpjCpf}
      </div>
      <div>
        <strong>Endereço:</strong> {cliente.endereco}, {cliente.numeroEndereco}{' '}
        {cliente.complemento && ` - ${cliente.complemento}`}
      </div>
      <div>
        <strong>Bairro:</strong> {cliente.bairro}
      </div>
      <div>
        <strong>CEP:</strong> {cliente.cep}
      </div>
      <div>
        <strong>Cidade/Estado:</strong> {cliente.cidade} - {cliente.estado}
      </div>
      <div>
        <strong>Email:</strong> {cliente.email}
      </div>
      <div>
        <strong>Telefone:</strong> {cliente.telefone}
      </div>
      <div>
        <strong>Categoria:</strong> {cliente.categoria}
      </div>
      <div>
        <strong>IE:</strong> {cliente.ie}
      </div>
    </div>
  )
}
