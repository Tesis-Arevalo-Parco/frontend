import { useContext } from 'react'
import { Collapse, Table, Form, Spin } from 'antd'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TablePotentialRisk = ({ safeguardsWithThreatRisk }) => {
	const { Panel } = Collapse
	const [form] = Form.useForm()
	const { active } = useContext(SpinnerContext)

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Riesgo Acumulado Potencial',
			children: [
				{
					title: DATA_ASSETS_VALUE.availability.label,
					dataIndex: DATA_ASSETS_VALUE.availability.value,
					key: DATA_ASSETS_VALUE.availability.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.integrity.label,
					dataIndex: DATA_ASSETS_VALUE.integrity.value,
					key: DATA_ASSETS_VALUE.integrity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.confidentiality.label,
					dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
					key: DATA_ASSETS_VALUE.confidentiality.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.authenticity.label,
					dataIndex: DATA_ASSETS_VALUE.authenticity.value,
					key: DATA_ASSETS_VALUE.authenticity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.traceability.label,
					dataIndex: DATA_ASSETS_VALUE.traceability.value,
					key: DATA_ASSETS_VALUE.traceability.value,
					editable: true,
					align: 'center',
				},
			],
		},
		{
			title: 'Riesgo Repercutido Potencial',
			children: [
				{
					title: DATA_ASSETS_VALUE.availability.label,
					dataIndex: DATA_ASSETS_VALUE.availability.value,
					key: DATA_ASSETS_VALUE.availability.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.integrity.label,
					dataIndex: DATA_ASSETS_VALUE.integrity.value,
					key: DATA_ASSETS_VALUE.integrity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.confidentiality.label,
					dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
					key: DATA_ASSETS_VALUE.confidentiality.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.authenticity.label,
					dataIndex: DATA_ASSETS_VALUE.authenticity.value,
					key: DATA_ASSETS_VALUE.authenticity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.traceability.label,
					dataIndex: DATA_ASSETS_VALUE.traceability.value,
					key: DATA_ASSETS_VALUE.traceability.value,
					editable: true,
					align: 'center',
				},
			],
		},
	]

	const buildThreatTable = (filterData) => {
		return (
			<Form form={form} component={false}>
				<Spin spinning={active}>
					<Table
						className='table-threats'
						rowClassName='editable-row'
						columns={columns}
						bordered
						dataSource={filterData}
					/>
				</Spin>
			</Form>
		)
	}

	const getPanel = () => {
		return safeguardsWithThreatRisk?.map((asset, key) => {
			return (
				<Panel
					header={`${asset?.name} / ${asset?.model} / ${asset?.identification}`}
					key={key}
				>
					{buildThreatTable(asset.data)}
				</Panel>
			)
		})
	}

	return <Collapse defaultActiveKey={[0]}>{getPanel()}</Collapse>
}

export default TablePotentialRisk
