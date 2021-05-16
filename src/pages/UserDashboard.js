import { Layout } from 'antd'
import SideNavBar from 'components/SideNavBar'
import Header from 'components/Header'

const UserDashboard = () => {
	const { Content } = Layout
	return (
		<Layout style={{ height: '100vh' }} className='user-dashboard'>
			<SideNavBar />
			<Layout className='site-layout'>
				<Header />
				<Content style={{ margin: '16px' }}>
					<div className='site-layout-background' style={{ padding: 24 }}>
						Bill is a cat.
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default UserDashboard
