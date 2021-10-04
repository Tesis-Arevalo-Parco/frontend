import { useState, useMemo } from 'react'
import {
	Collapse,
	Table,
	Form,
	InputNumber,
	Typography,
	Popconfirm,
} from 'antd'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import { updateThreatValue } from 'epics/threatsEpics'

const TableThreatsValue = ({ assets }) => {
	const { Panel } = Collapse
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record) => record.key === editingKey

	const edit = (record) => {
		form.setFieldsValue({
			authenticity: record?.authenticity || '',
			availability: record?.availability || '',
			confidentiality: record?.confidentiality || '',
			integrity: record?.integrity || '',
			probability: record?.probability || '',
			traceability: record?.traceability || '',
		})
		setEditingKey(record?.key)
	}

	const cancel = () => {
		setEditingKey('')
	}

	const save = async (record) => {
		console.log('key', record)
		const rowss = await form.validateFields()
		console.log('rowss', rowss)
		try {
			const row = await form.validateFields()
			const data = {
				authenticity: { keyValue: record.key, value: row?.authenticity || '' },
				availability: { keyValue: record.key, value: row?.availability || '' },
				confidentiality: {
					keyValue: record.key,
					value: row?.confidentiality || '',
				},
				integrity: { keyValue: record.key, value: row?.integrity || '' },
				probability: { keyValue: record.key, value: row?.probability || '' },
				traceability: { keyValue: record.key, value: row?.traceability || '' },
			}
			// updateThreatValue(record.threatId, data)
			console.log(data)
			/* 	const newData = [...data]
			const index = newData.findIndex((item) => key === item.key)

			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, { ...item, ...row })
				setData(newData)
				setEditingKey('')
			} else {
				newData.push(row)
				setData(newData)
				setEditingKey('')
			} */
		} catch (errInfo) {
			// eslint-disable-next-line no-console
			console.error('Validate Failed:', errInfo)
		}
	}

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
			onCell: (record) => ({
				record,
				dataIndex: DATA_ASSETS_VALUE.probability.value,
				title: DATA_ASSETS_VALUE.probability.label,
			}),
		},
		{
			title: DATA_ASSETS_VALUE.probability.label,
			dataIndex: DATA_ASSETS_VALUE.probability.value,
			key: DATA_ASSETS_VALUE.probability.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.probability.value,
				title: DATA_ASSETS_VALUE.probability.label,
			}),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.availability.label,
			dataIndex: DATA_ASSETS_VALUE.availability.value,
			key: DATA_ASSETS_VALUE.availability.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.availability.value,
				title: DATA_ASSETS_VALUE.availability.label,
			}),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.integrity.label,
			dataIndex: DATA_ASSETS_VALUE.integrity.value,
			key: DATA_ASSETS_VALUE.integrity.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.integrity.value,
				title: DATA_ASSETS_VALUE.integrity.label,
			}),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.confidentiality.label,
			dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
			key: DATA_ASSETS_VALUE.confidentiality.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
				title: DATA_ASSETS_VALUE.confidentiality.label,
			}),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.authenticity.label,
			dataIndex: DATA_ASSETS_VALUE.authenticity.value,
			key: DATA_ASSETS_VALUE.authenticity.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.authenticity.value,
				title: DATA_ASSETS_VALUE.authenticity.label,
			}),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.traceability.label,
			dataIndex: DATA_ASSETS_VALUE.traceability.value,
			key: DATA_ASSETS_VALUE.traceability.value,
			editable: true,
			onCell: (record) => ({
				record,
				editing: isEditing(record),
				dataIndex: DATA_ASSETS_VALUE.traceability.value,
				title: DATA_ASSETS_VALUE.traceability.label,
			}),
			align: 'center',
		},
		{
			title: 'Acción',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record)
				return editable ? (
					<span>
						<a
							href='javascript:;'
							onClick={() => save(record)}
							style={{
								marginRight: 8,
							}}
						>
							Guardar
						</a>
						<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
							<a>Cancelar</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ''}
						onClick={() => edit(record)}
					>
						Editar
					</Typography.Link>
				)
			},
		},
	]

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
						<InputNumber />
					</Form.Item>
				) : (
					children
				)}
			</td>
		)
	}

	const valueData = (threat, key, valueKey) => {
		const threatDataF = threat[valueKey]?.find((item) => item?.keyValue === key)
		return threatDataF ? threatDataF.value : ''
	}

	const buildThreatTable = (threat) => {
		const filterData = threat?.threats?.map((threatData) => ({
			key: threatData?.key,
			name: threatData?.title,
			availability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value
			),
			integrity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value
			),
			confidentiality: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value
			),
			authenticity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value
			),
			traceability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value
			),
			probability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.probability.value
			),
			vulnerability: threat?.vulnerabilities,
			threatId: threat?.id,
		}))

		return (
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					className='table-threats'
					rowClassName='editable-row'
					columns={columns}
					bordered
					dataSource={filterData}
					pagination={{
						onChange: cancel,
					}}
				/>
			</Form>
		)
	}

	const getPanel = () => {
		return assets.map((data, key) => (
			<Panel
				header={`${data?.name} / ${data?.model} / ${data?.identification}`}
				key={key}
			>
				{buildThreatTable(data?.threat)}
			</Panel>
		))
	}

	const getMemoPanel = useMemo(() => getPanel(), [assets, isEditing])

	return <Collapse defaultActiveKey={[0]}>{getMemoPanel}</Collapse>
}

export default TableThreatsValue
