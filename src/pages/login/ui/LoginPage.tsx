import { LoginForm } from '@/features/auth'
import { SetupGuide } from './SetupGuide'

export function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-muted/60 p-4 md:flex-row md:items-start md:py-16">
      <LoginForm />
      <SetupGuide />
    </div>
  )
}
