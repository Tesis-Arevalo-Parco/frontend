export const MESSAGES = {
	LOGIN_SUCCESS: {
		message: 'Bienvenido',
		description: 'Has accedido a tu cuenta con éxito.',
		duration: 5,
	},
	LOGIN_FAILED: {
		message: 'Inicio de sesión fallido',
		description: 'Usuario o contraseña incorrectos.',
		duration: 10,
	},
	REGISTER_SUCCESS: {
		message: 'Registro exitoso',
		description:
			'A partir de este momento podrá acceder al sistema con su correo y contraseña.',
		duration: 5,
	},
	REGISTER_FAILED: {
		message: 'Registro fallido',
		description: 'Por favor inténtelo nuevamente.',
		duration: 10,
	},
	EMAIL_IS_ALREADY_TAKEN: {
		message: 'Registro fallido',
		description:
			'El correo electrónico ingresado ya ha sido tomado. Por favor ingrese otro correo.',
		duration: 10,
	},
	API_ERROR: {
		message: 'API ERROR',
		description: 'Por favor inténtelo más tarde',
		duration: 10,
	},
}
