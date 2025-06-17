import { useEffect, useRef, useState } from 'react'
import Calendar from 'tui-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import { useParams } from 'react-router-dom'
import {
  useHoras,
  useCriarHora,
  useAtualizarHora,
  useDeletarHora
} from '@/hooks/useHoras'
import { toast } from 'sonner'

export default function FuncionarioHoras() {
  const { id: funcionarioId } = useParams<{ id: string }>()
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const calendar = useRef<any>(null)
  const [view, setView] = useState<'week' | 'month' | 'day'>('week')

  const { data: horas = [] } = useHoras(funcionarioId!)
  const criarHora = useCriarHora(funcionarioId!)
  const atualizarHora = useAtualizarHora(funcionarioId!)
  const deletarHora = useDeletarHora(funcionarioId!)

  // Inicializa o calendário uma única vez
  useEffect(() => {
    if (!calendarRef.current || calendar.current) return

    calendar.current = new Calendar(calendarRef.current, {
      defaultView: 'week', // valor fixo, a troca será dinâmica
      useCreationPopup: true,
      useDetailPopup: true,
      taskView: false,
      scheduleView: ['time'],
      usageStatistics: false,
      template: {
        time(schedule: any) {
          return schedule.title
        }
      },
      week: {
        workweek: true,
        startDayOfWeek: 1,
        hourStart: 6,
        hourEnd: 22
      },
      month: {
        startDayOfWeek: 1
      }
    })

    calendar.current.on('beforeCreateSchedule', (scheduleData: any) => {
      const { start, end, title } = scheduleData

      criarHora.mutate(
        {
          titulo: title || 'Sem título',
          inicio: start.toDate(),
          fim: end.toDate()
        },
        {
          onSuccess: () => toast.success('Hora criada'),
          onError: () => toast.error('Erro ao criar hora')
        }
      )
    })

    calendar.current.on('beforeUpdateSchedule', (event: any) => {
      const { schedule, changes } = event
      const horaId = schedule.id

      atualizarHora.mutate(
        {
          horaId,
          data: {
            titulo: changes.title ?? schedule.title,
            inicio: changes.start?.toDate() ?? schedule.start.toDate(),
            fim: changes.end?.toDate() ?? schedule.end.toDate()
          }
        },
        {
          onSuccess: () => toast.success('Hora atualizada'),
          onError: () => toast.error('Erro ao atualizar hora')
        }
      )
    })

    calendar.current.on('beforeDeleteSchedule', (event: any) => {
      const horaId = event.schedule.id
      deletarHora.mutate(horaId, {
        onSuccess: () => toast.success('Hora removida'),
        onError: () => toast.error('Erro ao deletar hora')
      })
    })

    return () => {
      calendar.current?.destroy?.()
      calendar.current = null
    }
  }, [criarHora, atualizarHora, deletarHora])

  // Renderiza horários
  useEffect(() => {
    if (!calendar.current) return

    calendar.current.clear()

    const schedules = horas.map((hora) => ({
      id: hora._id,
      calendarId: '1',
      title: hora.titulo,
      category: 'time',
      start: new Date(hora.inicio),
      end: new Date(hora.fim)
    }))

    calendar.current.createSchedules(schedules)
  }, [horas])

  // Aplica troca de visualização sem recriar calendário
  useEffect(() => {
    if (calendar.current) {
      calendar.current.changeView(view)
    }
  }, [view])

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] p-4">
      <h2 className="text-xl font-semibold mb-4">Horas Trabalhadas</h2>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView('month')}
          className={`px-3 py-1 rounded ${view === 'month' ? 'bg-primary text-white' : 'bg-muted hover:bg-primary hover:text-white'}`}
        >
          Mês
        </button>
        <button
          onClick={() => setView('week')}
          className={`px-3 py-1 rounded ${view === 'week' ? 'bg-primary text-white' : 'bg-muted hover:bg-primary hover:text-white'}`}
        >
          Semana
        </button>
        <button
          onClick={() => setView('day')}
          className={`px-3 py-1 rounded ${view === 'day' ? 'bg-primary text-white' : 'bg-muted hover:bg-primary hover:text-white'}`}
        >
          Dia
        </button>
      </div>

      <div
        ref={calendarRef}
        className="flex-1 border rounded shadow"
      />
    </div>
  )
}
