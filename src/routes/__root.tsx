import React, { useRef } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Footer from '../components/Footer/Footer'
import Menu from '../components/Menu/Menu';

export const Route = createRootRoute({
  component: () => {
    const footerBtnToggleMenuRef = useRef(null);

    return (
      <>
			<Footer footerBtnToggleMenuRef={footerBtnToggleMenuRef} />
			<Menu footerBtnToggleMenuRef={footerBtnToggleMenuRef}/>
      <Outlet />
      <TanStackRouterDevtools />
      </>
    );
  },
});