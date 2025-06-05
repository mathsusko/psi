import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { getFilialPorId } from '@/api/filiais'

export default function DadosDaFilial() {
  const { filialId } = useParams<{ filialId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['filial', filialId],
    queryFn: () => getFilialPorId(filialId!),
    enabled: !!filialId
  })

  const filial = data?.data

  if (isLoading || !filial) {
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
      <h2 className="text-xl font-bold">Dados da gerais</h2>
      <div>
        <strong>Nome da Empresa:</strong> {filial.nomeEmpresa}
      </div>
      <div>
        <strong>CNPJ/CPF:</strong> {filial.cnpjCpf}
      </div>
      <div>
        <strong>Endereço:</strong> {filial.endereco}, {filial.numeroEndereco}{' '}
        {filial.complemento && ` - ${filial.complemento}`}
      </div>
      <div>
        <strong>Bairro:</strong> {filial.bairro}
      </div>
      <div>
        <strong>CEP:</strong> {filial.cep}
      </div>
      <div>
        <strong>Cidade/Estado:</strong> {filial.cidade} - {filial.estado}
      </div>
      <div>
        <strong>Email:</strong> {filial.email}
      </div>
      <div>
        <strong>Telefone:</strong> {filial.telefone}
      </div>
      <div>
        <strong>Categoria:</strong> {filial.categoria}
      </div>
      <div>
        <strong>IE:</strong> {filial.ie}
      </div>
    </div>
  )
}
