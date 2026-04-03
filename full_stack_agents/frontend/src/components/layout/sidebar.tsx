import { NavLink } from 'react-router-dom'
import { Brain, Home, Shield, Terminal, TrendingUp } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/beginner', label: 'Content Shield', icon: Shield },
  { to: '/intermediate', label: 'DevOps Doctor', icon: Terminal },
  { to: '/advanced', label: 'Market Intelligence', icon: TrendingUp },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-white/[0.06] bg-[hsl(222,45%,6%)]">
      <div className="flex items-center gap-3 p-5 pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="text-base font-bold text-gradient">Agent Studio</span>
          <p className="text-[10px] text-muted-foreground">Powered by CrewAI</p>
        </div>
      </div>

      <div className="px-4">
        <Separator className="bg-white/[0.06]" />
      </div>

      <nav className="flex-1 space-y-0.5 px-3 pt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/[0.08] text-primary shadow-[inset_3px_0_0_0_hsl(187,92%,41%)]'
                  : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground',
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] p-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          <p className="text-[11px] text-muted-foreground">v1.0 — Demo Ready</p>
        </div>
      </div>
    </aside>
  )
}
