import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import 'scss/App.scss'
import { MAIN_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'
import UserState from 'store/state/UserState'
import ProjectsState from 'store/state/ProjectsState'
import ProjectsFormState from 'store/state/ProjectsFormState'

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
					<RenderRoutes routes={MAIN_ROUTES} />
				</ProjectsFormState>
			</ProjectsState>
		</UserState>
	)
}
export default App
