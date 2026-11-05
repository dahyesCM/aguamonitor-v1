'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  CloudRain,
  Database,
  Droplets,
  Gauge,
  LayoutDashboard,
  Menu,
  Network,
  Radio,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const sensors = [
  { id: 'SEN-001', location: 'Zona de bombas', type: 'Sensor de flujo', reading: '15.2 L/min', state: 'Normal', tone: 'normal' },
  { id: 'SEN-002', location: 'Área de mantenimiento', type: 'Presencia de agua', reading: 'Agua detectada', state: 'Alerta', tone: 'alert' },
  { id: 'SEN-003', location: 'Servicios higiénicos', type: 'Sensor de flujo', reading: '8.5 L/min', state: 'Normal', tone: 'normal' },
  { id: 'SEN-004', location: 'Cuarto técnico', type: 'Presencia de agua', reading: 'Sin presencia de agua', state: 'Normal', tone: 'normal' },
]

const flowData = [
  { time: '00:00', flujo: 12 }, { time: '04:00', flujo: 10 }, { time: '08:00', flujo: 16 },
  { time: '12:00', flujo: 13 }, { time: '16:00', flujo: 19 }, { time: '20:00', flujo: 15 }, { time: 'Ahora', flujo: 17 },
]
const zoneData = [
  { zone: 'Bombas', value: 15.2, color: '#168aad' }, { zone: 'Mantenimiento', value: 11.8, color: '#f59e0b' },
  { zone: 'SS.HH.', value: 8.5, color: '#20b2aa' }, { zone: 'Técnico', value: 6.4, color: '#7c9ab0' },
]
const alertData = [
  { day: 'Lun', alerts: 1 }, { day: 'Mar', alerts: 2 }, { day: 'Mié', alerts: 1 }, { day: 'Jue', alerts: 3 }, { day: 'Vie', alerts: 2 }, { day: 'Sáb', alerts: 1 }, { day: 'Dom', alerts: 2 },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Monitoreo de sensores', icon: Radio },
  { label: 'Alertas e incidencias', icon: Bell }, { label: 'Historial de registros', icon: Activity },
  { label: 'Arquitectura del sistema', icon: Network }, { label: 'Configuración', icon: Settings },
]

function StatusBadge({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`status-badge status-${tone}`}><span className="status-dot" />{children}</span>
}

