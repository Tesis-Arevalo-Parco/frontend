import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
	Row,
	Col,
	Form,
	Input,
	Button,
	Divider,
	notification,
	Spin,
	Image,
} from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

import { login } from 'epics/accountEpics'
import { paths } from 'constants/paths'
import { MESSAGES } from 'constants/notificationMessages'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import { saveUserAuth } from 'utils/localStorageUtils'
import images from 'constants/assets'

const LogIn = () => {
	const [spinner, setSpinner] = useState(false)
	const router = useHistory()

	const onFinish = async (values) => {
		setSpinner(true)
		const response = await login(values.username, values.password)
		setSpinner(false)
		responseActions(response?.status, response)
	}

	const responseActions = async (statusCode, response) => {
		switch (statusCode) {
			case CODE_HTTP_RESPONSE.SUCCESS_200:
				notification.success(MESSAGES.LOGIN_SUCCESS)
				saveUserAuth(response.data.jwt, response.data.user)
				router.push(paths.ROOT_APP)
				break
			case CODE_HTTP_RESPONSE.ERROR_400:
				notification.error(MESSAGES.LOGIN_FAILED)
				break
			default:
				notification.error({
					...MESSAGES.API_ERROR,
					message: `${MESSAGES.API_ERROR.message} ${statusCode || ''}`,
				})
				break
		}
	}

	return (
		<Row className='login-page'>
			<Col
				align='middle'
				xs={24}
				sm={24}
				md={24}
				lg={12}
				xl={12}
				className='left-panel'
			>
				<Spin spinning={spinner}>
					<Form
						name='normal_login'
						className='login-form'
						initialValues={{ remember: true }}
						onFinish={onFinish}
						layout='vertical'
					>
						<Row justify='center'>
							<Image
								src={images.LOGO_PRIMARY}
								preview={false}
								className='logo-image'
								width='150px'
							/>
						</Row>
						<h1>¡Bienvenido!</h1>
						<Form.Item
							label='Correo Electrónico'
							name='username'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese su correo electrónico!',
								},
							]}
						>
							<Input
								prefix={<MailOutlined className='form-login-icon' />}
								placeholder='Correo Electrónico'
								type='email'
							/>
						</Form.Item>
						<Form.Item
							label='Contraseña'
							name='password'
							className='main-form-item item-password-content'
							rules={[
								{
									required: true,
									message: '¡Ingrese su contraseña!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='form-login-icon' />}
								type='password'
								placeholder='Contraseña'
							/>
						</Form.Item>
						<Form.Item className='login-form-forgot-content'>
							<a className='login-form-forgot' href=''>
								¿Olvidaste tu contraseña?
							</a>
						</Form.Item>
						<Form.Item className='main-button-content'>
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
								¿Aún no tienes una cuenta?<span>&nbsp;Regístrate ahora</span>
							</Link>
						</Form.Item>
					</Form>
				</Spin>
			</Col>
			<Col
				xs={24}
				sm={24}
				md={24}
				lg={12}
				xl={12}
				className='right-panel'
				align='middle'
			>
				<Image src={images.LOGIN_IMG} preview={false} className='logo-image' />
				<div className='login-text-content'>
					<p className='login-text-caption'>
						Analiza el riesgo de tu <span>casa inteligente</span>
					</p>
					<p className='login-text-final'>Fácilmente y en pocos pasos</p>
				</div>
			</Col>
		</Row>
	)
}

export default LogIn
