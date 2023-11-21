
function authenticate_admin(ExpressRequest, ExpressResponse, ExpressNext) {
    const { headers } = ExpressRequest;
    const { name, pwd } = headers;

    if ((process.env.ADMIN_USER !== name || process.env.ADMIN_PRIVILEGES !== pwd))
        return ExpressResponse.status(403).send("You are forbidden from performing his action");
        
    ExpressNext();
};


module.exports = {
    authenticate_admin
};