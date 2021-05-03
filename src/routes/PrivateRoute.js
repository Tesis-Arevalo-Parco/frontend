import { Route, Redirect } from 'react-router-dom'
import { paths } from 'constants/paths'
import { getJWT } from 'utils/localStorageUtils'

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to / page
		<Route
			{...rest}
			render={(props) =>
				getJWT() ? (
					<Component {...props} routes={rest.routes} />
				) : (
					<Redirect to={paths.LOGIN} />
				)
			}
		/>
	)
}

export default PrivateRoute
