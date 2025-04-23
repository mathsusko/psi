import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategorias } from '@/hooks/useCategorias'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'

export function NovaCategoriaPage() {
  const [formData, setFormData] = useState({
    titulo: '',
    estoque: 0,
    tipo: 'material' as const
  })

  const { criarCategoria } = useCategorias()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.titulo.trim()) {
      toast.error('O título é obrigatório')
      return
    }

    if (formData.estoque < 0) {
      toast.error('O estoque não pode ser negativo')
      return
    }

    criarCategoria.mutate({
      ...formData,
      slug: formData.titulo.toLowerCase().replace(/\s+/g, '-')
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Nova Categoria</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* ... restante do formulário permanece igual */}
      </form>
    </div>
  )
}
