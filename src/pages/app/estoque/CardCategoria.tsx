import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useCategorias } from '@/hooks/useCategorias'
import foto from '@/assets/photo.png'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

export function CardCategoria() {
  const { categorias, isLoading, removerCategoria } = useCategorias()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="w-full"
          >
            <CardHeader>
              <Skeleton className="w-full h-48 rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categorias?.map((categoria) => (
        <Card
          key={categoria.id}
          className="w-full hover:shadow-lg transition-shadow group"
        >
          <CardHeader className="relative">
            <img
              src={foto}
              alt={categoria.titulo}
              className="w-full h-48 rounded-lg object-cover object-center"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/app/estoque/editar/${categoria.id}`}>Editar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => removerCategoria.mutate(categoria.id)}
                  >
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium text-lg">{categoria.titulo}</h3>
            <p className="mt-2">
              Estoque: <span className="font-semibold">{categoria.estoque}</span>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              className="w-full"
            >
              <Link
                to={`/app/estoque/${categoria.tipo}/${categoria.slug || categoria.id}`}
                className="hover:underline"
              >
                Ver Categoria
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
