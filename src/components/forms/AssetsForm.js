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
	const [valueData, setValueData] = useState([])
	const [parentValueData, setParentValueData] = useState([])
	const [threatValues, setThreatValues] = useState([])
	const { getAssetsData, assetsClassCatalog, threatCatalog } = useContext(
		ProjectsContext
	)
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
				values.person_charge,
				values.location,
				values.quantity,
				values.description_asset,
				values.specific_characteristics,
				assetsParams,
				{ valueData, tree, parentValueData },
				threatValues
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveAssets(
				values.identification,
				values.name,
				values.person_charge,
				values.location,
				values.quantity,
				values.description_asset,
				values.specific_characteristics,
				assetsParams,
				{ valueData, tree, parentValueData },
				threatValues
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

	function searchTreeNode(threatCatalog, value) {
		const stack = [...threatCatalog]
		const result = []
		let node
		let parentNode
		while (stack.length > 0) {
			node = stack.pop()
			if (node.value.toUpperCase() === value.toUpperCase()) {
				result.push({
					parent: parentNode,
					children: node,
				})
			} else if (node.children && node.children.length) {
				parentNode = node
				for (let iterator = 0; iterator < node.children.length; iterator += 1) {
					stack.push(node.children[iterator])
				}
			}
		}
		return result
	}

	const getThreats = (assetValues) => {
		if (assetValues?.length) {
			const threats = assetValues
				.map((value) => {
					const searchData = searchTreeNode(threatCatalog, value)
					if (searchData?.length) {
						return searchData.map((item) => ({
							key: item.parent.key,
							title: item.parent.title,
							dimensions: item.parent?.dimensions,
						}))
					}
					return searchData
				})
				.flat()
			const threatValues = Array.from(
				new Set(threats.map((a) => a.key))
			).map((key) => threats.find((a) => a.key === key))
			return threatValues
		}
	}

	const onCheck = (checkedKeys, values) => {
		const checkedValues = values?.checkedNodes?.map((value) => value.value)
		const checkedParentValues = values?.checkedNodes
			?.map((value) => value?.parentValue)
			.filter((parent) => parent !== undefined)
		const uniqueParentValues = [...new Set(checkedParentValues)]
		const threats = getThreats(uniqueParentValues)
		setThreatValues(threats || [])
		setParentValueData(uniqueParentValues)
		setValueData(checkedValues)
		setIsTreeEmpty(false)
		setTree(checkedKeys)
	}

	useEffect(() => {
		if (toggleFormAssets) {
			form.setFieldsValue({
				identification: assetsFormData.identification,
				name: assetsFormData.name,
				person_charge: assetsFormData.person_charge,
				location: assetsFormData.location,
				quantity: assetsFormData.quantity,
				description_asset: assetsFormData.description_asset,
				specific_characteristics: assetsFormData.specific_characteristics,
			})
			setTree(assetsFormData?.classType?.tree)
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
							label='Código del activo'
							name='identification'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la código del activo!',
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
							label='Persona a cargo del activo'
							name='person_charge'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la persona a cargo del activo!',
								},
							]}
						>
							<Input type='text' placeholder='Persona a cargo del activo' />
						</Form.Item>
						<Form.Item
							label='Ubicación'
							name='location'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la ubicación del activo!',
								},
							]}
						>
							<Input type='text' placeholder='Ubicacion' />
						</Form.Item>
						<Form.Item
							label='Cantidad'
							name='quantity'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la cantidad!',
								},
							]}
						>
							<Input type='text' placeholder='Cantidad' />
						</Form.Item>
						<Form.Item
							label='Descripción'
							name='description_asset'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la descripción!',
								},
							]}
						>
							<Input type='text' placeholder='Descripcion' />
						</Form.Item>
						<Form.Item
							label='Características Específicas'
							name='specific_characteristics'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese las características específicas!',
								},
							]}
						>
							<Input type='text' placeholder='Características Específicas' />
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
							defaultCheckedKeys={assetsFormData?.classType?.tree}
							checkedKeys={tree}
							style={{ marginBottom: '12px' }}
						/>
						<Form.Item className='main-button-content'>
							{assetsFormData.name === '' ? (
								<Button
									type='primary'
									htmlType='submit'
									className='assets-form-button'
									block
								>
									Crear Activo
								</Button>
							) : (
								<Button
									type='primary'
									htmlType='submit'
									className='assets-form-button'
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

export default AssetsForm
