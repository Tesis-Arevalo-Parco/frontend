import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer } from 'antd'
import { saveProjects, updateProject } from 'epics/projectsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'

const AssetsForm = () => {
	const [form] = Form.useForm()
	const [spinner, setSpinner] = useState(false)
	const { getProjectsData } = useContext(ProjectsContext)
	const { setAssetsFormToggle, toggleFormAssets, assetsFormData } = useContext(
		ProjectsFormContext
	)

	const onReset = () => {
		form.resetFields()
	}

	const onFinish = async (values) => {
		setSpinner(true)
		if (assetsFormData.id) {
			const response = await updateProject(
				assetsFormData.id,
				values.name,
				values.description
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveProjects(values.name, values.description)
			await setAfterSaveProjects(response)
		}
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setAssetsFormToggle()
			await getProjectsData()
			onReset()
		}
		setSpinner(false)
	}

	useEffect(() => {
		if (toggleFormAssets) {
			form.setFieldsValue({
				identification: assetsFormData.identification,
				name: assetsFormData.name,
				model: assetsFormData.model,
			})
		}
	}, [assetsFormData])

	return (
		<>
			<Drawer
				className='assets-main-form'
				title={assetsFormData.name || 'Nuevo Activo'}
				placement='right'
				width='400px'
				onClose={setAssetsFormToggle}
				visible={toggleFormAssets}
			>
				<Spin spinning={spinner}>
					<Form
						name='assets-form'
						className='assets-form'
						onFinish={onFinish}
						layout='vertical'
						form={form}
					>
						<Form.Item
							label='Identificación del activo'
							name='identification'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la identificación del activo!',
								},
							]}
						>
							<Input placeholder='Identificación del activo' type='text' />
						</Form.Item>
						<Form.Item
							label='Nombre del activo'
							name='name'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el nombre del activo!',
								},
							]}
						>
							<Input placeholder='Nombre del activo' type='text' />
						</Form.Item>
						<Form.Item
							label='Modelo del activo'
							name='model'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el modelo del activo!',
								},
							]}
						>
							<Input type='text' placeholder='Modelo del activo' />
						</Form.Item>
						<Form.Item className='main-button-content'>
							<Button
								type='primary'
								htmlType='submit'
								className='assets-form-button'
								block
							>
								Crear Activo
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Drawer>
		</>
	)
}

export default AssetsForm
