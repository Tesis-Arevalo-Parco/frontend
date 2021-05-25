import { useEffect, useContext } from 'react'
import { Layout } from 'antd'
import SideNavBar from 'components/SideNavBar'
import Header from 'components/Header'
import { APP_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsForm from 'components/ProjectsForm'
import DashBoardHeader from 'components/DashBoardHeader'

const UserDashboard = () => {
	const { Content } = Layout
	const { getProjectsData } = useContext(ProjectsContext)

	useEffect(() => {
		getProjectsData()
	}, [])

	return (
		<Layout style={{ height: '100vh' }} className='user-dashboard'>
			<SideNavBar />
			<Layout className='site-layout'>
				<Header />
				<Content className='main-content'>
					<div className='site-layout-background'>
						<DashBoardHeader />
						<RenderRoutes routes={APP_ROUTES} />
					</div>
				</Content>
				<ProjectsForm />
			</Layout>
		</Layout>
	)
}

export default UserDashboard
