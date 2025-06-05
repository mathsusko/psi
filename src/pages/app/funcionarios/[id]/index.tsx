import { NavLink, Outlet, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function FuncionarioProfileLayout() {
  const { id } = useParams()

  const tabs = [
    { to: `/funcionarios/${id}/dados`, label: 'Dados' },
    { to: `/funcionarios/${id}/horas`, label: 'Horas' },
    { to: `/funcionarios/${id}/pagamentos`, label: 'Pagamentos' }
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Perfil do Funcionário</h1>

      <div className="flex gap-4 border-b border-muted pb-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                'text-sm font-medium pb-1 transition-colors border-b-2',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
