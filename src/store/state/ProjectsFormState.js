/* eslint-disable camelcase */
import { useReducer } from 'react'
import ProjectsFormReducer from 'store/reducer/ProjectsFormReducer'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import {
	projectsFormToggleAction,
	setProjectsFormDataAction,
	assetsFormToggleAction,
	setAssetsFormDataAction,
	safeguardsFormToggleAction,
	setSafeguardsFormDataAction,
	uploadToggleAction,
	setToggleSafeguardDataFormAction,
} from 'store/actions/projectsFormActions'

const projectsFormState = (props) => {
	const initialUserState = {
		toggleFormProject: false,
		toggleFormAssets: false,
		toggleFormSafeguards: false,
		toggleFormChildrenSafeguards: false,
		toggleUpload: false,
		toggleSafeguardDataForm: false,
		projectFormData: { id: '', name: '', description: '' },
		assetsFormData: {
			id: '',
			identification: '',
			name: '',
			model: '',
			classType: {},
		},
		safeguardsFormData: {
			id: '',
			safeguardCode: '',
			safeguardName: '',
			safeguardType: '',
			threatList: [],
			safeguardDescription: '',
		},
	}

	const [state, dispatch] = useReducer(ProjectsFormReducer, initialUserState)

	const setProjectsFormToggle = () => {
		dispatch(projectsFormToggleAction(!state.toggleFormProject))
	}

	const setAssetsFormToggle = () => {
		dispatch(assetsFormToggleAction(!state.toggleFormAssets))
	}

	const setSafeguardsFormToggle = () => {
		dispatch(safeguardsFormToggleAction(!state.toggleFormSafeguards))
	}

	const setToggleSafeguardDataForm = () => {
		dispatch(setToggleSafeguardDataFormAction(!state.toggleSafeguardDataForm))
	}

	const setUploadToggle = (data) => {
		dispatch(uploadToggleAction(data))
	}

	const setProjectsFormData = (id, name, description) => {
		dispatch(setProjectsFormDataAction(id, name, description))
	}

	const setAssetsFormData = (
		id,
		identification,
		name,
		model,
		assetsFormData
	) => {
		dispatch(
			setAssetsFormDataAction(id, identification, name, model, assetsFormData)
		)
	}
	const setSafeguardsFormData = (
		id,
		safeguardCode,
		safeguardName,
		safeguardType,
		threatList,
		safeguardsFormData,
		safeguardDescription
	) => {
		dispatch(
			setSafeguardsFormDataAction(
				id,
				safeguardCode,
				safeguardName,
				safeguardType,
				threatList,
				safeguardsFormData,
				safeguardDescription
			)
		)
	}

	return (
		<ProjectsFormContext.Provider
			value={{
				toggleFormAssets: state.toggleFormAssets,
				toggleFormProject: state.toggleFormProject,
				toggleFormSafeguards: state.toggleFormSafeguards,
				toggleFormChildrenSafeguards: state.toggleFormChildrenSafeguards,
				projectFormData: state.projectFormData,
				assetsFormData: state.assetsFormData,
				safeguardsFormData: state.safeguardsFormData,
				toggleUpload: state.toggleUpload,
				toggleSafeguardDataForm: state.toggleSafeguardDataForm,
				setProjectsFormToggle,
				setProjectsFormData,
				setAssetsFormToggle,
				setAssetsFormData,
				setSafeguardsFormToggle,
				setSafeguardsFormData,
				setUploadToggle,
				setToggleSafeguardDataForm,
			}}
		>
			{props.children}
		</ProjectsFormContext.Provider>
	)
}

export default projectsFormState
