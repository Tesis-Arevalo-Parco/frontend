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
