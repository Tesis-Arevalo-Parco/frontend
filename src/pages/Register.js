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
	notification,
	Image,
} from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

import { register } from 'epics/accountEpics'
import { paths } from 'constants/paths'
import images from 'constants/assets'
import { MESSAGES } from 'constants/notificationMessages'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import { STRAPI_ERRORS } from 'constants/commonStrapiErrors'
import { saveUserAuth } from 'utils/localStorageUtils'
import { getErrorMessageId } from 'utils/apiResponseUtils'
import { validatePassword } from 'utils/stringUtils'

const Register = () => {
	const [spinner, setSpinner] = useState(false)
	const router = useHistory()

	const onFinish = async (values) => {
		setSpinner(true)
		const response = await register(
			values.name,
			values.lastname,
			values.email,
			values.password
		)
		setSpinner(false)
		responseActions(response?.status, response)
	}

	const responseActions = (statusCode, response) => {
		switch (statusCode) {
			case CODE_HTTP_RESPONSE.SUCCESS_200:
				notification.success(MESSAGES.REGISTER_SUCCESS)
				saveUserAuth(response.data.jwt, response.data.user)
				router.push(paths.ROOT_APP)
				break
			case CODE_HTTP_RESPONSE.ERROR_400:
				if (
					getErrorMessageId(response.data) === STRAPI_ERRORS.EMAIL_ALREADY_TAKEN
				) {
					notification.error(MESSAGES.EMAIL_IS_ALREADY_TAKEN)
				} else {
					notification.error(MESSAGES.REGISTER_FAILED)
				}
				break
		}
	}

	return (
		<Row className='register-page'>
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
						name='normal_register'
						className='register-form'
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
						<h1>¡Crea tu cuenta!</h1>
						<Row gutter={16}>
							<Col xs={24} md={24} lg={12} sm={24}>
								<Form.Item
									name='name'
									label='Nombre'
									className='main-form-item'
									rules={[
										{
											required: true,
											message: '¡Ingrese su nombre!',
										},
									]}
								>
									<Input
										prefix={<UserOutlined className='site-form-item-icon' />}
										type='text'
										placeholder='Nombre'
									/>
								</Form.Item>
							</Col>
							<Col xs={24} md={24} lg={12} sm={24}>
								<Form.Item
									name='lastname'
									label='Apellido'
									className='main-form-item'
									rules={[
										{
											required: true,
											message: '¡Ingrese su apellido!',
										},
									]}
								>
									<Input
										prefix={<UserOutlined className='site-form-item-icon' />}
										type='text'
										placeholder='Apellido'
									/>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							label='Correo Electrónico'
							name='email'
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
								prefix={<MailOutlined className='site-form-item-icon' />}
								placeholder='Correo Electrónico'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							label='Contraseña'
							className='main-form-item'
							tooltip='La contraseña debe constar de al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número'
							rules={[
								{
									required: true,
									message: '¡Ingrese su contraseña!',
								},
								() => ({
									validator(_, value) {
										return validatePassword(value)
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Contraseña'
							/>
						</Form.Item>
						<Form.Item
							name='repeat-password'
							label='Confirmar Contraseña'
							className='main-form-item'
							dependencies={['password']}
							rules={[
								{
									required: true,
									message: '¡Ingrese su contraseña!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve()
										}
										return Promise.reject(
											new Error(
												'¡Las dos contraseñas que ingresó no coinciden!'
											)
										)
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Confirmar Contraseña'
							/>
						</Form.Item>
						<Form.Item className='main-button-content'>
							<Button
								type='primary'
								htmlType='submit'
								className='register-form-button'
							>
								Regístrate
							</Button>
						</Form.Item>
						<Divider />
						<Form.Item>
							<Link className='register-form-register' to={paths.LOGIN}>
								¿Ya tienes una cuenta?<span>&nbsp;Inicia Sesión</span>
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
					src={images.REGISTER_IMG}
					preview={false}
					className='logo-image-register'
				/>
				<div className='register-text-content'>
					<p className='register-text-caption'>
						Analiza el riesgo de tu <span>casa inteligente</span>
					</p>
					<p className='register-text-final'>Fácilmente y en pocos pasos</p>
				</div>
			</Col>
		</Row>
	)
}

export default Register
