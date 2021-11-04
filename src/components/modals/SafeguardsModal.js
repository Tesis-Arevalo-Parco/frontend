import { useState, useContext, useEffect } from 'react'
import { Form, Button, Space, Table, Modal, Collapse } from 'antd'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { PlusOutlined } from '@ant-design/icons'
import ProjectsContext from 'store/context/ProjectsContext'
import SafeguardsForm from 'components/forms/SafeguardsForm'

const SafeguardsModal = () => {
	const [form] = Form.useForm()
	const { Panel } = Collapse
	const { safeguardsCatalog } = useContext(ProjectsContext)
	const [treeData, setTreeData] = useState([])
	const [safeguardCode, setSafeguardCode] = useState([])
	const [safeguardName, setSafeguardName] = useState([])

	const {
		setSafeguardsFormToggle,
		toggleFormSafeguards,
		safeguardsFormData,
		toggleSafeguardDataForm,
		setToggleSafeguardDataForm,
	} = useContext(ProjectsFormContext)

	const columns = [
		{
			title: 'Codigo',
			dataIndex: 'code',
			key: 'code',
			width: '20%',
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			width: '70%',
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: (_, record) => tableActions(record),
			width: '10%',
		},
	]

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() => {
						setToggleSafeguardDataForm()
						setSafeguardCode(dataItem.code)
						setSafeguardName(dataItem.name)
					}}
					icon={<PlusOutlined />}
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
			<Modal
				className='safeguards-modal'
				title={'Nueva Salvaguarda'}
				width={700}
				footer={null}
				visible={toggleFormSafeguards}
				onCancel={setSafeguardsFormToggle}
			>
				<Collapse>
					{treeData.map((safeguard) => (
						<Panel key={`code_${safeguard.value}`} header={safeguard.title}>
							<Table
								key={safeguard.key}
								columns={columns}
								bordered={true}
								dataSource={filterSafeguards(safeguard.children)}
							/>
						</Panel>
					))}
				</Collapse>
				{toggleSafeguardDataForm && (
					<SafeguardsForm
						safeguardCode={safeguardCode}
						setSafeguardCode={setSafeguardCode}
						safeguardName={safeguardName}
						setSafeguardName={setSafeguardName}
					/>
				)}
			</Modal>
			{!toggleFormSafeguards && (
				<SafeguardsForm
					safeguardCode={safeguardCode}
					setSafeguardCode={setSafeguardCode}
					safeguardName={safeguardName}
					setSafeguardName={setSafeguardName}
				/>
			)}
		</>
	)
}
export default SafeguardsModal
