import axios from "axios"
import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
    isBrowser() && window.localStorage.getItem("bansheeBabe")
        ? JSON.parse(window.localStorage.getItem("bansheeBabe"))
        : {}
export const setUser = user => {
    window.localStorage.setItem("bansheeBabe", JSON.stringify(user.data))
}

export let handleLogin = async ({username, password}) => {
    //fire request to endpoint, set token on return
    return await axios.get("http://localhost:9090/ron/logon", {params: {user: username, pass: password}})
        .then(profile => {
            //used to parse out stuff to use on the spot
            /*const {
                data: {
                    userId: id
                }
            } = profile*/

            return profile
        }).catch(error => {
            return null
        })
}
export const isLoggedIn = () => {
    const user = getUser()
    if(user) {
        return !!user.userId
    }else{
        return null
    }
}
export const logout = () => {
    if (isBrowser()) {
        const user = getUser()
        if (user) {
            window.localStorage.clear()
            navigate('/shope/login')
        }
    }
}