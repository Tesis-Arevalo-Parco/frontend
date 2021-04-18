import { useState } from 'react'
import { Layout, Menu, Divider } from 'antd'
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons'

import images from 'constants/assets'

const UserDashboard = () => {
	const { Header, Content, Sider } = Layout
	const { SubMenu } = Menu
	const [collapsed, setCollapsed] = useState(false)
	return (
		<Layout style={{ minHeight: '100vh' }} className='user-dashboard'>
			<Sider
				collapsible
				theme='light'
				collapsed={collapsed}
				onCollapse={() => setCollapsed(!collapsed)}
				style={{ backgroundColor: '#4E73DF' }}
			>
				<img className='logo' src={images.MAIN_LOGO} />
				<Menu
					defaultSelectedKeys={['1']}
					mode='inline'
					theme='dark'
					style={{ float: 'right', backgroundColor: '#4E73DF' }}
				>
					<Menu.Item key='1' icon={<PieChartOutlined />}>
						Option 1
					</Menu.Item>
					<Menu.Item key='2' icon={<DesktopOutlined />}>
						Option 2
					</Menu.Item>
					<SubMenu key='sub1' icon={<UserOutlined />} title='User'>
						<Menu.Item key='3'>Tom</Menu.Item>
						<Menu.Item key='4'>Bill</Menu.Item>
						<Menu.Item key='5'>Alex</Menu.Item>
					</SubMenu>
					<SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
						<Menu.Item key='6'>Team 1</Menu.Item>
						<Menu.Item key='8'>Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key='9' icon={<FileOutlined />}>
						Files
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					<Menu theme='light' mode='horizontal' defaultSelectedKeys={['2']}>
						<SubMenu key='SubMenu' title='Alex' style={{ float: 'right' }}>
							<Menu.Item key='setting:1'>Option 1</Menu.Item>
							<Menu.Item key='setting:2'>Option 2</Menu.Item>
							<Divider style={{ color: 'red', backgroundColor: 'red' }} />
							<Menu.Item key='setting:2'>Option 2</Menu.Item>
						</SubMenu>
					</Menu>
				</Header>
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
