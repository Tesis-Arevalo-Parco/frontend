import { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {
	HomeFilled,
	FlagFilled,
	ControlOutlined,
	FireFilled,
	SafetyCertificateFilled,
} from '@ant-design/icons'
import { Row, Layout, Menu } from 'antd'
import { paths } from 'constants/paths'
import images from 'constants/assets'
import { useMediaQuery } from 'utils/useMediaQuery'

const SideNavBar = ({ setFakeSideNavbar }) => {
	const { Sider } = Layout
	const { SubMenu } = Menu
	const history = useHistory()
	const [collapsed, setCollapsed] = useState(false)
	const isPageWide = useMediaQuery('(max-width: 600px)')

	useEffect(() => {
		isPageWide && setCollapsed(isPageWide)
	}, [isPageWide])

	useEffect(() => {
		setFakeSideNavbar(collapsed)
	}, [collapsed])

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => setCollapsed(!collapsed)}
			className='side-nav-bar'
		>
			<Row justify='center'>
				<img
					className='logo'
					src={images.LOGO_WHITE}
					width='75px'
					onClick={() => history.push(`${paths.ROOT_APP}`)}
					style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
				/>
			</Row>
			<Menu mode='inline' theme='light'>
				<Menu.Item key='1' icon={<SafetyCertificateFilled />}>
					<NavLink
						className='nav-link-router'
						activeClassName='selected-nav-link'
						to={paths.PROJECTS}
					>
						Proyectos
					</NavLink>
				</Menu.Item>
				<SubMenu key='submenu-assets' icon={<HomeFilled />} title='Activos'>
					<Menu.Item key='2'>
						<NavLink
							to={paths.ASSETS_IDENTIFICATION}
							activeClassName='selected-nav-link'
						>
							Identificar activos
						</NavLink>
					</Menu.Item>
					<Menu.Item key='3' title='Registrar dependencias entre activos'>
						<NavLink
							to={paths.ASSETS_REGISTER}
							activeClassName='selected-nav-link'
						>
							Registrar dependencias entre activos
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
				<SubMenu
					key='submenu-safeguards'
					icon={<FlagFilled />}
					title='Salvaguardas'
				>
					<Menu.Item key='5'>
						<NavLink
							to={paths.SAFEGUARDS_IDENTIFICATION}
							activeClassName='selected-nav-link'
							title='Identificar Salvaguardas'
						>
							Identificar Salvaguardas
						</NavLink>
					</Menu.Item>
					<Menu.Item key='6'>
						<NavLink
							to={paths.SAFEGUARDS_VALUATION}
							activeClassName='selected-nav-link'
						>
							Valorar Salvaguardas
						</NavLink>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key='submenu-state-risk'
					icon={<ControlOutlined />}
					title='Estado de Riesgo'
				>
					<Menu.Item
						key='7'
						title='Valoración de amenazas implementando salvaguardas'
					>
						<NavLink
							to={paths.SAFEGUARDS_VALUATION_THREATS}
							activeClassName='selected-nav-link'
						>
							Valoración de amenazas implementando salvaguardas
						</NavLink>
					</Menu.Item>
					<Menu.Item key='8' title='Impacto Potencial'>
						<NavLink
							to={paths.STATE_POTENTIAL_IMPACT}
							activeClassName='selected-nav-link'
						>
							Impacto Potencial
						</NavLink>
					</Menu.Item>
					<Menu.Item key='9' title='Impacto Residual'>
						<NavLink
							to={paths.STATE_RESIDUAL_IMPACT}
							activeClassName='selected-nav-link'
						>
							Impacto Residual
						</NavLink>
					</Menu.Item>
					<Menu.Item key='10' title='Riesgo Potencial'>
						<NavLink
							to={paths.STATE_POTENTIAL_RISK}
							activeClassName='selected-nav-link'
						>
							Riesgo Potencial
						</NavLink>
					</Menu.Item>
					<Menu.Item key='11' title='Riesgo Residual'>
						<NavLink
							to={paths.STATE_RESIDUAL_RISK}
							activeClassName='selected-nav-link'
						>
							Riesgo Residual
						</NavLink>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	)
}

export default SideNavBar
