import { useContext, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { PageHeader, Select, Row, Button, Col, Space } from 'antd'
import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { paths } from 'constants/paths'
import ParamsContext from 'store/context/ParamsContext'

const DashBoardHeader = () => {
	const { Option } = Select
	const { projects } = useContext(ProjectsContext)
	const { assetsParams, projectName, setProjectName } = useContext(
		ParamsContext
	)
	const {
		setProjectsFormToggle,
		setProjectsFormData,
		setAssetsFormToggle,
		setAssetsFormData,
		setUploadToggle,
	} = useContext(ProjectsFormContext)
	const location = useLocation()

	const onClickToggleFormProjects = () => {
		setProjectsFormData('', '', '')
		setProjectsFormToggle()
	}

	const onClickToggleFormAssets = () => {
		setAssetsFormData('', '', '', '')
		setAssetsFormToggle()
	}

	useEffect(() => {
		const response = projects.find((project) => project.id === assetsParams)
		if (response) {
			setProjectName(response.name)
		}
	}, [projects])

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
									filterOption={(input, option) =>
										option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									value={projectName}
								>
									{projects.map((project) => {
										return (
											<Option key={project.id} value={project.name}>
												<Link
													to={`${paths.ASSETS_IDENTIFICATION}/${project.id}`}
													style={{ display: 'block' }}
													onClick={() => setProjectName(project.name)}
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
									onClick={onClickToggleFormAssets}
								>
									Ingresar Activo
								</Button>
								<Button
									type='primary'
									icon={<UploadOutlined />}
									onClick={() => setUploadToggle(true)}
								>
									Cargar Activos
								</Button>
							</Space>
						) : null}
					</Row>
				</Col>
			)
		}
	}

	return <div className='dashboard-header'>{getHeader()}</div>
}

export default DashBoardHeader
