// util/auth.js 

import { redirect } from "react-router-dom";

export function checkAuthLoader() {
    // const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    //     const [name, value] = cookie.trim().split("=");
    //     acc[name] = value;
    //     return acc;
    // }, {});
    

    const token = document.cookie.split(';')[1].split("=")[1]

    if (!token) {
    return redirect('/auth');
     }
 
    return null;
}

