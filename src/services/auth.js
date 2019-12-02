export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
    isBrowser() && window.localStorage.getItem("bansheeUser")
        ? JSON.parse(window.localStorage.getItem("bansheeUser"))
        : {}
const setUser = user =>
    window.localStorage.setItem("bansheeUser", JSON.stringify(user))
export const handleLogin = ({ username, password }) => {
    //fire request to endpoint, set token on return

    if (username === `john` && password === `pass`) {
        return setUser({
            username: `john`,
            name: `Johnny`,
            email: `johnny@example.org`,
        })
    }
    return false
}
export const isLoggedIn = () => {
    const user = getUser()
    return !!user.username
}
export const logout = callback => {
    setUser({})
    callback()
}