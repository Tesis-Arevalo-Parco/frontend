import { useReducer, useContext } from 'react'
import ProjectsReducer from 'store/reducer/ProjectsReducer'
import ProjectsContext from 'store/context/ProjectsContext'
import { getProjects, getProjectById } from 'epics/projectsEpics'
import {
	projectsGetDataAction,
	assetsGetDataAction,
} from 'store/actions/projectsActions'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import SpinnerContext from 'store/context/SpinnerContext'

const projectsState = (props) => {
	const { activeSpinner } = useContext(SpinnerContext)
	const initialProjectsState = {
		projects: [],
		assets: [],
	}
	const [state, dispatch] = useReducer(ProjectsReducer, initialProjectsState)

	const getProjectsData = async () => {
		activeSpinner(true)
		const response = await getProjects()
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(projectsGetDataAction(response.data))
		}
		activeSpinner(false)
	}

	const getAssetsData = async (id) => {
		activeSpinner(true)
		const response = await getProjectById(id)
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(assetsGetDataAction(response.data.assets))
		}
		activeSpinner(false)
	}

	return (
		<ProjectsContext.Provider
			value={{
				projects: state.projects,
				assets: state.assets,
				getProjectsData,
				getAssetsData,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	)
}

export default projectsState
