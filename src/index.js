import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import {
	requestInterceptorAxios,
	responseInterceptorAxios,
} from 'utils/apiUrlUtils'

requestInterceptorAxios()
responseInterceptorAxios()

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_API_KEY,
	integrations: [new Integrations.BrowserTracing()],
})

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
)
