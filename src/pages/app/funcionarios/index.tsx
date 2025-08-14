import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useFuncionarios } from '@/hooks/useFuncionarios'

export default function FuncionariosList() {
  const { data: funcionarios = [], isLoading } = useFuncionarios()

  if (isLoading) {
    return <p className="p-6">Carregando funcionários...</p>
  }

  if (funcionarios.length === 0) {
    return <p className="p-6">Não há funcionários registrados.</p>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <Button asChild>
          <Link to="/funcionarios/novo">
            <a className="hover:underline">Novo Funcionário</a>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {funcionarios.map((funcionario) => (
          <Card key={funcionario._id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{funcionario.nome}</h3>
                <p className="text-sm text-muted-foreground">{funcionario.cargo}</p>
              </div>
              <Button variant="outline">
                <Link
                  to={`/funcionarios/${funcionario._id}/dados`}
                  className="hover:underline"
                >
                  Ver Perfil
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
