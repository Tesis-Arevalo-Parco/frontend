import { useState, useEffect, useContext } from 'react'
import { Table, Tag, Form, InputNumber, Space, Button, Spin } from 'antd'
import {
	EditOutlined,
	SaveOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons'

import EmptyImage from 'components/EmptyImage'
import images from 'constants/assets'
import { updateSafeguardsValue } from 'epics/safeguardsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'

const TableSafeguardsValue = ({ safeguards }) => {
	const { getAssetsData } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const [localSafeguards, setLocalSafeguards] = useState([])
	const [spinner, setSpinner] = useState(false)
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')

	const isEditing = (record) => record.key === editingKey

	const save = async (data) => {
		try {
			setSpinner(true)
			const row = await form.validateFields()
			const totalEffectiveness = calculateTotalEffectiveness(row.ei, row.ef)
			const response = await updateSafeguardsValue(
				data.key,
				row.ei,
				row.ef,
				totalEffectiveness
			)
			if (response) {
				cancelEdit()
				await getAssetsData(assetsParams)
			}
			setSpinner(false)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Validate Failed:', error)
		}
	}

	const calculateTotalEffectiveness = (ei, ef) => {
		const result = Math.abs(1 - [(1 - ei / 100) * (1 - ef / 100)])
		return result * 100
	}

	const cancelEdit = () => {
		setEditingKey('')
	}

	// Eficacia frente al impacto ei
	// Eficacia frente a la probabilidad ef
	//
	// Eficacia

	const columns = [
		{
			title: 'Código',
			dataIndex: 'code',
			key: 'code',
			width: '10%',
		},
		{
			title: 'Salvaguarda',
			dataIndex: 'safeguard',
			key: 'safeguard',
			width: '15%',
		},
		{
			title: 'Amenazas',
			dataIndex: 'threat',
			key: 'threat',
			render: (threatList) => (
				<span>
					{threatList?.map((threat) => {
						return <Tag key={threat.treath_name}>{threat.treath_name}</Tag>
					})}
				</span>
			),
			width: '40%',
		},
		{
			title: 'Eficacia frente al impacto',
			dataIndex: 'ei',
			key: 'ei',
			width: '15%',
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: 'ei',
				title: 'Ei',
			}),
			align: 'center',
		},
		{
			title: 'Eficacia frente a la probabilidad',
			dataIndex: 'ef',
			key: 'ef',
			width: '15%',
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: 'ef',
				title: 'Ef',
			}),
			align: 'center',
		},
		{
			title: 'Eficacia',
			dataIndex: 'effectiveness',
			key: 'effectiveness',
			width: '10%',
			align: 'center',
		},
		{
			title: 'Acción',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record)
				return editable ? (
					<Space className='table-button-actions'>
						<Button
							key='save'
							onClick={() => save(record)}
							icon={<SaveOutlined />}
							className='update-button'
						/>

						<Button
							onClick={cancelEdit}
							key='cancel'
							icon={<CloseCircleOutlined />}
							className='delete-button'
						/>
					</Space>
				) : (
					<Button
						key='edit'
						disabled={editingKey !== ''}
						onClick={() => edit(record)}
						icon={<EditOutlined />}
						className='update-button'
					/>
				)
			},
		},
	]

	const edit = (record) => {
		form.setFieldsValue({
			ei: record?.ei ?? 0,
			ef: record?.ef ?? 0,
		})
		setEditingKey(record?.key)
	}

	const EditableCell = ({
		editing,
		dataIndex,
		title,
		inputType,
		record,
		index,
		children,
		...restProps
	}) => {
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{
							margin: 0,
						}}
					>
						<InputNumber
							min={0}
							max={100}
							formatter={(value) => `${value}%`}
							parser={(value) => value.replace('%', '')}
						/>
					</Form.Item>
				) : (
					children
				)}
			</td>
		)
	}

	const filterSafeguards = (safeguards) =>
		safeguards.map((safeguard) => ({
			key: safeguard.id,
			code: safeguard.safeguard_code,
			safeguard: safeguard.safeguard_name,
			threat: safeguard.treath_list,
			ei: safeguard?.effectiveness_against_impact,
			ef: safeguard?.effectiveness_against_probability,
			effectiveness: safeguard?.total_effectiveness || '',
		}))

	useEffect(() => {
		setLocalSafeguards(safeguards)
	}, [safeguards])

	return (
		<div className='table-safeguards'>
			<Form form={form} component={false}>
				<Spin spinning={spinner}>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						rowClassName='editable-row'
						columns={columns}
						bordered
						dataSource={filterSafeguards(localSafeguards)}
						pagination={{
							onChange: cancelEdit,
						}}
						locale={{
							emptyText: (
								<EmptyImage
									buttonText='Crear activo'
									image={images.EMPTY_IMG}
									description='No se logró encontrar salvaguardas'
								/>
							),
						}}
					/>
				</Spin>
			</Form>
		</div>
	)
}

export default TableSafeguardsValue
