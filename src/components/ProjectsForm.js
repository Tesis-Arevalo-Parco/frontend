import { useState, useContext } from 'react'
import { Form, Input, Button, Spin, Drawer } from 'antd'
import { saveProjects } from 'epics/projectsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'

const ProjectsForm = () => {
	const [form] = Form.useForm()
	const [spinner, setSpinner] = useState(false)
	const { getProjectsData } = useContext(ProjectsContext)
	const { toggleProjectsForm, toggle } = useContext(ProjectsFormContext)

	const onReset = () => {
		form.resetFields()
	}

	const onFinish = async (values) => {
		setSpinner(true)
		await saveProjects(values.name, values.description)
		setSpinner(false)
		toggleProjectsForm()
		await getProjectsData()
		onReset()
	}

	return (
		<>
			<Drawer
				className='projects-main-form'
				title='Nuevo Proyecto'
				placement='right'
				width='300px'
				onClose={toggleProjectsForm}
				visible={toggle}
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
							<Button
								type='primary'
								htmlType='submit'
								className='projects-form-button'
								block
							>
								Crear Proyecto
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Drawer>
		</>
	)
}

export default ProjectsForm
