const saveUserAuth = async (jwt, user) => {
	localStorage.setItem('jwt', jwt)
	localStorage.setItem('user', JSON.stringify(user))
}

const getJWT = () => {
	return localStorage.getItem('jwt')
}

const getUserData = () => {
	return JSON.parse(localStorage.getItem('user'))
}

export { saveUserAuth, getJWT, getUserData }
