import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCliente } from '@/hooks/useCliente' // Supondo que você tenha um hook para lidar com os clientes

interface ModalNovoClienteProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function ModalNovoCliente({ open, onOpenChange }: ModalNovoClienteProps) {
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [cnpjCpf, setCnpjCpf] = useState('')
  const [ie, setIe] = useState('')
  const [categoria, setCategoria] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numeroEndereco, setNumeroEndereco] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const { criarCliente } = useCliente() // Hook para enviar os dados ao backend

  const handleSubmit = async () => {
    if (
      !nomeEmpresa ||
      !cnpjCpf ||
      !email ||
      !telefone ||
      !endereco ||
      !numeroEndereco ||
      !bairro ||
      !cep ||
      !cidade ||
      !estado
    ) {
      alert('Todos os campos obrigatórios devem ser preenchidos.')
      return
    }

    try {
      await criarCliente({
        nomeEmpresa,
        cnpjCpf,
        ie,
        categoria,
        email,
        telefone,
        endereco,
        numeroEndereco,
        complemento,
        bairro,
        cep,
        cidade,
        estado
      })
      alert('Cliente criado com sucesso!')
      resetFields() // Resetando os campos após sucesso
      onOpenChange(false) // Fechar o modal
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      alert('Erro ao criar cliente. Tente novamente.')
    }
  }

  // Função para resetar os campos do formulário
  const resetFields = () => {
    setNomeEmpresa('')
    setCnpjCpf('')
    setIe('')
    setCategoria('')
    setEmail('')
    setTelefone('')
    setEndereco('')
    setNumeroEndereco('')
    setComplemento('')
    setBairro('')
    setCep('')
    setCidade('')
    setEstado('')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      {/* O DialogTrigger precisa estar fora do DialogContent */}
      <DialogTrigger asChild>
        <Button>+ Adicionar Cliente</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogTitle>Criar Novo Cliente</DialogTitle>

        {/* Grid Layout para os campos do formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coluna 1 */}
          <div className="space-y-2">
            <Input
              placeholder="Nome da Empresa"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />
            <Input
              placeholder="CNPJ/CPF"
              value={cnpjCpf}
              onChange={(e) => setCnpjCpf(e.target.value)}
            />
            <Input
              placeholder="Inscrição Estadual"
              value={ie}
              onChange={(e) => setIe(e.target.value)}
            />
            <Input
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>

          {/* Coluna 2 */}
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <Input
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <Input
              placeholder="Número do Endereço"
              value={numeroEndereco}
              onChange={(e) => setNumeroEndereco(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Layout para as informações de endereço */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              placeholder="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <Input
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <Input
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <Input
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Criar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
