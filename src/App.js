import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Switch } from 'react-router-dom'
import 'scss/App.scss'
import UserState from 'store/state/UserState'
import ProjectsState from 'store/state/ProjectsState'
import ProjectsFormState from 'store/state/ProjectsFormState'
import PrivateRoute from 'routes/PrivateRoute'
import PublicRoute from 'routes/PublicRoute'
import { paths } from 'constants/paths'
import LogIn from 'pages/LogIn'
import Register from 'pages/Register'
import UserDashboard from 'pages/UserDashboard'

Sentry.init({
	dsn: process.env.REACT_SENTRY_API_KEY,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
})

const App = () => {
	return (
		<UserState>
			<ProjectsState>
				<ProjectsFormState>
					<Switch>
						<PublicRoute
							path={paths.LOGIN}
							component={LogIn}
							restricted={true}
							exact={true}
						/>
						<PublicRoute
							component={Register}
							path={paths.REGISTER}
							restricted={true}
							exact={true}
						/>
						<PrivateRoute
							component={UserDashboard}
							path={paths.ROOT_APP}
							restricted={true}
							exact={false}
						/>
					</Switch>
				</ProjectsFormState>
			</ProjectsState>
		</UserState>
	)
}
export default App
