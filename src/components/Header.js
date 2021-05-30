import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Popover, Button, Divider } from 'antd'
import { UserOutlined, IdcardOutlined, LogoutOutlined } from '@ant-design/icons'

import { cleanLocalStorage } from 'utils/localStorageUtils'
import { paths } from 'constants/paths'
import UserContext from 'store/context/UserContext'

const Header = () => {
	const { Header } = Layout
	const router = useHistory()
	const { getUserLoginData, user } = useContext(UserContext)

	const closeSession = () => {
		cleanLocalStorage()
		router.push(paths.LOGIN)
	}

	const popoverContent = (
		<>
			<Button type='text' icon={<IdcardOutlined />}>
				Mi Cuenta
			</Button>
			<Divider />
			<Button type='text' icon={<LogoutOutlined />} onClick={closeSession}>
				Cerrar Sesión
			</Button>
		</>
	)

	useEffect(() => {
		getUserLoginData()
	}, [])

	return (
		<Header className='header custom-shadow' style={{ padding: 0 }}>
			<Menu theme='light' mode='horizontal'>
				<Menu.Item
					key='horizontal-button'
					style={{ float: 'right' }}
					className='menu-user-item'
				>
					<Popover
						content={popoverContent}
						trigger='click'
						placement='bottomRight'
						style={{ float: 'right' }}
						overlayClassName='popover-menu-item'
					>
						<Button type='text' icon={<UserOutlined />}>
							{user.name}&nbsp;{user.lastname}
						</Button>
					</Popover>
				</Menu.Item>
			</Menu>
		</Header>
	)
}

export default Header
