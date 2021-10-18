import { useState, useMemo, useEffect, useContext } from 'react'
import { Collapse, Table, Form, InputNumber, Spin, Button, Space } from 'antd'

import {
	EditOutlined,
	SaveOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import { updateThreatValue } from 'epics/threatsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const TableThreatsValue = ({ assets }) => {
	const { Panel } = Collapse
	const [form] = Form.useForm()
	const { getAssetsData } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const [editingKey, setEditingKey] = useState('')
	const { active } = useContext(SpinnerContext)
	const [localAssets, setLocalAssets] = useState([])
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

	const cancelEdit = () => {
		setEditingKey('')
	}

	useEffect(() => {
		if (assets?.length) {
			setLocalAssets(assets)
		}
	}, [assets])

	const save = async (record) => {
		try {
			const row = await form.validateFields()
			const data = {
				authenticity: { keyValue: record.key, value: row?.authenticity ?? '' },
				availability: { keyValue: record.key, value: row?.availability ?? '' },
				confidentiality: {
					keyValue: record.key,
					value: row?.confidentiality ?? '',
				},
				integrity: { keyValue: record.key, value: row?.integrity ?? '' },
				probability: { keyValue: record.key, value: row?.probability ?? '' },
				traceability: { keyValue: record.key, value: row?.traceability ?? '' },
			}
			const findThreat = [...localAssets].find(
				(asset) => asset?.threat?.id === record.threatId
			)

			if (findThreat) {
				const threatData = findThreat?.threat
				const authenticityIndex = threatData?.authenticity?.findIndex(
					(dataValue) => dataValue?.keyValue === data.authenticity.keyValue
				)
				const availabilityIndex = threatData?.availability?.findIndex(
					(dataValue) => dataValue?.keyValue === data.availability.keyValue
				)
				const confidentialityIndex = threatData?.confidentiality?.findIndex(
					(dataValue) => dataValue?.keyValue === data.confidentiality.keyValue
				)
				const integrityIndex = threatData?.integrity?.findIndex(
					(dataValue) => dataValue?.keyValue === data.integrity.keyValue
				)
				const probabilityIndex = threatData?.probability?.findIndex(
					(dataValue) => dataValue?.keyValue === data.probability.keyValue
				)
				const traceabilityIndex = threatData?.traceability?.findIndex(
					(dataValue) => dataValue?.keyValue === data.traceability.keyValue
				)

				if (authenticityIndex !== -1) {
					threatData?.authenticity?.splice(authenticityIndex, 1)
					threatData?.authenticity?.push(data.authenticity)
				} else {
					threatData?.authenticity?.push(data.authenticity)
				}

				if (availabilityIndex !== -1) {
					threatData?.availability?.splice(availabilityIndex, 1)
					threatData?.availability?.push(data.availability)
				} else {
					threatData?.availability?.push(data.availability)
				}

				if (confidentialityIndex !== -1) {
					threatData?.confidentiality?.splice(confidentialityIndex, 1)
					threatData?.confidentiality?.push(data.confidentiality)
				} else {
					threatData?.confidentiality?.push(data.confidentiality)
				}

				if (integrityIndex !== -1) {
					threatData?.integrity?.splice(integrityIndex, 1)
					threatData?.integrity?.push(data.integrity)
				} else {
					threatData?.integrity?.push(data.integrity)
				}

				if (probabilityIndex !== -1) {
					threatData?.probability?.splice(probabilityIndex, 1)
					threatData?.probability?.push(data.probability)
				} else {
					threatData?.probability?.push(data.probability)
				}

				if (traceabilityIndex !== -1) {
					threatData?.traceability?.splice(traceabilityIndex, 1)
					threatData?.traceability?.push(data.traceability)
				} else {
					threatData?.traceability?.push(data.traceability)
				}
				cancelEdit()
				await updateThreatValue(record.threatId, threatData)
				await getAssetsData(assetsParams)
			}
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
		const includesDimensions = record?.dimensions?.includes(dataIndex)
		const isDisable =
			!includesDimensions && dataIndex !== DATA_ASSETS_VALUE.probability.value
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{
							margin: 0,
						}}
					>
						<InputNumber disabled={isDisable} />
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
			dimensions: threatData?.dimensions,
		}))
		return (
			<Form form={form} component={false}>
				<Spin spinning={active}>
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
							onChange: cancelEdit,
						}}
					/>
				</Spin>
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
