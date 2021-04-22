import { Route, Redirect } from 'react-router-dom'
import { paths } from 'constants/paths'
const isLogin = () => true

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				isLogin() ? (
					<Component {...props} routes={rest.routes} />
				) : (
					<Redirect to={paths.LOGIN} />
				)
			}
		/>
	)
}

export default PrivateRoute
