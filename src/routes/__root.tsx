import React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Footer from '../components/Footer/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div>
        <Link to="/" >
        Home
        </Link>{' '}
        <Link to="/about">
          About
        </Link>
      </div> */}
      <Footer/>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})