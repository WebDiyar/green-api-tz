import { LogOut } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { logout } from '../model/logout'

export function LogoutButton() {
  return (
    <Button variant="ghost" size="icon" aria-label="Выйти" onClick={logout}>
      <LogOut />
    </Button>
  )
}
