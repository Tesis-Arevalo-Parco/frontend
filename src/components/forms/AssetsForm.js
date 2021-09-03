import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer, Tree } from 'antd'
import { saveAssets, updateAssets } from 'epics/assetsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import ParamsContext from 'store/context/ParamsContext'

const AssetsForm = () => {
	const [form] = Form.useForm()
	const { assetsParams } = useContext(ParamsContext)
	const [spinner, setSpinner] = useState(false)
	const [isTreeEmpty, setIsTreeEmpty] = useState(false)
	const [tree, setTree] = useState([])
	const [treeData, setTreeData] = useState([])
	const { getAssetsData, assetsClassCatalog } = useContext(ProjectsContext)
	const { setAssetsFormToggle, toggleFormAssets, assetsFormData } = useContext(
		ProjectsFormContext
	)

	const onReset = () => {
		form.resetFields()
	}

	const onFinish = async (values) => {
		if (tree.length === 0) {
			setIsTreeEmpty(true)
			return
		}
		setSpinner(true)
		if (assetsFormData.id) {
			const response = await updateAssets(
				assetsFormData.id,
				values.identification,
				values.name,
				values.model,
				assetsParams,
				tree
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveAssets(
				values.identification,
				values.name,
				values.model,
				assetsParams,
				tree
			)
			await setAfterSaveProjects(response)
		}
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setAssetsFormToggle()
			await getAssetsData(assetsParams)
			onReset()
		}
		setSpinner(false)
	}

	const onCheck = (checkedKeys) => {
		setIsTreeEmpty(false)
		setTree(checkedKeys)
	}

	useEffect(() => {
		if (toggleFormAssets) {
			form.setFieldsValue({
				identification: assetsFormData.identification,
				name: assetsFormData.name,
				model: assetsFormData.model,
			})
			setTree(assetsFormData.classType)
		}
	}, [assetsFormData])

	useEffect(() => {
		if (assetsClassCatalog?.length !== 0 && assetsClassCatalog) {
			setTreeData(assetsClassCatalog)
		}
	}, [assetsClassCatalog])

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
						<div className='ant-col ant-form-item-label'>Clase de activo</div>
						{isTreeEmpty && (
							<div className='ant-form-item-explain ant-form-item-explain-error'>
								<div role='alert'>¡Ingrese la clase del activo!</div>
							</div>
						)}
						<Tree
							checkable
							onCheck={onCheck}
							treeData={treeData}
							defaultCheckedKeys={assetsFormData.classType}
							checkedKeys={tree}
							style={{ marginBottom: '12px' }}
						/>
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
