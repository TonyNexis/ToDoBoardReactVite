import { createLazyFileRoute } from '@tanstack/react-router'
import ProfilePage from '../pages/Profile/ProfilePage'

export const Route = createLazyFileRoute('/profile')({
  component: () => <ProfilePage/>
})