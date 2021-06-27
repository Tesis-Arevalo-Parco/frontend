import { useReducer } from 'react'
import ProjectsFormReducer from 'store/reducer/ProjectsFormReducer'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import {
	projectsFormToggleAction,
	setProjectsFormDataAction,
	assetsFormToggleAction,
	setAssetsFormDataAction,
} from 'store/actions/projectsFormActions'

const projectsFormState = (props) => {
	const initialUserState = {
		toggleFormProject: false,
		toggleFormAssets: false,
		projectFormData: { id: '', name: '', description: '' },
		assetsFormData: { id: '', identification: '', name: '', model: '' },
	}
	const [state, dispatch] = useReducer(ProjectsFormReducer, initialUserState)

	const setProjectsFormToggle = () => {
		dispatch(projectsFormToggleAction(!state.toggleFormProject))
	}

	const setAssetsFormToggle = () => {
		dispatch(assetsFormToggleAction(!state.toggleFormAssets))
	}

	const setProjectsFormData = (id, name, description) => {
		dispatch(setProjectsFormDataAction(id, name, description))
	}

	const setAssetsFormData = (id, identification, name, model) => {
		dispatch(setAssetsFormDataAction(id, identification, name, model))
	}

	return (
		<ProjectsFormContext.Provider
			value={{
				toggleFormAssets: state.toggleFormAssets,
				toggleFormProject: state.toggleFormProject,
				projectFormData: state.projectFormData,
				assetsFormData: state.assetsFormData,
				setProjectsFormToggle,
				setProjectsFormData,
				setAssetsFormToggle,
				setAssetsFormData,
			}}
		>
			{props.children}
		</ProjectsFormContext.Provider>
	)
}

export default projectsFormState
