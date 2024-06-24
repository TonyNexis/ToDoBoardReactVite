import { createLazyFileRoute } from '@tanstack/react-router'
import SomePage from '../pages/Some/SomePage'

export const Route = createLazyFileRoute('/somePage')({
  component: () => <SomePage/>
})