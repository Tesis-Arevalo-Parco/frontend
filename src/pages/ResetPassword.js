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
import images from 'constants/assets'
import { validatePassword } from 'utils/stringUtils'
import { LockOutlined } from '@ant-design/icons'
import { resetPassword } from 'epics/accountEpics'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import { MESSAGES } from 'constants/notificationMessages'
import { paths } from 'constants/paths'

const ResetPassword = () => {
	const [spinner, setSpinner] = useState(false)
	const router = useHistory()

	const onFinish = async (values) => {
		setSpinner(true)
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const code = urlParams.get('code')
		console.log(code)
		const response = await resetPassword(code, values.password)
		setSpinner(false)
		responseActions(response?.status, response)
	}

	const responseActions = (statusCode, response) => {
		switch (statusCode) {
			case CODE_HTTP_RESPONSE.SUCCESS_200:
				notification.success(MESSAGES.REGISTER_SUCCESS)
				router.push(paths.LOGIN)
				break
			case CODE_HTTP_RESPONSE.ERROR_400:
				notification.error(MESSAGES.REGISTER_FAILED)
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
						<h1>Restablecer Contrasena</h1>
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
								Restablecer Contrasena
							</Button>
						</Form.Item>
						<Divider />
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

export default ResetPassword

/*
<center>
<img src="https://miracomosehace.com/wp-content/uploads/2020/08/Candado-contrasena-oculta.jpg"  width="300" height="200">
</center>
<center>
<h1><b>Smart Risk</b></h1>
</center>
<center>
<h1><b>Cambio de contraseña</b></h1>
</center>
<center>
<h2>Has solicitado cambiar tu contraseña? </h2>
</center>
<h3>Hemos recibido un pedido de cambio de contraseña de tu cuenta, Si has sido tu, puedes ingresar una nueva contraseña dando clic en el siguiente boton</h3> 
</br>
</br>
<center>
<a href="<%= URL %>?code=<%= TOKEN %>" target="_parent">
<button style=" text-decoration: none;
    padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0;" name="button" >
Restablecer contraseña</button>
</a>
</center>
</br>

<p>Saludos</p>

*/
