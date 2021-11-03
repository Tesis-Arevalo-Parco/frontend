/* eslint-disable camelcase */
import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ParamsContext from 'store/context/ParamsContext'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import EmptyImage from 'components/EmptyImage'
import images from 'constants/assets'
import { deleteSafeguards } from 'epics/safeguardsEpics'

const TableSafeguardsIdentification = ({ safeguards }) => {
	const [localSafeguards, setLocalSafeguards] = useState([])
	const { getAssetsData } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const {
		setSafeguardsFormToggle,
		setSafeguardsFormData,
		setToggleSafeguardDataForm,
	} = useContext(ProjectsFormContext)

	const updateSafeguards = (
		id,
		safeguardCode,
		safeguardName,
		safeguardType,
		threatList,
		safeguardDescription
	) => {
		setSafeguardsFormData(
			id,
			safeguardCode,
			safeguardName,
			safeguardType,
			threatList,
			safeguardDescription
		)
		setToggleSafeguardDataForm()
	}

	const deleteSafeguardsById = async (id) => {
		await deleteSafeguards(id)
		await getAssetsData(assetsParams)
	}

	const filterSafeguards = (safeguards) =>
		safeguards?.map((safeguard) => ({
			key: safeguard.id,
			safeguardCode: safeguard.safeguard_code,
			safeguardName: safeguard.safeguard_name,
			safeguardType: safeguard.safeguard_type,
			threatList: safeguard.treath_list,
			safeguardDescription: safeguard.safeguard_description,
		}))

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() =>
						updateSafeguards(
							dataItem.key,
							dataItem.safeguardCode,
							dataItem.safeguardName,
							dataItem.safeguardType,
							dataItem.threatList,
							dataItem.safeguardDescription
						)
					}
					icon={<EditOutlined />}
					className='update-button'
				/>
				<Popconfirm
					okText={POPCONFIRM_MESSAGES.YES}
					cancelText={POPCONFIRM_MESSAGES.NO}
					title={`¿Desea eliminar la salvaguarda ${dataItem.safeguardName}?`}
					onConfirm={() => deleteSafeguardsById(dataItem.key)}
				>
					<Button
						key='delete'
						icon={<DeleteOutlined />}
						className='delete-button'
					/>
				</Popconfirm>
			</Space>
		)
	}
	const columns = [
		{
			title: 'Codigo',
			dataIndex: 'safeguardCode',
			key: 'safeguardCode',
			width: '30%',
		},
		{
			title: 'Nombre',
			dataIndex: 'safeguardName',
			key: 'safeguardName',
			width: '30%',
		},
		{
			title: 'Tipo',
			dataIndex: 'safeguardType',
			key: 'safeguardType',
			width: '30%',
		},
		{
			title: 'Amenazas',
			dataIndex: 'threatList',
			key: 'threatList',
			render: (threatList) => (
				<span>
					{threatList?.map((treath) => {
						return <Tag key={treath.treath_name}>{treath.treath_name}</Tag>
					})}
				</span>
			),
			width: '40%',
		},
		{
			title: 'Descripcion',
			dataIndex: 'safeguardDescription',
			key: 'safeguardDescription',
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

	useEffect(() => {
		setLocalSafeguards(safeguards)
	}, [safeguards])

	return (
		<div className='table-assets-expandable'>
			<Table
				columns={columns}
				bordered={true}
				dataSource={filterSafeguards(localSafeguards)}
				locale={{
					emptyText: (
						<EmptyImage
							buttonText='Crear Salvaguarda'
							image={images.EMPTY_IMG}
							description='No se logró encontrar Salvaguardas'
							onClick={setSafeguardsFormToggle}
						/>
					),
				}}
			/>
		</div>
	)
}

export default TableSafeguardsIdentification
