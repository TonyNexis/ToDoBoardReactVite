import { createFileRoute } from '@tanstack/react-router'
import MainPage from '../pages/Main/MainPage'

export const Route = createFileRoute('/')({
  component: () => <MainPage/>
  
})