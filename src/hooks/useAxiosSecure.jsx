import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate()
    // set token in the header for all the API call using axiosSecure hook

    useEffect(() => {

        // Request Interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
            // console.log(config)
            const token = user.accessToken;
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config;
        })

        // Response Interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403) {
                // console.log("Log out the user for bad request");
                logOut()
                    .then(() => {
                        navigate("/signup");
                    })
            }
        })


        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }

    }, [user, logOut, navigate])

    return instance;
}
export default useAxiosSecure;