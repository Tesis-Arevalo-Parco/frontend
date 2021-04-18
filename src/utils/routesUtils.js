import { Route, Switch } from 'react-router-dom'

import PrivateRoute from 'routes/PrivateRoute'
import PublicRoute from 'routes/PublicRoute'

export function RenderRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, i) => {
				if (route.type === 'private') {
					return (
						<PrivateRoute
							key={route.key}
							component={route.component}
							path={route.path}
							exact={route.exact}
							routes={route.routes}
						/>
					)
				}
				return (
					<PublicRoute
						key={route.key}
						restricted={route.restricted}
						component={route.component}
						path={route.path}
						exact={route.exact}
						routes={route.routes}
					/>
				)
			})}
			<Route component={() => <h1>Not Found!</h1>} />
		</Switch>
	)
}
