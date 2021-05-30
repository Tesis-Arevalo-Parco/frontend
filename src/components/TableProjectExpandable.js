import { useContext, useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import ProjectsContext from 'store/context/ProjectsContext'
import SearchInput from 'components/SearchInput'

const TableProjectExpandable = () => {
	const { toggleProjectsForm } = useContext(ProjectsFormContext)
	const { projects } = useContext(ProjectsContext)
	const [localProjects, setLocalProjects] = useState([])

	const tableActions = () => {
		return (
			<div>
				<Button key='toggleProjectsForm' onClick={toggleProjectsForm}>
					Crear nuevo proyecto
				</Button>
			</div>
		)
	}
	const filterProjects = (projects) =>
		projects.map((project) => ({
			key: project.id,
			name: project.name,
			description: project.description,
		}))

	const columns = [
		{ title: 'Nombre', dataIndex: 'name', key: 'name' },
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: tableActions,
		},
	]

	useEffect(() => {
		projects.length && setLocalProjects(projects)
	}, [projects])

	return (
		<div>
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
			/>
		</div>
	)
}

export default TableProjectExpandable
