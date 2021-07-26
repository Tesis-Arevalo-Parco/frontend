import { useEffect, useContext, useState } from 'react'
import { Layout, Card } from 'antd'
import { Route } from 'react-router-dom'
import SideNavBar from 'components/SideNavBar'
import Header from 'components/Header'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsForm from 'components/forms/ProjectsForm'
import AssetsForm from 'components/forms/AssetsForm'
import DashBoardHeader from 'components/DashBoardHeader'
import { paths } from 'constants/paths'
import Projects from 'pages/Projects'
import AssetsIdentification from 'pages/assets/AssetsIdentification'
import Assets from 'pages/assets/Assets'
import Dependencies from 'pages/assets/Dependencies'
import RegisterDependencies from 'pages/assets/RegisterDependencies'
import Uploader from 'components/Upload'

const UserDashboard = () => {
	const { getProjectsData } = useContext(ProjectsContext)
	const [fakeSideNavbar, setFakeSideNavbar] = useState(false)

	useEffect(() => {
		getProjectsData()
	}, [])

	return (
		<Layout className='user-dashboard'>
			{fakeSideNavbar ? (
				<div className='fake-side-bar-sm'></div>
			) : (
				<div className='fake-side-bar-lg'></div>
			)}
			<SideNavBar setFakeSideNavbar={setFakeSideNavbar} />
			<Layout className='site-layout'>
				<Header />
				<Card title={<DashBoardHeader />} className='main-content'>
					<Route path={paths.ASSETS_IDENTIFICATION} exact={false}>
						<Route
							path={`${paths.ASSETS_IDENTIFICATION}/:id`}
							component={AssetsIdentification}
						/>
						<Route
							path={paths.ASSETS_IDENTIFICATION}
							component={Assets}
							exact
						/>
					</Route>
					<Route path={paths.ASSETS_REGISTER} exact={false}>
						<Route
							path={`${paths.ASSETS_REGISTER}/:id`}
							component={RegisterDependencies}
						/>
						<Route
							path={paths.ASSETS_REGISTER}
							component={Dependencies}
							exact
						/>
					</Route>
					<Route
						component={() => <div>Valoracion de activos</div>}
						path={paths.ASSETS_VALUATION}
					/>
					<Route
						component={() => <div>Lista de activos</div>}
						path={paths.ASSETS_LIST}
						exact
					/>
					<Route
						component={() => <div>Identificacion de Amenazas</div>}
						path={paths.THREAT_IDENTIFICATION}
						exact
					/>
					<Route
						component={() => <div>Valoracion de Amenazas</div>}
						path={paths.THREAT_VALUATION}
						exact
					/>
					<Route
						component={() => <div>Salvaguardas</div>}
						path={paths.SAFEGUARDS}
						exact
					/>
					<Route
						component={() => <div>estadísticas</div>}
						path={paths.STATICS}
						exact
					/>
					<Route component={Projects} path={paths.PROJECTS} exact />
					<Route
						component={() => <div>Root</div>}
						path={paths.ROOT_APP}
						exact
					/>
				</Card>
				<ProjectsForm />
				<AssetsForm />
				<Uploader />
			</Layout>
		</Layout>
	)
}

export default UserDashboard
