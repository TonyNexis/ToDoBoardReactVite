import { createLazyFileRoute } from '@tanstack/react-router'

const a = 11;

export const Route = createLazyFileRoute('/about')({
  component: () => <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus officiis ab inventore aspernatur eligendi sapiente vero quibusdam, eveniet impedit ipsa eum, hic harum ducimus earum ea molestiae cumque neque vitae.</div>
})