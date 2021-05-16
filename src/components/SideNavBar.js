import { useState } from 'react'
import {
	HomeFilled,
	FlagFilled,
	PieChartFilled,
	FireFilled,
} from '@ant-design/icons'
import { Row, Layout, Menu } from 'antd'

import images from 'constants/assets'
const SideNavBar = () => {
	const { Sider } = Layout
	const { SubMenu } = Menu
	const [collapsed, setCollapsed] = useState(false)

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			className='side-nav-bar'
		>
			<Row justify='center'>
				<img className='logo' src={images.LOGO_WHITE} width='100px' />
			</Row>
			<Menu mode='inline' theme='light'>
				<SubMenu key='submenu-assets' icon={<HomeFilled />} title='Activos'>
					<Menu.Item key='1'>Identificar activos</Menu.Item>
					<Menu.Item key='2' title='Registrar dependencias entre activos'>
						Registrar dependencias entre activos
					</Menu.Item>
					<Menu.Item key='3'>Lista de activos</Menu.Item>
					<Menu.Item key='4'>Valorar activos</Menu.Item>
				</SubMenu>
				<SubMenu key='submenu-threats' icon={<FireFilled />} title='Amenazas'>
					<Menu.Item key='5'>Identificar amenazas</Menu.Item>
					<Menu.Item key='6'>Valorar amenazas</Menu.Item>
				</SubMenu>
				<Menu.Item key='7' icon={<FlagFilled />}>
					Salvaguardas
				</Menu.Item>
				<Menu.Item key='8' icon={<PieChartFilled />}>
					Estadísticas
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNavBar
