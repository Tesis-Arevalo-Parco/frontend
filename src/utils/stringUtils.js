const validatePassword = (password) => {
	const errorMessage = 'La contraseña debe tener al menos'
	if (password.length < 6) {
		return Promise.reject(new Error(`${errorMessage} 6 caracteres`))
	} else if (!password.match(/[A-Z]/g)) {
		return Promise.reject(new Error(`${errorMessage} una letra mayúscula`))
	} else if (!password.match(/[a-z]/g)) {
		return Promise.reject(new Error(`${errorMessage} una letra minúscula`))
	} else if (!password.match(/[0-9]/g)) {
		return Promise.reject(new Error(`${errorMessage} un número`))
	}
	return Promise.resolve()
}

export { validatePassword }
