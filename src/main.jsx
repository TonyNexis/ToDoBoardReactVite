import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './firebase/firebaseConfig.js'
import store from './redux/store.ts'
import { routeTree } from './routeTree.gen.ts'

import './main.css'

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <App />
			 */}
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
