import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import 'scss/App.scss'
import { MAIN_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'
import UserState from 'store/state/UserState'

Sentry.init({
	dsn:
		'https://c3911fa1964541949f59686fe510d597@o673728.ingest.sentry.io/5768372',
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
