import { useContext } from 'react'
import { Collapse, Table, Spin } from 'antd'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TableSafeguardThreatsValue = ({ safeguardsWithThreat }) => {
	const { Panel } = Collapse
	const { active } = useContext(SpinnerContext)

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: DATA_ASSETS_VALUE.probability.label,
			dataIndex: DATA_ASSETS_VALUE.probability.value,
			key: DATA_ASSETS_VALUE.probability.value,
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.availability.label,
			dataIndex: DATA_ASSETS_VALUE.availability.value,
			key: DATA_ASSETS_VALUE.availability.value,
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.integrity.label,
			dataIndex: DATA_ASSETS_VALUE.integrity.value,
			key: DATA_ASSETS_VALUE.integrity.value,
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.confidentiality.label,
			dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
			key: DATA_ASSETS_VALUE.confidentiality.value,
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.authenticity.label,
			dataIndex: DATA_ASSETS_VALUE.authenticity.value,
			key: DATA_ASSETS_VALUE.authenticity.value,
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.traceability.label,
			dataIndex: DATA_ASSETS_VALUE.traceability.value,
			key: DATA_ASSETS_VALUE.traceability.value,
			align: 'center',
		},
	]

	const buildThreatTable = (filterData) => {
		return (
			<Spin spinning={active}>
				<Table
					className='table-threats'
					rowClassName='editable-row'
					columns={columns}
					bordered
					dataSource={filterData}
				/>
			</Spin>
		)
	}
	const getPanel = () => {
		return safeguardsWithThreat.map((safeguard, key) => (
			<Panel
				header={`${safeguard?.name} / ${safeguard?.model} / ${safeguard?.identification}`}
				key={key}
			>
				{buildThreatTable(safeguard?.data)}
			</Panel>
		))
	}

	return <Collapse defaultActiveKey={[0]}>{getPanel()}</Collapse>
}

export default TableSafeguardThreatsValue
