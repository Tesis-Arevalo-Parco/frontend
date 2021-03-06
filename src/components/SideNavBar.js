import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
	HomeFilled,
	FlagFilled,
	PieChartFilled,
	FireFilled,
} from '@ant-design/icons'
import { Row, Layout, Menu } from 'antd'
import { paths } from 'constants/paths'

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
					<Menu.Item key='1'>
						<NavLink
							to={paths.ASSETS_IDENTIFICATION}
							activeClassName='selected-nav-link'
						>
							Identificar activos
						</NavLink>
					</Menu.Item>
					<Menu.Item key='2' title='Registrar dependencias entre activos'>
						<NavLink
							to={paths.ASSETS_REGISTER}
							activeClassName='selected-nav-link'
						>
							Registrar dependencias entre activos
						</NavLink>
					</Menu.Item>
					<Menu.Item key='3'>
						<NavLink to={paths.ASSETS_LIST} activeClassName='selected-nav-link'>
							Lista de activos
						</NavLink>
					</Menu.Item>
					<Menu.Item key='4'>
						<NavLink
							to={paths.ASSETS_VALUATION}
							activeClassName='selected-nav-link'
						>
							Valorar activos
						</NavLink>
					</Menu.Item>
				</SubMenu>
				<SubMenu key='submenu-threats' icon={<FireFilled />} title='Amenazas'>
					<Menu.Item key='5'>
						<NavLink
							to={paths.THREAT_IDENTIFICATION}
							activeClassName='selected-nav-link'
						>
							Identificar amenazas
						</NavLink>
					</Menu.Item>
					<Menu.Item key='6'>
						<NavLink
							to={paths.THREAT_VALUATION}
							activeClassName='selected-nav-link'
						>
							Valorar amenazas
						</NavLink>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='7' icon={<FlagFilled />}>
					<NavLink
						to={paths.SAFEGUARDS}
						activeClassName='selected-nav-link'
						className='nav-link-router'
					>
						Salvaguardas
					</NavLink>
				</Menu.Item>
				<Menu.Item key='8' icon={<PieChartFilled />}>
					<NavLink
						className='nav-link-router'
						activeClassName='selected-nav-link'
						to={paths.STATICS}
					>
						Estad??sticas
					</NavLink>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNavBar
