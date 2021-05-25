import { useContext } from 'react'
import { PageHeader, Button, Select, Divider } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'

const DashBoardHeader = () => {
	const { Option } = Select
	const { projects } = useContext(ProjectsContext)
	const { toggleProjectsForm } = useContext(ProjectsFormContext)
	function onChange(value) {
		console.log(`selected ${value}`)
	}

	function onBlur() {
		console.log('blur')
	}

	function onFocus() {
		console.log('focus')
	}

	function onSearch(val) {
		console.log('search:', val)
	}
	const selectNode = () => {
		return (
			<Select
				showSearch
				style={{ width: 200 }}
				placeholder='Select a person'
				optionFilterProp='children'
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onSearch={onSearch}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{projects.map((project) => {
					return (
						<Option key={project.id} value={project.name}>
							{project.name}
						</Option>
					)
				})}
			</Select>
		)
	}
	return (
		<>
			<PageHeader
				title='Proyectos'
				className='site-page-header'
				subTitle={selectNode()}
				extra={[
					<Button key='toggleProjectsForm' onClick={toggleProjectsForm}>
						Crear nuevo proyecto
					</Button>,
				]}
			></PageHeader>
			<Divider />
		</>
	)
}

export default DashBoardHeader
