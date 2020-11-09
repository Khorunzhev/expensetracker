import axious from 'axios'

class AuthentificationService {

    executeBasicAuthentificationService(username, password) {

        return axious.get("http://localhost:8080/basicauth",
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }
        )
    }

    createBasicAuthToken(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        return basicAuthHeader;
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authentificatedUser', username);

        this.setupAxiousInterceptors(this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem('authentificatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authentificatedUser')
        if (user === null) { return false }
        else { return true }
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authentificatedUser')
        if (user === null) { return '' }
        else { return user }
    }

    setupAxiousInterceptors(basicAuthHeader) {
        axious.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthentificationService()