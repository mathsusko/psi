import logo from '@/assets/logo.png'

import * as React from 'react'
import {
  AudioWaveform,
  Box,
  Command,
  DollarSign,
  FileCheck,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  UsersRound
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
// import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
// import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'admin',
    email: 'admin@psi.com',
    avatar: logo
  },
  teams: [
    {
      name: 'PSI Previncêndio',
      logo: GalleryVerticalEnd,
      plan: 'Dono'
    },
    {
      name: 'Acmse Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Estatísticas',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: 'Estoque',
      url: '/estoque',
      icon: Box
    },
    {
      title: 'Plano Orçamentário',
      url: '#',
      icon: DollarSign,
      items: [
        {
          title: 'Orçamentos de Materiais',
          url: '/orcamentos-de-materiais'
        },
        {
          title: 'Orçamentos de Serviços',
          url: '/orcamentos-de-servicos'
        }
      ]
    },
    // {
    //   title: 'Nota fiscal',
    //   url: '/notas-fiscais-lista',
    //   icon: FileCheck
    // },
    {
      title: 'Clientes',
      url: '/clientes',
      icon: UsersRound
    }
    // {
    //   title: 'Controle de Funcionário',
    //   url: '/funcionarios',
    //   icon: Settings2
    // }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="p-4 flex flex-row items-center">
        <img
          className="w-[32px]"
          src={logo}
          alt="Logo"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
