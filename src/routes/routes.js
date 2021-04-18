import { paths } from 'constants/paths'
import { RenderRoutes } from 'utils/routesUtils'
import UserDashboard from 'pages/UserDashboard'
import LogIn from 'pages/LogIn'
import Register from 'pages/Register'

export const MAIN_ROUTES = [
	{
		path: paths.LOGIN,
		key: 'ROOT',
		exact: true,
		type: 'public',
		restricted: true,
		component: LogIn,
	},
	{
		path: paths.REGISTER,
		key: 'REGISTER',
		exact: true,
		type: 'public',
		restricted: true,
		component: Register,
	},
	{
		path: paths.ROOT_APP,
		key: 'APP',
		type: 'private',
		component: RenderRoutes,
		routes: [
			{
				path: paths.ROOT_APP,
				key: 'APP_ROOT',
				exact: true,
				type: 'private',
				component: UserDashboard,
			},
			{
				path: '/app/test',
				key: 'APP_ROOTs',
				exact: true,
				type: 'private',
				component: () => <h1>test</h1>,
			},
		],
	},
]
