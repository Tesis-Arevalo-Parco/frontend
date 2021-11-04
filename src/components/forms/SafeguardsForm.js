import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer, Select } from 'antd'
import { optionsTypes } from 'constants/safeguards'
import { saveSafeguards, updateSafeguards } from 'epics/safeguardsEpics'
import ParamsContext from 'store/context/ParamsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import ProjectsContext from 'store/context/ProjectsContext'

const SafeguardsForm = ({
	safeguardCode,
	setSafeguardCode,
	safeguardName,
	setSafeguardName,
}) => {
	const { assetsParams } = useContext(ParamsContext)
	const { getAssetsData, assets } = useContext(ProjectsContext)
	const {
		setSafeguardsFormToggle,
		safeguardsFormData,
		toggleSafeguardDataForm,
		setToggleSafeguardDataForm,
	} = useContext(ProjectsFormContext)

	const [threatList, setThreatList] = useState([])
	const [spinner, setSpinner] = useState(false)
	const [threatData, setThreatData] = useState([])

	const [form] = Form.useForm()
	const { Option } = Select

	const onFinish = async (values) => {
		setSpinner(true)
		if (safeguardsFormData?.id) {
			const response = await updateSafeguards(
				safeguardsFormData.id,
				values.safeguard_type,
				threatList,
				values.safeguard_description,
				assetsParams
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveSafeguards(
				safeguardCode,
				safeguardName,
				values.safeguard_type,
				assetsParams,
				threatList,
				values.safeguard_description
			)
			await setAfterSaveProjects(response)
		}
	}

	const handleChange = (values) => {
		const threatListSend = []
		values.map((item) =>
			threatListSend.push(threatData.find((option) => option.value === item))
		)
		const threat = threatListSend.map((treath) => {
			return { treath_code: treath?.key, treath_name: treath?.value }
		})
		setThreatList(threat)
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setToggleSafeguardDataForm()
			await getAssetsData(assetsParams)
			onReset()
		}
		if (!safeguardsFormData?.id) {
			setSafeguardsFormToggle()
		}
		setSpinner(false)
	}

	const onReset = () => {
		form.resetFields()
		setSafeguardCode('')
		setSafeguardName('')
		setThreatList([])
	}

	const getThreats = () => {
		const threatList = assets
			?.map((asset) => {
				return asset?.threat?.threats.map((threatData) => ({
					key: threatData.key,
					value: threatData.title,
				}))
			})
			.flat()
		setThreatData([...new Set(threatList)] || [])
	}

	useEffect(() => {
		getThreats()
	}, [assets])

	useEffect(() => {
		const defaultThreats = safeguardsFormData?.threatList?.map(
			(item) => item?.treath_name
		)

		form.setFieldsValue({
			safeguard_type: safeguardsFormData?.safeguardType || [],
			safeguard_threats_list: defaultThreats || [],
			safeguard_description: safeguardsFormData?.safeguardDescription || '',
		})
		setThreatList(safeguardsFormData?.threatList || [])
	}, [safeguardsFormData])

	return (
		<Drawer
			title={safeguardName}
			width={400}
			onClose={setToggleSafeguardDataForm}
			visible={toggleSafeguardDataForm}
		>
			<Spin spinning={spinner}>
				<Form
					name='assets-form'
					className='safeguard-form'
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
							placeholder='Seleccione una salvaguarda'
							optionFilterProp='children'
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
						name='safeguard_threats_list'
						rules={[
							{
								required: true,
								message: '¡Ingrese las amenazas!',
							},
						]}
					>
						<Select
							mode='multiple'
							placeholder='Seleccione las amenazas'
							className='select-safeguard-forms'
							onChange={handleChange}
							options={threatData}
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
							{safeguardsFormData?.id
								? 'Actualizar Salvaguarda'
								: 'Crear Salvaguarda'}
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</Drawer>
	)
}

export default SafeguardsForm
