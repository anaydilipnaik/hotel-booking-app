export function get_admin() {
    try {
        // const json_value = window.localStorage.getItem("admin");
        // return JSON.parse(json_value);
        return {
            name: "root",
            pwd: "grantAllPermissions"
        }
    } catch(ex) {
        return ex;
    }
}

export function is_signed_in() {
    if (!get_admin()) return false;
    return true;
};

export function sign_in(sign_in_payload) {
    sign_in_payload = JSON.stringify(sign_in_payload);
    window.localStorage.setItem("admin", sign_in_payload);
};

export function sign_out() {
    window.localStorage.removeItem("admin");
};