import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import {
	requestInterceptorAxios,
	responseInterceptorAxios,
} from 'utils/apiUrlUtils'

requestInterceptorAxios()
responseInterceptorAxios()

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
)
