import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer, Select } from 'antd'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { optionsTypes } from 'constants/safeguards'
import { updateSafeguards } from 'epics/safeguardsEpics'
import ParamsContext from 'store/context/ParamsContext'
import ProjectsContext from 'store/context/ProjectsContext'

const SafeguardsUpdateForm = () => {
	const [form] = Form.useForm()
	const { Option } = Select
	const {
		setSafeguardsFormChildrenToggle,
		setSafeguardsFormToggle,
		toggleFormChildrenSafeguards,
		toggleFormSafeguards,
		safeguardsFormData,
	} = useContext(ProjectsFormContext)
	const { safeguardsParams } = useContext(ParamsContext)
	const [spinner, setSpinner] = useState(false)
	const [treathList, setTreathList] = useState([])
	const { getSafeguardsData } = useContext(ProjectsContext)

	const onFinish = async (values) => {
		setSpinner(true)
		if (safeguardsFormData.id) {
			const response = await updateSafeguards(
				safeguardsFormData.id,
				values.safeguard_code,
				values.safeguard_name,
				values.safeguard_type,
				treathList,
				values.safeguard_description,
				safeguardsParams
			)
			await setAfterSaveProjects(response)
		}
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setSafeguardsFormChildrenToggle()
			await getSafeguardsData(safeguardsParams)
			onReset()
		}
		setSpinner(false)
	}

	const onReset = () => {
		form.resetFields()
	}

	// Select Type
	const onChange = (value) => {
		console.log(value)
	}

	const onFocus = () => {
		console.log('focus')
	}

	const onSearch = (val) => {
		console.log('search:', val)
	}

	// Select Treath List

	const optionsSelect = [
		{ key: '[F]', value: 'F Fuego' },
		{ key: '[W]', value: 'W Humedad' },
	]

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

	useEffect(() => {
		if (toggleFormChildrenSafeguards) {
			const treath = []
			safeguardsFormData.treath_list.map((item) =>
				treath.push(item.treath_name)
			)
			console.log(treath)
			form.setFieldsValue({
				safeguard_code: safeguardsFormData.safeguard_code,
				safeguard_name: safeguardsFormData.safeguard_name,
				safeguard_type: safeguardsFormData.safeguard_type,
				treath_list: treath,
				safeguard_description: safeguardsFormData.safeguard_description,
			})
		}
	}, [safeguardsFormData])

	return (
		<>
			<Drawer
				title='Actualizar Salvaguarda'
				placement='right'
				width={500}
				onClose={setSafeguardsFormChildrenToggle}
				visible={toggleFormChildrenSafeguards}
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
							name='safeguard_code'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el codigo de la salvaguarda!',
								},
							]}
						>
							<Input placeholder='Codigo' type='text' />
						</Form.Item>
						<Form.Item
							label='Nombre de la Salvaguarda'
							name='safeguard_name'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el nombre de la salvaguarda!',
								},
							]}
						>
							<Input placeholder='Nombre' type='text' />
						</Form.Item>
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
								style={{ width: 200 }}
								placeholder='Seleccione el tipo de salvaguarda'
								optionFilterProp='children'
								onChange={onChange}
								onFocus={onFocus}
								onSearch={onSearch}
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >=
									0
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
							name='treath_list'
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
								style={{ width: '100%' }}
								placeholder='Please select'
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
								Actualizar Salvaguarda
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Drawer>
		</>
	)
}
export default SafeguardsUpdateForm
