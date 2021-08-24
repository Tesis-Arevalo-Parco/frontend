import { Switch } from 'react-router-dom'
import 'scss/App.scss'
import UserState from 'store/state/UserState'
import ProjectsState from 'store/state/ProjectsState'
import ProjectsFormState from 'store/state/ProjectsFormState'
import ParamsState from 'store/state/ParamsState'
import SpinnerState from 'store/state/SpinnerState'
import PrivateRoute from 'routes/PrivateRoute'
import PublicRoute from 'routes/PublicRoute'
import { paths } from 'constants/paths'
import LogIn from 'pages/LogIn'
import Register from 'pages/Register'
import UserDashboard from 'pages/UserDashboard'
import 'handsontable/dist/handsontable.full.css'

const App = () => {
	return (
		<UserState>
			<SpinnerState>
				<ParamsState>
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
				</ParamsState>
			</SpinnerState>
		</UserState>
	)
}
export default App
