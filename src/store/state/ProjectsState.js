import { useReducer } from 'react'
import ProjectsReducer from 'store/reducer/ProjectsReducer'
import ProjectsContext from 'store/context/ProjectsContext'
import { getProjects } from 'epics/projectsEpics'
import { projectsGetDataAction } from 'store/actions/projectsActions'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'

const projectsState = (props) => {
	const initialProjectsState = {
		projects: [],
	}
	const [state, dispatch] = useReducer(ProjectsReducer, initialProjectsState)

	const getProjectsData = async () => {
		const response = await getProjects()
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(projectsGetDataAction(response.data))
		}
	}

	return (
		<ProjectsContext.Provider
			value={{
				projects: state.projects,
				getProjectsData,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	)
}

export default projectsState
