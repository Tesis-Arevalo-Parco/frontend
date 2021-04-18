import { Route, Redirect } from 'react-router-dom'
import { paths } from 'constants/paths'

const isLogin = () => false

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	console.log(restricted)
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props) =>
				isLogin() && restricted ? (
					<Redirect to={paths.ROOT_APP} />
				) : (
					<Component {...props} routes={rest.routes} />
				)
			}
		/>
	)
}

export default PublicRoute
