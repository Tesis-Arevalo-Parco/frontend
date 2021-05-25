import { useReducer } from 'react'
import ProjectsFormReducer from 'store/reducer/ProjectsFormReducer'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { projectsFormToggleAction } from 'store/actions/projectsFormActions'

const projectsFormState = (props) => {
	const initialUserState = {
		toggle: false,
	}
	const [state, dispatch] = useReducer(ProjectsFormReducer, initialUserState)

	const toggleProjectsForm = () => {
		dispatch(projectsFormToggleAction(!state.toggle))
	}

	return (
		<ProjectsFormContext.Provider
			value={{
				toggle: state.toggle,
				toggleProjectsForm,
			}}
		>
			{props.children}
		</ProjectsFormContext.Provider>
	)
}

export default projectsFormState
