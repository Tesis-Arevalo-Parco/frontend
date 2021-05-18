import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import 'scss/App.scss'
import { MAIN_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'
import UserState from 'store/state/UserState'

Sentry.init({
	dsn: process.env.REACT_SENTRY_API_KEY,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
})

const App = () => {
	return (
		<UserState>
			<RenderRoutes routes={MAIN_ROUTES} />
		</UserState>
	)
}
export default App
