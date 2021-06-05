import { useReducer } from 'react'
import ProjectsFormReducer from 'store/reducer/ProjectsFormReducer'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import {
	projectsFormToggleAction,
	setProjectsFormDataAction,
} from 'store/actions/projectsFormActions'

const projectsFormState = (props) => {
	const initialUserState = {
		toggle: false,
		projectFormData: { id: '', name: '', description: '' },
	}
	const [state, dispatch] = useReducer(ProjectsFormReducer, initialUserState)

	const toggleProjectsForm = () => {
		dispatch(projectsFormToggleAction(!state.toggle))
	}

	const setProjectsFormData = (id, name, description) => {
		dispatch(setProjectsFormDataAction(id, name, description))
	}

	return (
		<ProjectsFormContext.Provider
			value={{
				toggle: state.toggle,
				projectFormData: state.projectFormData,
				toggleProjectsForm,
				setProjectsFormData,
			}}
		>
			{props.children}
		</ProjectsFormContext.Provider>
	)
}

export default projectsFormState
