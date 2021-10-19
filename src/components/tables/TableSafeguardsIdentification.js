/* eslint-disable camelcase */
import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space, Popconfirm, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ParamsContext from 'store/context/ParamsContext'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import SearchInput from 'components/SearchInput'
import EmptyImage from 'components/EmptyImage'
import images from 'constants/assets'
import { deleteSafeguards } from 'epics/safeguardsEpics'

const TableSafeguardsIdentification = ({ safeguards }) => {
	const [localSafeguards, setLocalSafeguards] = useState([])
	const { getSafeguardsData } = useContext(ProjectsContext)
	const { safeguardsParams } = useContext(ParamsContext)
	const {
		setSafeguardsFormToggle,
		setSafeguardsFormChildrenToggle,
		setSafeguardsFormData,
	} = useContext(ProjectsFormContext)

	const updateSafeguards = (
		id,
		safeguard_code,
		safeguard_name,
		safeguard_type,
		treath_list,
		safeguard_description
	) => {
		setSafeguardsFormData(
			id,
			safeguard_code,
			safeguard_name,
			safeguard_type,
			treath_list,
			safeguard_description
		)
		setSafeguardsFormChildrenToggle()
	}

	const deleteSafeguardsById = async (id) => {
		await deleteSafeguards(id)
		await getSafeguardsData(safeguardsParams)
	}

	const filterSafeguards = (safeguards) =>
		// safeguards.map((safeguard) => console.log(safeguard))
		safeguards.map((safeguard) => ({
			key: safeguard.id,
			safeguard_code: safeguard.safeguard_code,
			safeguard_name: safeguard.safeguard_name,
			safeguard_type: safeguard.safeguard_type,
			treath_list: safeguard.treath_list,
			safeguard_description: safeguard.safeguard_description,
		}))

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() =>
						updateSafeguards(
							dataItem.key,
							dataItem.safeguard_code,
							dataItem.safeguard_name,
							dataItem.safeguard_type,
							dataItem.treath_list,
							dataItem.safeguard_description
						)
					}
					icon={<EditOutlined />}
					className='update-button'
				/>
				<Popconfirm
					okText={POPCONFIRM_MESSAGES.YES}
					cancelText={POPCONFIRM_MESSAGES.NO}
					title={`¿Desea eliminar la salvaguarda ${dataItem.safeguard_name}?`}
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
			dataIndex: 'safeguard_code',
			key: 'safeguard_code',
			width: '30%',
		},
		{
			title: 'Nombre',
			dataIndex: 'safeguard_name',
			key: 'safeguard_name',
			width: '30%',
		},
		{
			title: 'Tipo',
			dataIndex: 'safeguard_type',
			key: 'safeguard_type',
			width: '30%',
		},
		{
			title: 'Amenazas',
			dataIndex: 'treath_list',
			key: 'treath_list',
			render: (treath_list) => (
				<span>
					{treath_list.map((treath) => {
						return <Tag key={treath.treath_name}>{treath.treath_name}</Tag>
					})}
				</span>
			),
			width: '40%',
		},
		{
			title: 'Descripcion',
			dataIndex: 'safeguard_description',
			key: 'safeguard_description',
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
			<SearchInput
				data={safeguards}
				setFilteredData={setLocalSafeguards}
				searchName='safeguard_code'
				placeholder='Buscar Salvaguarda'
			/>
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
