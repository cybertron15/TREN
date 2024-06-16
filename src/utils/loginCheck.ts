function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
	if (token === null) { return false }
    return true
}

export default isLoggedIn