import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer, DatePicker } from 'antd'
import { saveProjects, updateProject } from 'epics/projectsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import moment from 'moment'

const ProjectsForm = () => {
	const [form] = Form.useForm()
	const [spinner, setSpinner] = useState(false)
	const { getProjectsData } = useContext(ProjectsContext)
	const {
		setProjectsFormToggle,
		toggleFormProject,
		projectFormData,
	} = useContext(ProjectsFormContext)

	const onReset = () => {
		form.resetFields()
	}

	const onFinish = async (values) => {
		setSpinner(true)
		if (projectFormData.id) {
			const response = await updateProject(
				projectFormData.id,
				values.code_project,
				values.name,
				values.date_project,
				values.security_manager,
				values.description
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveProjects(
				values.code_project,
				values.name,
				values.date_project,
				values.security_manager,
				values.description
			)
			await setAfterSaveProjects(response)
		}
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setProjectsFormToggle()
			await getProjectsData()
			onReset()
		}
		setSpinner(false)
	}

	useEffect(() => {
		if (toggleFormProject) {
			form.setFieldsValue({
				code_project: projectFormData.code_project,
				name: projectFormData.name,
				date_project: moment(projectFormData.date_project),
				security_manager: projectFormData.security_manager,
				description: projectFormData.description,
			})
		}
	}, [projectFormData])

	return (
		<>
			<Drawer
				className='projects-main-form'
				title={projectFormData.name || 'Nuevo Proyecto'}
				placement='right'
				width='400px'
				onClose={setProjectsFormToggle}
				visible={toggleFormProject}
			>
				<Spin spinning={spinner}>
					<Form
						name='project-form'
						className='project-form'
						onFinish={onFinish}
						layout='vertical'
						form={form}
					>
						<Form.Item
							label='Codigo del proyecto'
							name='code_project'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el codigo del proyecto!',
								},
							]}
						>
							<Input placeholder='Codigo del proyecto' type='text' />
						</Form.Item>

						<Form.Item
							label='Nombre del proyecto'
							name='name'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el nombre del proyecto!',
								},
							]}
						>
							<Input placeholder='Nombre del proyecto' type='text' />
						</Form.Item>

						<Form.Item
							label='Fecha del Proyecto'
							name='date_project'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la fecha del proyecto!',
								},
							]}
						>
							<DatePicker />
						</Form.Item>

						<Form.Item
							label='Responsable de Seguridad'
							name='security_manager'
							className='main-form-item'
							required={false}
						>
							<Input placeholder='Responsable de Seguridad' type='text' />
						</Form.Item>

						<Form.Item
							label='Descripción del proyecto'
							name='description'
							className='main-form-item'
							required={false}
						>
							<Input.TextArea
								type='text'
								placeholder='Descripción del proyecto'
							/>
						</Form.Item>

						<Form.Item className='main-button-content'>
							{projectFormData.name === '' ? (
								<Button
									type='primary'
									htmlType='submit'
									className='projects-form-button'
									block
								>
									Crear Proyecto
								</Button>
							) : (
								<Button
									type='primary'
									htmlType='submit'
									className='projects-form-button'
									block
								>
									Guardar Cambios
								</Button>
							)}
						</Form.Item>
					</Form>
				</Spin>
			</Drawer>
		</>
	)
}

export default ProjectsForm
