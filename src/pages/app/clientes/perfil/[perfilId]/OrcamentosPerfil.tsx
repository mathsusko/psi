// src/pages/app/clientes/perfil/[perfilId]/OrcamentosPerfil.tsx

import React from 'react'
import Orcamentos from '../../orcamentos/Orcamentos'

const OrcamentosPerfil = () => {
  return (
    <div>
      <h2>Orçamentos do Cliente</h2>
      {/* Aqui você pode renderizar a lista de orçamentos do cliente */}
      {/* Você pode criar um componente para listar orçamentos, como Orcamentos.tsx */}
      <Orcamentos />
    </div>
  )
}

export default OrcamentosPerfil
