import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { requestInterceptorAxios } from 'utils/apiUrlUtils'
requestInterceptorAxios()

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
)
