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
	safeguardsFormChildrenToggleAction,
	setSafeguardsFormDataAction,
	uploadToggleAction,
} from 'store/actions/projectsFormActions'

const projectsFormState = (props) => {
	const initialUserState = {
		toggleFormProject: false,
		toggleFormAssets: false,
		toggleFormSafeguards: false,
		toggleFormChildrenSafeguards: false,
		toggleUpload: false,
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
			safeguard_code: '',
			safeguard_name: '',
			safeguard_type: '',
			treath_list: [],
			safeguard_description: '',
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

	const setSafeguardsFormChildrenToggle = () => {
		console.log(state.toggleFormChildrenSafeguards)
		dispatch(
			safeguardsFormChildrenToggleAction(!state.toggleFormChildrenSafeguards)
		)
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
		safeguard_code,
		safeguard_name,
		safeguard_type,
		treath_list,
		safeguardsFormData,
		safeguard_description
	) => {
		dispatch(
			setSafeguardsFormDataAction(
				id,
				safeguard_code,
				safeguard_name,
				safeguard_type,
				treath_list,
				safeguardsFormData,
				safeguard_description
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

				setProjectsFormToggle,
				setProjectsFormData,

				setAssetsFormToggle,
				setAssetsFormData,

				setSafeguardsFormToggle,
				setSafeguardsFormData,
				setSafeguardsFormChildrenToggle,

				setUploadToggle,
			}}
		>
			{props.children}
		</ProjectsFormContext.Provider>
	)
}

export default projectsFormState
