import { RenderRoutes } from 'utils/routesUtils'
import UserDashboard from 'pages/UserDashboard'
import { paths } from 'constants/paths'

export const MAIN_ROUTES = [
	{
		path: paths.LOGIN,
		key: 'ROOT',
		exact: true,
		type: 'public',
		restricted: true,
		component: () => <h1>Inicio de sesión</h1>,
	},
	{
		path: paths.REGISTER,
		key: 'REGISTER',
		exact: true,
		type: 'public',
		restricted: true,
		component: () => <h1>Registro</h1>,
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
