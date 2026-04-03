import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { HomePage } from '@/pages/home'
import { BeginnerPage } from '@/pages/beginner-page'
import { IntermediatePage } from '@/pages/intermediate-page'
import { AdvancedPage } from '@/pages/advanced-page'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beginner" element={<BeginnerPage />} />
        <Route path="/intermediate" element={<IntermediatePage />} />
        <Route path="/advanced" element={<AdvancedPage />} />
      </Routes>
    </AppShell>
  )
}
