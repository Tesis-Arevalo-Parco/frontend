import { useContext, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Select, Row, Button, Col, Space } from 'antd'
import {
	PlusCircleFilled,
	UploadOutlined,
	SaveOutlined,
} from '@ant-design/icons'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { paths } from 'constants/paths'
import ParamsContext from 'store/context/ParamsContext'
import { saveDependencies, updateDependencies } from 'epics/dependenciesEpics'
import SpinnerContext from 'store/context/SpinnerContext'
import UserContext from 'store/context/UserContext'

const DashBoardHeader = () => {
	const { Option } = Select

	const { getUserLoginData, user } = useContext(UserContext)
	const {
		projects,
		assetsDependencyId,
		assetsNewDependencies,
		getAssetsData,
	} = useContext(ProjectsContext)
	const { assetsParams, projectName, setProjectName } = useContext(
		ParamsContext
	)
	const { activeSpinner } = useContext(SpinnerContext)

	const {
		setProjectsFormToggle,
		setProjectsFormData,
		setAssetsFormToggle,
		setAssetsFormData,
		setSafeguardsFormToggle,
		setSafeguardsFormData,
		setUploadToggle,
	} = useContext(ProjectsFormContext)

	const location = useLocation()

	const onClickToggleFormProjects = () => {
		setProjectsFormData('', '', '')
		setProjectsFormToggle()
	}

	const onClickToggleFormAssets = () => {
		setAssetsFormData('', '', '', '', [])
		setAssetsFormToggle()
	}

	const onClickToggleFormSafeguards = () => {
		setSafeguardsFormData('', '', '', '', [], '')
		setSafeguardsFormToggle()
	}

	const onSaveAssetsDependencies = async () => {
		activeSpinner(true)
		if (assetsNewDependencies.length) {
			if (assetsDependencyId) {
				await updateDependencies(
					assetsDependencyId,
					assetsNewDependencies,
					assetsParams
				)
			} else {
				await saveDependencies(assetsNewDependencies, assetsParams)
			}
			await getAssetsData(assetsParams)
		}
		activeSpinner(false)
	}

	useEffect(() => {
		const response = projects.find((project) => project.id === assetsParams)
		if (response) {
			setProjectName(response.name)
		}
	}, [projects])

	useEffect(() => {
		getUserLoginData()
	}, [])

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
		} else if (location.pathname.includes(paths.ASSETS_REGISTER)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Registro de Dependencias
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
													to={`${paths.ASSETS_REGISTER}/${project.id}`}
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
									icon={<SaveOutlined />}
									onClick={onSaveAssetsDependencies}
								>
									Guardar
								</Button>
							</Space>
						) : null}
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.ASSETS_VALUATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Valoración de Activos
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
													to={`${paths.ASSETS_VALUATION}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.THREAT_IDENTIFICATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Identificación de Amenazas
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
													to={`${paths.THREAT_IDENTIFICATION}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.THREAT_VALUATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Valoración de Amenazas
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
													to={`${paths.THREAT_VALUATION}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.SAFEGUARDS_IDENTIFICATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Identificación de Salvaguardas
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
													to={`${paths.SAFEGUARDS_IDENTIFICATION}/${project.id}`}
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
									onClick={onClickToggleFormSafeguards}
								>
									Ingresar Salvaguarda
								</Button>
							</Space>
						) : null}
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.SAFEGUARDS_VALUATION)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Valoración de Salvaguardas
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
													to={`${paths.SAFEGUARDS_VALUATION}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.SAFEGUARDS_VALUATION_THREATS)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Valorar Amenazas implementando salvaguardas
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
													to={`${paths.SAFEGUARDS_VALUATION_THREATS}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.STATE_POTENTIAL_IMPACT)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Impacto Potencial
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
													to={`${paths.STATE_POTENTIAL_IMPACT}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.STATE_RESIDUAL_IMPACT)) {
			return (
				<Col>
					<Row justify='space-between' align='middle'>
						<Row justify='space-between' align='middle'>
							<Space size='middle'>
								<span level={2} className='header-card-title'>
									Impacto Residual
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
													to={`${paths.STATE_RESIDUAL_IMPACT}/${project.id}`}
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
					</Row>
				</Col>
			)
		} else if (location.pathname.includes(paths.ROOT_APP)) {
			return (
				<Row justify='space-between' align='middle'>
					<span level={2} className='header-card-title'>
						Bienvenido, {user.name}
					</span>
				</Row>
			)
		}
	}

	return <div className='dashboard-header'>{getHeader()}</div>
}

export default DashBoardHeader
