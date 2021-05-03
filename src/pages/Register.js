import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Row,
	Col,
	Form,
	Input,
	Button,
	Divider,
	Spin,
	notification,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { register } from 'epics/accountEpics'
import { paths } from 'constants/paths'

const Register = () => {
	const [spinner, setSpinner] = useState(false)
	const onFinish = async (values) => {
		setSpinner(true)
		const response = await register(
			values.username,
			values.email,
			values.password
		)
		console.log(response)
		if (response.status === 200) {
			openNotificationWithIcon('success')
		} else {
			openNotificationWithIcon('error')
		}
		setSpinner(false)
	}

	const openNotificationWithIcon = (type) => {
		notification[type]({
			message: 'Notification Title',
			description:
				'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
		})
	}
	return (
		<Row className='login'>
			<Col align='middle' xs={24} xl={12} sm={12}>
				<div>Logo</div>
				<h1>¡Bienvenido de nuevo!</h1>
				<Spin tip='Loading...' spinning={spinner}>
					<Form
						name='normal_login'
						className='login-form'
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item
							name='username'
							rules={[
								{
									required: true,
									message: '¡Ingrese su nombre de usuario!',
								},
							]}
						>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='text'
								placeholder='Nombre'
							/>
						</Form.Item>
						<Form.Item
							name='email'
							rules={[
								{
									required: true,
									message: '¡Ingrese su correo electrónico!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Correo Electrónico'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: '¡Ingrese su contraseña!',
								},
							]}
						>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Contraseña'
							/>
						</Form.Item>
						<Form.Item
							name='repeat-password'
							rules={[
								{
									required: true,
									message: '¡Ingrese su contraseña!',
								},
							]}
						>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Confirmar Contraseña'
							/>
						</Form.Item>
						<Form.Item>
							<a className='login-form-forgot' href=''>
								¿Olvidaste tu contraseña?
							</a>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Iniciar Sesión
							</Button>
						</Form.Item>
						<Divider />
						<Form.Item>
							<Link className='login-form-register' to={paths.REGISTER}>
								¿Aún no tienes una cuenta?<span> Regístrate ahora</span>
							</Link>
						</Form.Item>
					</Form>
				</Spin>
			</Col>
			<Col xs={24} xl={12} sm={12} className='right-panel'>
				<h2>Analiza el riesgo de tu casa inteligente</h2>
				<h3>Fácilmente y en pocos pasos </h3>
			</Col>
		</Row>
	)
}

export default Register
