import { useState, useContext, useEffect } from 'react'
import {
	Form,
	Input,
	Button,
	Spin,
	Drawer,
	Card,
	Space,
	Table,
	Select,
	Typography,
} from 'antd'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { saveSafeguards } from 'epics/safeguardsEpics'
import ParamsContext from 'store/context/ParamsContext'
import ProjectsContext from 'store/context/ProjectsContext'
import { RightCircleOutlined } from '@ant-design/icons'
import { optionsTypes } from 'constants/safeguards'

const SafeguardsForm = () => {
	const [form] = Form.useForm()
	const [spinner, setSpinner] = useState(false)
	const [childrenDrawer, setChildrenDrawer] = useState(false)
	const { safeguardsParams } = useContext(ParamsContext)
	const { getSafeguardsData, safeguardsCatalog } = useContext(ProjectsContext)

	const [treeData, setTreeData] = useState([])
	const [safeguardCode, setSafeguardCode] = useState([])
	const [safeguardName, setSafeguardName] = useState([])
	const [safeguardType, setSafeguardType] = useState([])
	const [treathList, setTreathList] = useState([])
	const {
		setSafeguardsFormToggle,
		toggleFormSafeguards,
		safeguardsFormData,
	} = useContext(ProjectsFormContext)
	const { Option } = Select
	const { Text } = Typography

	const onReset = () => {
		form.resetFields()
		setSafeguardCode('')
		setSafeguardName('')
		setTreathList([])
	}

	const showChildrenDrawer = () => {
		setChildrenDrawer(true)
	}

	const onChildrenDrawerClose = () => {
		setChildrenDrawer(false)
	}

	const onFinish = async (values) => {
		setSpinner(true)
		const response = await saveSafeguards(
			safeguardCode,
			safeguardName,
			values.safeguard_type,
			safeguardsParams,
			treathList,
			values.safeguard_description
		)
		await setAfterSaveProjects(response)
	}

	const handleChange = (values) => {
		const treathListSend = []
		values.map((item) =>
			treathListSend.push(optionsSelect.find((option) => option.value === item))
		)
		const treath = treathListSend.map((treath) => {
			return { treath_code: treath.key, treath_name: treath.value }
		})
		setTreathList(treath)
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			onChildrenDrawerClose()
			setSafeguardsFormToggle()
			await getSafeguardsData(safeguardsParams)
			onReset()
		}
		setSpinner(false)
	}

	const columns = [
		{
			title: 'Codigo',
			dataIndex: 'code',
			key: 'code',
			width: '30%',
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			width: '30%',
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: (_, record) => tableActions(record),
			width: '10%',
		},
	]

	const optionsSelect = [
		{ key: '[S]', value: 'FS' },
		{ key: '[F]', value: 'F Fuego' },
		{ key: '[W]', value: 'W Humedad' },
		{ key: '[A]', value: 'A Agua' },
		{ key: '[D]', value: 'Desastres Naturales' },
	]

	const onChange = (value) => {
		setSafeguardType(value)
	}

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() => {
						showChildrenDrawer()
						setSafeguardCode(dataItem.code)
						setSafeguardName(dataItem.name)
					}}
					icon={<RightCircleOutlined />}
					className='update-button'
				/>
			</Space>
		)
	}

	const filterSafeguards = (safeguards) =>
		safeguards.map((safeguard) => ({
			key: safeguard.key,
			code: safeguard.key,
			name: safeguard.title,
		}))

	useEffect(() => {
		if (toggleFormSafeguards) {
			form.setFieldsValue({
				treath_list: safeguardsFormData.treath_list,
			})
		}
	}, [safeguardsFormData])

	useEffect(() => {
		if (safeguardsCatalog?.length !== 0 && safeguardsCatalog) {
			setTreeData(safeguardsCatalog)
		}
	}, [safeguardsCatalog])

	return (
		<>
			<Drawer
				className='assets-main-form'
				title={'Nueva Salvaguarda'}
				placement='right'
				width='700px'
				onClose={setSafeguardsFormToggle}
				visible={toggleFormSafeguards}
			>
				<Text>
					En esta lista de salvaguardas, elije que salvaguarda deseas aplicar?
				</Text>
				{treeData.map((safeguard) => (
					<Card
						key={`code_${safeguard.value}`}
						title={safeguard.title}
						style={{ width: 700 }}
					>
						<Table
							key={safeguard.key}
							columns={columns}
							bordered={true}
							dataSource={filterSafeguards(safeguard.children)}
						/>
					</Card>
				))}

				<Drawer
					title={safeguardName}
					width={600}
					closable={false}
					onClose={onChildrenDrawerClose}
					visible={childrenDrawer}
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
								label='Tipo de la Salvaguarda'
								name='safeguard_type'
								className='main-form-item'
								rules={[
									{
										required: true,
										message: '¡Ingrese el tipo de la salvaguarda!',
									},
								]}
							>
								<Select
									showSearch
									style={{ width: '70%' }}
									placeholder='Select a person'
									optionFilterProp='children'
									onChange={onChange}
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									{optionsTypes.map((option) => (
										<Option key={option.key} value={option.value}>
											{option.label}
										</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								label='Lista de amenazas'
								className='main-form-item'
								rules={[
									{
										required: true,
										message: '¡Ingrese las amenazas!',
									},
								]}
							>
								<Select
									mode='multiple'
									style={{ width: '70%' }}
									placeholder='Seleccione las amenazas'
									onChange={handleChange}
									options={optionsSelect}
								/>
							</Form.Item>
							<Form.Item
								label='Descripcion de Salvaguardas'
								name='safeguard_description'
								className='main-form-item'
								rules={[
									{
										required: true,
										message: '¡Ingrese la descripcion de la Salvaguardas!',
									},
								]}
							>
								<Input placeholder='Descripcion de Salvaguardas' type='text' />
							</Form.Item>
							<Form.Item className='main-button-content'>
								<Button
									type='primary'
									htmlType='submit'
									className='assets-form-button'
									block
								>
									Crear Salvaguarda
								</Button>
							</Form.Item>
						</Form>
					</Spin>
				</Drawer>
			</Drawer>
		</>
	)
}
export default SafeguardsForm
