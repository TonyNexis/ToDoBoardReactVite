import { createLazyFileRoute } from '@tanstack/react-router'
import AboutPage from '../pages/About/AboutPage'

export const Route = createLazyFileRoute('/about')({
  component: () => <AboutPage/>
})