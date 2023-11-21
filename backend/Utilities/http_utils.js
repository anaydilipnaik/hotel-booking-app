function HTTP_404(msg = "Not Found") {
    return HTTP_RES(404, msg);
};

function HTTP_500() {
    const SRV_ERR = "Internal Server Error";
    return HTTP_RES(500, SRV_ERR);
};

function HTTP_RES(status = 500, msg = "error", data = undefined, errors = undefined) {
    return {
        status,
        msg,
        data,
        errors
    };
};

function IS_VALID_DATE(dt) {
    if (!dt) return false;

    const date = new Date(dt);
    if (Number.isNaN(date.getTime())) return false;

    return true;
};

module.exports = {
    HTTP_500,
    HTTP_RES,
    HTTP_404,
    IS_VALID_DATE
}