import { Outlet } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { AboutPage } from '../pages/AboutPage'
import { HistPlacePage } from '../pages/HistPlacePage'
import Home from '../pages/Home'
import { PageNotFound } from '../pages/PageNotFound'
import { AllHistPlacesPage } from '../pages/AllHistPlacesPage'

export const appRoutes = [
	{
		path: '/',
		element: (
			<Layout>
				<Outlet />
			</Layout>
		),
		children: [
			{
				path: '*',
				element: <PageNotFound />,
			},
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: '/histPlace/:histPlaceId',
				element: <HistPlacePage />,
			},
			{
				path: '/AllHistPlacesPage',
				element: <AllHistPlacesPage />,
			},
		],
	},
]
