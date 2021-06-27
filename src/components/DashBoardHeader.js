import { useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { PageHeader, Select, Row, Button, Col, Space } from 'antd'
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { paths } from 'constants/paths'

const DashBoardHeader = () => {
	const { Option } = Select
	const { projects } = useContext(ProjectsContext)
	const {
		setProjectsFormToggle,
		setProjectsFormData,
		setAssetsFormToggle,
	} = useContext(ProjectsFormContext)
	const location = useLocation()

	const onChange = (value) => {
		console.log(`selected ${value}`)
	}

	const onClickToggleFormProjects = () => {
		setProjectsFormData('', '', '')
		setProjectsFormToggle()
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
						onClick={onClickToggleFormProjects}
					>
						Crear nuevo proyecto
					</Button>
				</Row>
			)
		} else if (location.pathname.includes(paths.ASSETS_IDENTIFICATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Identificación de Activos
								</span>
								<Select
									showSearch
									style={{ width: 200, marginTop: '0.5rem' }}
									placeholder='Seleccione un proyecto'
									optionFilterProp='children'
									onChange={onChange}
									filterOption={(input, option) =>
										option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									{projects.map((project) => {
										return (
											<Option key={project.id} value={project.name}>
												<Link
													to={`${paths.ASSETS_IDENTIFICATION}/${project.id}`}
													style={{ display: 'block' }}
												>
													{project.name}
												</Link>
											</Option>
										)
									})}
								</Select>
							</Space>
						</Row>
						{projects.length ? (
							<Space size='middle'>
								<Button
									type='primary'
									icon={<PlusCircleFilled />}
									onClick={setAssetsFormToggle}
								>
									Ingresar Activo
								</Button>
								<Button
									type='primary'
									icon={<UploadOutlined />}
									onClick={() => null}
								>
									Cargar Activos
								</Button>
							</Space>
						) : null}
					</Row>
				</Col>
			)
		}
		return (
			<PageHeader title='Proyectos' className='site-page-header'></PageHeader>
		)
	}

	return <div className='dashboard-header'>{getHeader()}</div>
}

export default DashBoardHeader
