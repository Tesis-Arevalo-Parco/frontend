import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
	Row,
	Col,
	Form,
	Input,
	Button,
	Divider,
	Spin,
	Image,
	notification,
} from 'antd'
import images from 'constants/assets'
import { MailOutlined } from '@ant-design/icons'
import { paths } from 'constants/paths'
import { forgotPassword } from 'epics/accountEpics'
import { MESSAGES } from 'constants/notificationMessages'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'

const ForgottenPassword = () => {
	const [spinner, setSpinner] = useState(false)
	const router = useHistory()

	const onFinish = async (values) => {
		setSpinner(true)
		const response = await forgotPassword(values.username)
		setSpinner(false)
		console.log(response)
		responseActions(response?.status, response)
	}

	const responseActions = async (statusCode, response) => {
		switch (statusCode) {
			case CODE_HTTP_RESPONSE.SUCCESS_200:
				notification.success(MESSAGES.FORGOT_PASSWORD_SUCCESS)
				router.push(paths.LOGIN)
				break
			case CODE_HTTP_RESPONSE.ERROR_400:
				notification.error(MESSAGES.FORGOT_PASSWORD_FAILED)
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
						name='forgotten_password_form'
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
						<h1>¿Olvidaste tu contraseña?</h1>
						<h3>
							¡No hay problema! solo ingrese tu correo electrónico y te
							enviaremos un enlace para restablecer la contraseña
						</h3>
						<Form.Item
							label='Correo Electrónico'
							name='username'
							className='main-form-item'
							rules={[
								{
									type: 'email',
									message:
										'Escribe la dirección de correo electrónico con el formato alguien@example.com',
								},
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
						<Form.Item className='main-button-content'>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Restablecer contraseña
							</Button>
						</Form.Item>
						<Divider />
						<Form.Item>
							<Link className='login-form-register' to={paths.LOGIN}>
								¿Ya tienes una cuenta?<span>&nbsp; Iniciar Sesión</span>
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
				<Image
					src={images.LOGIN_IMG}
					preview={false}
					className='logo-image-login'
				/>
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
export default ForgottenPassword
