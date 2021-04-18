import 'scss/App.scss'
import { MAIN_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'

const App = () => {
	return <RenderRoutes routes={MAIN_ROUTES} />
}
export default App
