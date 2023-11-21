import axios from "axios";

export async function authenticate(name, pwd) {
    try {
        const host_name = "http://52.53.127.193" || "http://localhost:5000";
        const end_point = "/admin/sign_in";
        const URL = `${host_name}${end_point}`

        const network_call = await axios.post(URL, {
            name, pwd
        });

        if (network_call.status === 200) return true;
        return false;
    } catch(ex) {
        console.error("AuthException::ex", ex);
        return false;   
    };
};