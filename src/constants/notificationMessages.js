export const MESSAGES = {
	LOGIN_SUCCESS: {
		message: 'Bienvenido',
		description: 'Has accedido a tu cuenta con éxito.',
		duration: 3,
	},
	LOGIN_FAILED: {
		message: 'Inicio de sesión fallido',
		description: 'Usuario o contraseña incorrectos.',
		duration: 5,
	},
	FORGOT_PASSWORD_SUCCESS: {
		message: 'Envio exitoso del correo de recuperacion de contrasena',
		description:
			'Revisa la bandeja de tu correo el enlace para restablecer tu contrasena',
		duration: 5,
	},
	FORGOT_PASSWORD_FAILED: {
		message: 'El correo no existe ',
		description: 'No tiene ninguna cuenta con ese correo, Registrate',
		duration: 5,
	},
	RESET_PASSWORD_SUCCESS: {
		message: 'Cambio exitoso de contrasena',
		description: 'Puedes iniciar sesion con tu nueva contrasena',
		duration: 5,
	},
	RESET_PASSWORD_FAILED: {
		message: 'Intento fallido de cambio de contrasena',
		description:
			'No se pudo cambiar la contrasena, comunicate con el administrador',
		duration: 5,
	},
	REGISTER_SUCCESS: {
		message: 'Registro exitoso',
		description:
			'A partir de este momento podrá acceder al sistema con su correo y contraseña.',
		duration: 7,
	},
	REGISTER_FAILED: {
		message: 'Registro fallido',
		description: 'Por favor inténtelo nuevamente.',
		duration: 5,
	},
	EMAIL_IS_ALREADY_TAKEN: {
		message: 'Registro fallido',
		description:
			'El correo electrónico ingresado ya ha sido tomado. Por favor ingrese otro correo.',
		duration: 5,
	},
	API_ERROR: {
		message: 'API ERROR',
		description: 'Por favor inténtelo más tarde',
		duration: 5,
	},
	NOT_AUTHORIZED: {
		message: 'No autorizado para realizar esta acción',
		description: 'Por favor inténtelo más tarde',
		duration: 5,
	},
}
