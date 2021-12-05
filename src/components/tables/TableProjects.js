/* eslint-disable camelcase */
import { useContext, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Table, Button, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import ProjectsContext from 'store/context/ProjectsContext'
import SearchInput from 'components/SearchInput'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import { deleteProject } from 'epics/projectsEpics'
import images from 'constants/assets'
import EmptyImage from 'components/EmptyImage'

const TableProjects = () => {
	const {
		setProjectsFormToggle,
		toggleFormProject,
		setProjectsFormData,
	} = useContext(ProjectsFormContext)
	const { projects, getProjectsData } = useContext(ProjectsContext)
	const [localProjects, setLocalProjects] = useState([])
	const history = useHistory()
	const searchLocation = useLocation().search
	const params = new URLSearchParams(searchLocation)
	const appendParams = new URLSearchParams()
	const getSelectedProject = params.get('selectedProject')

	const deleteProjects = async (id) => {
		await deleteProject(id)
		await getProjectsData()
	}

	const updateProject = (
		id,
		code_project,
		name,
		date_project,
		security_manager,
		description
	) => {
		appendParams.append('selectedProject', id)
		history.push({ search: appendParams.toString() })
		setProjectsFormData(
			id,
			code_project,
			name,
			date_project,
			security_manager,
			description
		)
		setProjectsFormToggle()
	}

	useEffect(() => {
		if (getSelectedProject && !toggleFormProject) {
			params.delete('selectedProject')
			history.push({ search: params.toString() })
		}
	}, [toggleFormProject])

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() =>
						updateProject(
							dataItem.key,
							dataItem.code_project,
							dataItem.name,
							dataItem.date_project,
							dataItem.security_manager,
							dataItem.description
						)
					}
					icon={<EditOutlined />}
					className='update-button'
				/>
				<Popconfirm
					okText={POPCONFIRM_MESSAGES.YES}
					cancelText={POPCONFIRM_MESSAGES.NO}
					title={`¿Desea eliminar el proyecto ${dataItem.name}?`}
					onConfirm={() => deleteProjects(dataItem.key)}
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
	const filterProjects = (projects) =>
		projects.map((project) => ({
			key: project.id,
			code_project: project.code_project,
			name: project.name,
			date_project: project.date_project,
			security_manager: project.security_manager,
			description: project.description,
		}))

	const columns = [
		{
			title: 'Codigo',
			dataIndex: 'code_project',
			key: 'code_project',
			width: '20%',
		},
		{ title: 'Nombre', dataIndex: 'name', key: 'name', width: '20%' },
		{
			title: 'Fecha',
			dataIndex: 'date_project',
			key: 'date_project',
			width: '20%',
		},
		{
			title: 'Responsable de Seguridad',
			dataIndex: 'security_manager',
			key: 'security_manager',
			width: '20%',
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
			width: '25%',
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
		setLocalProjects(projects)
	}, [projects])

	return (
		<div className='table-project-expandable'>
			<SearchInput
				data={projects}
				setFilteredData={setLocalProjects}
				searchName='name'
				placeholder='Buscar proyecto'
			/>
			<Table
				columns={columns}
				bordered={true}
				dataSource={filterProjects(localProjects)}
				locale={{
					emptyText: (
						<EmptyImage
							buttonText='Crear proyecto'
							image={images.EMPTY_IMG}
							description='No se logró encontrar proyectos'
							onClick={setProjectsFormToggle}
						/>
					),
				}}
			/>
		</div>
	)
}

export default TableProjects
