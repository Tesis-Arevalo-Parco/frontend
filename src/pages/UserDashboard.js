import { useEffect, useContext, useState } from 'react'
import { Layout, Card } from 'antd'
import SideNavBar from 'components/SideNavBar'
import Header from 'components/Header'
import { APP_ROUTES } from 'routes/routes'
import { RenderRoutes } from 'utils/routesUtils'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsForm from 'components/ProjectsForm'
import DashBoardHeader from 'components/DashBoardHeader'

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
					<RenderRoutes routes={APP_ROUTES} />
				</Card>
				<ProjectsForm />
			</Layout>
		</Layout>
	)
}

export default UserDashboard
