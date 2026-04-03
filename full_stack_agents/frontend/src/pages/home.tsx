import { Link } from 'react-router-dom'
import { Shield, Terminal, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const projects = [
  {
    title: 'Content Shield',
    icon: Shield,
    badge: 'BEGINNER',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description:
      'AI-powered hate speech detection using a single CrewAI agent with NLP-driven content classification.',
    caseStudy: 'Twitter/X Moderation',
    link: '/beginner',
    stats: [
      { label: 'Architecture', value: 'Single Agent' },
      { label: 'Response', value: '<2s' },
    ],
  },
  {
    title: 'DevOps Doctor',
    icon: Terminal,
    badge: 'INTERMEDIATE',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description:
      'Sequential multi-agent pipeline for automated log analysis, root cause investigation, and remediation planning.',
    caseStudy: 'GitLab Incident Response',
    link: '/intermediate',
    stats: [
      { label: 'Pipeline', value: '3 Agents' },
      { label: 'Output', value: 'Auto-Fix' },
    ],
  },
  {
    title: 'Market Intelligence',
    icon: TrendingUp,
    badge: 'ADVANCED',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    description:
      'Parallel multi-crew financial analysis with real-time market data, news aggregation, and investment recommendations.',
    caseStudy: 'Morgan Stanley Research',
    link: '/advanced',
    stats: [
      { label: 'Execution', value: '4 Parallel' },
      { label: 'Data', value: 'Real-time' },
    ],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function HomePage() {
  return (
    <div className="relative">
      <div className="relative pb-16 pt-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Intelligence-Driven Agents
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            The <span className="text-gradient">Agent</span> Studio
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Explore three AI agent architectures — from single-agent classification
            to parallel multi-agent orchestration — built with CrewAI, FastAPI, and React.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Button asChild>
              <Link to="/beginner">Get Started</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/10 hover:bg-white/[0.04]">
              <Link to="/advanced">View Architecture</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">Agent Architectures</h2>
          <p className="text-xs text-muted-foreground">
            Three progressive complexity levels
          </p>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <Link to={project.link} className="block h-full">
                <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:border-primary/30 hover:glow-sm">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <CardHeader className="pb-3">
                    <Badge
                      variant="outline"
                      className={`w-fit text-[10px] font-semibold tracking-wider ${project.badgeColor}`}
                    >
                      {project.badge}
                    </Badge>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                        <project.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </div>

                    <CardDescription className="mt-2 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-4 grid grid-cols-2 gap-2.5">
                      {project.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
                            {stat.label}
                          </p>
                          <p className="mt-1 text-sm font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground">{project.caseStudy}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                      Explore Case Study
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
