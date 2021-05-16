const saveUserAuth = (jwt, user) => {
	localStorage.setItem('jwt', jwt)
	localStorage.setItem('user', JSON.stringify(user))
}

const getJWT = () => {
	return localStorage.getItem('jwt')
}

const getUserData = () => {
	return JSON.parse(localStorage.getItem('user'))
}

const cleanLocalStorage = () => localStorage.clear()

export { saveUserAuth, getJWT, getUserData, cleanLocalStorage }
