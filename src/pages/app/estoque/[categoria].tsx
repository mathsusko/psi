// import { useParams } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { useQuery } from '@tanstack/react-query'

// import { Skeleton } from '@/components/ui/skeleton'

// export function CategoriaPage() {
//   const { slug } = useParams()
//   const { data: categoria, isLoading } = useQuery({
//     queryKey: ['categoria', slug],
//     queryFn: () => categoriaApi.obterPorSlug(slug!)
//   })

//   if (isLoading)
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-8 w-1/2" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-3/4" />
//       </div>
//     )

//   if (!categoria) return <div>Categoria não encontrada</div>

//   return (
//     <>
//       <Helmet title={`Estoque - ${categoria.titulo}`} />
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold">{categoria.titulo}</h1>
//         <p>Estoque atual: {categoria.estoque}</p>

//         {/* Renderização condicional baseada no tipo */}
//         {categoria.tipo === 'material' && <div>Componente específico para materiais</div>}
//         {/* Adicione outros tipos conforme necessário */}
//       </div>
//     </>
//   )
// }
