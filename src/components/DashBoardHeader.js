import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHeader, Select, Typography, Row, Button } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { paths } from 'constants/paths'

const DashBoardHeader = () => {
	const { Option } = Select
	const { projects } = useContext(ProjectsContext)
	const { toggleProjectsForm } = useContext(ProjectsFormContext)
	const location = useLocation()
	const { Title } = Typography
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

	const getHeader = () => {
		if (location.pathname.includes(paths.PROJECTS)) {
			return (
				<Row justify='space-between' align='middle'>
					<span level={2} className='header-card-title'>
						Proyectos
					</span>
					<Button
						type='primary'
						icon={<PlusCircleFilled />}
						onClick={toggleProjectsForm}
					>
						Crear nuevo proyecto
					</Button>
				</Row>
			)
		}
		return (
			<PageHeader
				title='Proyectos'
				className='site-page-header'
				subTitle={selectNode()}
			></PageHeader>
		)
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
					option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
	return <div className='dashboard-header'>{getHeader()}</div>
}

export default DashBoardHeader
