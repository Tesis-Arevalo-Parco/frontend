import { Route, Redirect } from 'react-router-dom'
import { paths } from 'constants/paths'
import { getJWT } from 'utils/localStorageUtils'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props) =>
				getJWT() && restricted ? (
					<Redirect to={paths.ROOT_APP} />
				) : (
					<Component {...props} routes={rest.routes} />
				)
			}
		/>
	)
}

export default PublicRoute
