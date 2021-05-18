import { paths } from 'constants/paths'
import { RenderRoutes } from 'utils/routesUtils'
import UserDashboard from 'pages/UserDashboard'
import LogIn from 'pages/LogIn'
import Register from 'pages/Register'

export const MAIN_ROUTES = [
	{
		path: paths.LOGIN,
		key: 'LOGIN',
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
		key: 'ROOT_APP',
		exact: false,
		type: 'private',
		component: UserDashboard,
	},
]

export const APP_ROUTES = [
	{
		path: paths.SAFEGUARDS,
		key: 'SAFEGUARDS',
		exact: true,
		type: 'private',
		component: () => <div>Salvaguardas</div>,
	},
	{
		path: paths.STATICS,
		key: 'STATICS',
		exact: true,
		type: 'private',
		component: () => <div>estadísticas</div>,
	},
	{
		path: paths.THREATS,
		key: 'THREATS',
		exact: false,
		type: 'private',
		component: RenderRoutes,
		routes: [
			{
				path: paths.THREAT_IDENTIFICATION,
				key: 'THREAT_IDENTIFICATION',
				exact: true,
				type: 'private',
				component: () => <div>Identificacion de Amenazas</div>,
			},
			{
				path: paths.THREAT_VALUATION,
				key: 'THREAT_VALUATION',
				exact: true,
				type: 'private',
				component: () => <div>Valoracion de Amenazas</div>,
			},
		],
	},
	{
		path: paths.ASSETS,
		key: 'ASSETS',
		exact: false,
		type: 'private',
		component: RenderRoutes,
		routes: [
			{
				path: paths.ASSETS_IDENTIFICATION,
				key: 'ASSETS_IDENTIFICATION',
				exact: true,
				type: 'private',
				component: () => <div>Identificacion de activos</div>,
			},
			{
				path: paths.ASSETS_VALUATION,
				key: 'ASSETS_VALUATION',
				exact: true,
				type: 'private',
				component: () => <div>Valoracion de activos</div>,
			},
			{
				path: paths.ASSETS_REGISTER,
				key: 'ASSETS_REGISTER',
				exact: true,
				type: 'private',
				component: () => <div>Registro de activos</div>,
			},
			{
				path: paths.ASSETS_LIST,
				key: 'ASSETS_LIST',
				exact: true,
				type: 'private',
				component: () => <div>Lista de activos</div>,
			},
		],
	},
]
