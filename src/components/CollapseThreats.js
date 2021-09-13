import { useState } from 'react'
import { Collapse, Table, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import ThreatsValueModal from 'components/modals/ThreatsValueModal'

const CollapseThreats = ({ assets }) => {
	const { Panel } = Collapse
	const [toggleModal, setToggleModal] = useState(false)
	const [dataModal, setDataModal] = useState({})

	const onClickThreat = (dataItem) => {
		setDataModal(dataItem)
		setToggleModal(true)
	}

	const tableActions = (dataItem) => {
		return (
			<Button
				key='edit'
				icon={<EditOutlined />}
				className='update-threat-button'
				onClick={() => onClickThreat(dataItem)}
			/>
		)
	}

	const findVulnerability = (vulnerability, key) =>
		vulnerability.find((item) => item.key === key)

	const vulnerabilityData = (data) => {
		const dataVulnerability = findVulnerability(data?.vulnerability, data?.key)
		if (data?.vulnerability) {
			return <div>{dataVulnerability?.value}</div>
		}
	}

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Vulnerabilidades',
			dataIndex: 'vulnerability ',
			key: 'vulnerability',
			render: (_, record) => vulnerabilityData(record),
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: (_, record) => tableActions(record),
		},
	]

	const buildThreatTable = (threats, id, vulnerabilities) => {
		const filterData = threats?.map((threatData) => ({
			key: threatData?.key,
			name: threatData?.title,
			vulnerability: vulnerabilities,
			assetId: id,
		}))
		return <Table columns={columns} bordered={true} dataSource={filterData} />
	}

	return (
		<>
			<Collapse defaultActiveKey={[0]}>
				{assets.map((data, key) => (
					<Panel
						header={`${data?.name} / ${data?.model} / ${data?.identification}`}
						key={key}
					>
						{buildThreatTable(data?.threats, data?.id, data?.vulnerabilities)}
					</Panel>
				))}
			</Collapse>
			<ThreatsValueModal
				toggleModal={toggleModal}
				setToggleModal={setToggleModal}
				dataModal={dataModal}
			/>
		</>
	)
}

export default CollapseThreats
