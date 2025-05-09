import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const fallbackBase64 =
  'data:image/png;base64,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'

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, fontFamily: 'Helvetica' },
  logo: { width: 40, height: 40, marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    gap: 24,
    paddingBottom: 16,
    borderBottomWidth: 0.7,
    borderBottomColor: '#f0f0f0'
  },
  prestador: { flexDirection: 'row', gap: 24 },
  prestadorRow: { flexDirection: 'row', gap: 12 },
  prestadorTitle: { fontSize: 15 },
  prestadorInfoOne: { marginTop: 8 },
  prestadorInfoTwo: { marginTop: 24 },
  prestadorInfoText: { fontSize: 8 },
  sectionHeaderCliente: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 24
  },
  details: {},
  infoDetail: { marginTop: 8 },
  titleDetail: { fontSize: 10 },
  detailText: { fontSize: 8 },
  client: { flexDirection: 'row', gap: 24 },
  titleClient: { fontSize: 10 },
  infoClient: { marginTop: 8 },
  textClient: { fontSize: 8 },
  clientInfoTwo: { marginTop: 20 },
  assTable: {
    marginTop: 64,
    flexDirection: 'row',
    borderWidth: 0.7,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  assTwo: {
    width: '33%',
    padding: 12,
    borderRightWidth: 0.7,
    borderColor: '#000',
    fontSize: 8
  },
  assThree: {
    width: '33%',
    padding: 12,
    borderRightWidth: 0.7,
    borderColor: '#000',
    fontSize: 8
  },
  assFour: { width: '33%', padding: 12, fontSize: 8 },
  assText: { fontSize: 12 },
  descricaoBox: {
    marginTop: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4
  },
  descricaoText: { fontSize: 9, lineHeight: 1.5 },
  label: { fontWeight: 'bold', fontSize: 9 }
})

interface Cliente {
  nomeEmpresa: string
  cnpj: string
  ie: string
  email: string
  telefone: string
  endereco: string
  numeroEndereco: string
  cidade: string
  estado: string
}

interface Prestador {
  nomeEmpresa: string
  cnpj: string
  ie: string
  email: string
  telefone: string
  endereco: string
  numeroEndereco: string
  cidade: string
  estado: string
}

interface OrcamentoServico {
  clienteId: Cliente
  prestadorId: Prestador
  dataInicio: string
  dataSaida: string
  descricaoServico: string
}

export const OrcamentoServicoPDF = ({ orcamento }: { orcamento: OrcamentoServico }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        {/* Prestador */}
        <View style={styles.sectionHeader}>
          <Image
            src={fallbackBase64}
            style={styles.logo}
          />
          <View style={styles.prestador}>
            <View style={styles.prestadorRow}>
              <View>
                <Text style={styles.prestadorTitle}>
                  {orcamento.prestadorId?.nomeEmpresa}
                </Text>
                <View style={styles.prestadorInfoOne}>
                  <Text style={styles.prestadorInfoText}>
                    CNPJ: {orcamento.prestadorId?.cnpj}
                  </Text>
                  <Text style={styles.prestadorInfoText}>
                    I.E: {orcamento.prestadorId?.ie}
                  </Text>
                </View>
              </View>
              <View style={styles.prestadorInfoTwo}>
                <Text style={styles.prestadorInfoText}>
                  E-mail: {orcamento.prestadorId?.email}
                </Text>
                <Text style={styles.prestadorInfoText}>
                  Telefone: {orcamento.prestadorId?.telefone}
                </Text>
                <Text style={styles.prestadorInfoText}>
                  {orcamento.prestadorId?.endereco},{' '}
                  {orcamento.prestadorId?.numeroEndereco}
                </Text>
                <Text style={styles.prestadorInfoText}>
                  {orcamento.prestadorId?.cidade} - {orcamento.prestadorId?.estado}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cliente e datas */}
        <View style={styles.sectionHeaderCliente}>
          <View style={styles.details}>
            <Text style={styles.titleDetail}>Detalhes do Orçamento</Text>
            <View style={styles.infoDetail}>
              <Text style={styles.detailText}>
                Data Início: {new Date(orcamento.dataInicio).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={styles.detailText}>
                Data Saída: {new Date(orcamento.dataSaida).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>

          <View style={styles.client}>
            <View>
              <Text style={styles.titleClient}>Dados do Cliente</Text>
              <View style={styles.infoClient}>
                <Text style={styles.textClient}>
                  Cliente: {orcamento.clienteId?.nomeEmpresa}
                </Text>
                <Text style={styles.textClient}>CNPJ: {orcamento.clienteId?.cnpj}</Text>
                <Text style={styles.textClient}>I.E: {orcamento.clienteId?.ie}</Text>
              </View>
            </View>
            <View style={styles.clientInfoTwo}>
              <Text style={styles.textClient}>
                Telefone: {orcamento.clienteId?.telefone}
              </Text>
              <Text style={styles.textClient}>Email: {orcamento.clienteId?.email}</Text>
              <Text style={styles.textClient}>
                Endereço: {orcamento.clienteId?.endereco},{' '}
                {orcamento.clienteId?.numeroEndereco}
              </Text>
              <Text style={styles.textClient}>
                {orcamento.clienteId?.cidade} - {orcamento.clienteId?.estado}
              </Text>
            </View>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.descricaoBox}>
          <Text style={styles.label}>Descrição do serviço</Text>
          <Text style={styles.descricaoText}>{orcamento.descricaoServico || '---'}</Text>
        </View>

        {/* Assinaturas */}
        <View style={styles.assTable}>
          <View style={styles.assTwo}>
            <Text style={styles.assText}>Cliente</Text>
            <Text style={styles.assText}>
              {orcamento.clienteId?.nomeEmpresa || 'Consumidor Final'}
            </Text>
          </View>
          <View style={styles.assThree}>
            <Text>Entregador</Text>
            <Text style={styles.assText}>________________________</Text>
          </View>
          <View style={styles.assFour}>
            <Text>Assinatura</Text>
            <Text style={styles.assText}>________________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