export default function MonitoringDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [simulatedAlert, setSimulatedAlert] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const visibleSensors = useMemo(() => sensors.filter((sensor) => {
    const matchesQuery = `${sensor.id} ${sensor.location} ${sensor.type}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'Todos' || sensor.state === filter
    return matchesQuery && matchesFilter
  }), [query, filter])

  const goTo = (label: string) => { setActiveNav(label); setMobileOpen(false) }
  const alertCount = simulatedAlert ? 3 : 2

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Droplets /></div><div><strong>Aqua<span>Monitor</span></strong><small>JOCKEY PLAZA</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú"><X /></button></div>
        <div className="nav-label">NAVEGACIÓN</div>
        <nav className="side-nav" aria-label="Navegación principal">
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => goTo(label)}><Icon /><span>{label}</span>{activeNav === label && <ChevronRight className="nav-chevron" />}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="sidebar-line" /><div className="academic-note"><ShieldCheck /><span>Prototipo académico<br /><b>Datos simulados</b></span></div><div className="user-card"><div className="avatar">JP</div><div><strong>Proyecto Jockey</strong><span>Modo demostración</span></div><ChevronRight /></div></div>
      </aside>
      {mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label="Cerrar navegación" />}

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menú"><Menu /></button><div className="breadcrumb"><span>Proyecto</span><ChevronRight /><strong>Panel de monitoreo</strong></div><div className="top-actions"><span className="last-sync"><span className="live-dot" /> Última actualización: hace 2 min</span><button className="icon-button" aria-label="Notificaciones"><Bell /><i /></button><div className="top-avatar">JP</div></div></header>
        <div className="content-wrap">
          <section className="hero-row"><div><div className="eyebrow"><span className="eyebrow-line" /> MONITOREO CENTRALIZADO</div><h1>Panel de monitoreo</h1><p>Sistema de detección temprana de fugas de agua <span>–</span> Jockey Plaza</p></div><div className="demo-pill"><span className="pulse-dot" /><div><strong>Modo demostración</strong><small>Simulación activa</small></div></div></section>

          <section className="kpi-grid" aria-label="Indicadores principales">
            <div className="kpi-card"><div className="kpi-icon blue"><Radio /></div><div><span className="kpi-label">Sensores registrados</span><strong>12</strong><small><span className="trend up">↑ 8.3%</span> vs. mes anterior</small></div><div className="kpi-spark blue-spark"><span /><span /><span /><span /><span /><span /><span /></div></div>
            <div className="kpi-card"><div className="kpi-icon green"><CheckCircle2 /></div><div><span className="kpi-label">Sensores operativos</span><strong>10 <em>/ 12</em></strong><small><span className="trend up">↑ 83.3%</span> disponibilidad</small></div><div className="kpi-spark green-spark"><span /><span /><span /><span /><span /><span /><span /></div></div>
            <div className="kpi-card"><div className="kpi-icon orange"><AlertTriangle /></div><div><span className="kpi-label">Alertas activas</span><strong>{alertCount}</strong><small><span className="trend down">↑ 1</span> en la última hora</small></div><div className="kpi-spark orange-spark"><span /><span /><span /><span /><span /><span /><span /></div></div>
            <div className="kpi-card attention-card"><div className="kpi-icon red"><CircleGauge /></div><div><span className="kpi-label">Estado general</span><strong className="attention-text">Atención requerida</strong><small><span className="status-dot red-dot" /> Revisión recomendada</small></div><div className="attention-ring"><span>68%</span></div></div>
          </section>

          <section className="section-heading"><div><div className="section-kicker"><span className="live-dot" /> MONITOREO EN VIVO</div><h2>Monitoreo en tiempo real</h2></div><div className="heading-actions"><button className="outline-button" onClick={() => setSimulatedAlert(!simulatedAlert)}><Zap /> {simulatedAlert ? 'Restablecer simulación' : 'Simular posible fuga'}</button><button className="filter-button"><SlidersHorizontal /> Filtros</button></div></section>
          {simulatedAlert && <div className="simulation-banner"><AlertTriangle /><div><strong>Simulación de fuga activa</strong><span>Se agregó una alerta demostrativa en Área de mantenimiento. No representa una detección real.</span></div><button onClick={() => setSimulatedAlert(false)} aria-label="Cerrar aviso"><X /></button></div>}
          <section className="monitor-grid">
            <div className="sensor-panel panel"><div className="panel-header"><div><h3>Sensores instalados</h3><span>{visibleSensors.length} de 12 sensores visibles</span></div><div className="sensor-controls"><div className="search-box"><Search /><input aria-label="Buscar sensores" placeholder="Buscar sensor..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><select aria-label="Filtrar estado" value={filter} onChange={(e) => setFilter(e.target.value)}><option>Todos</option><option>Normal</option><option>Alerta</option></select></div></div><div className="sensor-list">{visibleSensors.map((sensor) => <div className="sensor-row" key={sensor.id}><div className={`sensor-status-icon ${sensor.tone}`}><Droplets /></div><div className="sensor-main"><strong>{sensor.id}</strong><span>{sensor.location}</span></div><div className="sensor-type"><span>TIPO</span><b>{sensor.type}</b></div><div className="sensor-reading"><span>LECTURA ACTUAL</span><b>{sensor.reading}</b></div><StatusBadge tone={sensor.tone}>{sensor.state}</StatusBadge><button className="row-arrow" aria-label={`Ver ${sensor.id}`}><ChevronRight /></button></div>)}{visibleSensors.length === 0 && <div className="empty-state">No se encontraron sensores con esos filtros.</div>}</div><div className="panel-footer"><span><i className="legend-dot normal" /> Normal <i className="legend-dot alert" /> Alerta <i className="legend-dot warning" /> Advertencia</span><button onClick={() => goTo('Monitoreo de sensores')}>Ver todos los sensores <ChevronRight /></button></div></div>
            <div className="quick-panel panel"><div className="panel-header"><div><h3>Estado de red</h3><span>Conectividad del sistema</span></div><Wifi className="header-icon" /></div><div className="network-score"><div className="network-ring"><span>98<small>%</small></span></div><div><strong>Excelente</strong><span>12 dispositivos<br />conectados</span></div></div><div className="network-stats"><div><span>Latencia promedio</span><b>42 ms</b></div><div><span>Paquetes recibidos</span><b>99.8%</b></div></div><div className="network-footer"><span className="live-dot" /> MQTT • Conexión simulada</div></div>
          </section>

          <section className="charts-grid"><div className="chart-card panel large-chart"><div className="chart-head"><div><h3>Flujo de agua</h3><span>Últimas 24 horas <b>·</b> Litros por minuto</span></div><div className="chart-metric"><strong>14.8 <small>L/min</small></strong><span className="trend up">↑ 4.2%</span></div></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><LineChart data={flowData}><CartesianGrid vertical={false} stroke="#e7eef2" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#7b91a0', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#7b91a0', fontSize: 11 }} width={28} /><Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #dce9ee', boxShadow: '0 8px 25px rgba(19,54,76,.08)' }} /><Line type="monotone" dataKey="flujo" stroke="#168aad" strokeWidth={3} dot={{ fill: '#fff', stroke: '#168aad', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div></div><div className="chart-card panel"><div className="chart-head"><div><h3>Flujo por zona</h3><span>Lectura actual</span></div><button className="more-button" aria-label="Más opciones">•••</button></div><div className="chart-area small"><ResponsiveContainer width="100%" height="100%"><BarChart data={zoneData} layout="vertical" margin={{ left: 4, right: 8 }}><CartesianGrid horizontal={false} stroke="#e7eef2" /><XAxis type="number" hide /><YAxis dataKey="zone" type="category" axisLine={false} tickLine={false} tick={{ fill: '#526b7b', fontSize: 11 }} width={76} /><Tooltip cursor={{ fill: '#f2f8fa' }} contentStyle={{ borderRadius: 10, border: '1px solid #dce9ee' }} /><Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={12}>{zoneData.map((entry) => <Cell key={entry.zone} fill={entry.color} />)}</Bar></BarChart></ResponsiveContainer></div></div><div className="chart-card panel"><div className="chart-head"><div><h3>Alertas por día</h3><span>Últimos 7 días</span></div><span className="chart-total">12 <small>alertas</small></span></div><div className="chart-area small"><ResponsiveContainer width="100%" height="100%"><BarChart data={alertData}><CartesianGrid vertical={false} stroke="#e7eef2" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7b91a0', fontSize: 11 }} /><YAxis hide /><Tooltip cursor={{ fill: '#fff8eb' }} contentStyle={{ borderRadius: 10, border: '1px solid #dce9ee' }} /><Bar dataKey="alerts" fill="#f4a340" radius={[5, 5, 0, 0]} barSize={18} /></BarChart></ResponsiveContainer></div></div></section>

          <section className="bottom-grid"><div className="incidents-panel panel"><div className="panel-header"><div><div className="section-kicker orange-kicker"><AlertTriangle /> REQUIERE ATENCIÓN</div><h3>Alertas recientes</h3></div><button className="text-button" onClick={() => goTo('Alertas e incidencias')}>Ver historial <ChevronRight /></button></div><div className="incident-table-wrap"><table><thead><tr><th>CÓDIGO</th><th>FECHA Y HORA</th><th>UBICACIÓN</th><th>TIPO DE INCIDENCIA</th><th>RIESGO</th><th>ESTADO</th></tr></thead><tbody><tr><td><b>ALT-001</b></td><td>Hoy, 10:42</td><td>Zona de bombas</td><td>Posible presencia de agua</td><td><span className="risk high">Alto</span></td><td><span className="state pending">Pendiente</span></td></tr><tr><td><b>ALT-002</b></td><td>Hoy, 09:18</td><td>Área de mantenimiento</td><td>Flujo irregular</td><td><span className="risk medium">Medio</span></td><td><span className="state review">En revisión</span></td></tr><tr><td><b>ALT-003</b></td><td>Ayer, 18:36</td><td>Cuarto técnico</td><td>Funcionamiento normal</td><td><span className="risk low">Bajo</span></td><td><span className="state closed">Cerrado</span></td></tr></tbody></table></div></div><div className="status-panel panel"><div className="panel-header"><div><h3>Disponibilidad</h3><span>Resumen del sistema</span></div><Gauge className="header-icon" /></div><div className="availability"><strong>83.3<span>%</span></strong><div className="progress-track"><div /></div><span>10 de 12 sensores operativos</span></div><div className="availability-breakdown"><div><i className="legend-dot normal" /><span>Operativos</span><b>10</b></div><div><i className="legend-dot alert" /><span>Con alerta</span><b>2</b></div></div><button className="full-outline" onClick={() => goTo('Historial de registros')}>Ver registros de actividad <ChevronRight /></button></div></section>

          <section className="architecture panel"><div className="architecture-head"><div><div className="section-kicker"><Network /> DISEÑO DE REFERENCIA</div><h2>Arquitectura propuesta</h2><p>Flujo de datos del sistema de monitoreo</p></div><span className="not-implemented"><span /> No implementada</span></div><div className="flow-steps">{[{ icon: Droplets, label: 'Sensores de agua', desc: 'Detectan presencia y miden flujo', color: 'blue' }, { icon: CircleGauge, label: 'ESP32', desc: 'Recopila las lecturas', color: 'turquoise' }, { icon: Wifi, label: 'Wi-Fi + MQTT', desc: 'Transmite los datos', color: 'purple' }, { icon: Zap, label: 'Backend', desc: 'Procesa la información', color: 'orange' }, { icon: Database, label: 'Base de datos', desc: 'Almacena registros', color: 'navy' }, { icon: LayoutDashboard, label: 'Dashboard', desc: 'Visualiza mediciones', color: 'green' }].map(({ icon: Icon, label, desc, color }, index, arr) => <div className="flow-step-wrap" key={label}><div className={`flow-step ${color}`}><div className="flow-icon"><Icon /></div><strong>{label}</strong><span>{desc}</span></div>{index < arr.length - 1 && <div className="flow-arrow"><ChevronRight /></div>}</div>)}</div><div className="architecture-note"><CloudRain /><span>Este diagrama representa la arquitectura conceptual del proyecto universitario. La conexión con hardware, MQTT, backend y base de datos aún no ha sido implementada.</span></div></section>
          <footer className="page-footer"><span>AquaMonitor <b>•</b> Sistema de Monitoreo y Alerta Temprana</span><span>Prototipo visual académico <b>•</b> Datos simulados <b>•</b> v0.1</span></footer>
        </div>
      </main>
    </div>
  )
}
