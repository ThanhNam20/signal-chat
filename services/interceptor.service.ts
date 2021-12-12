import axios from 'axios';
import { REACT_APP_API_URL } from "@env";

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        // add auth header with jwt if account is logged in and request is to the api url
        
        // const account = accountService.accountValue;
        // const isLoggedIn = account?.token;
        // const isApiUrl = request.url.startsWith(REACT_APP_API_URL);

        // if (isLoggedIn && isApiUrl) {
        //     request.headers.common.Authorization = `Bearer ${account.token}`;
        // }

        return request;
    });
}