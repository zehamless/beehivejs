module.exports = {
    secret: process.env.SECRET_KEY||"defaultSecretKey",
    expiresIn: process.env.EXPIRES_IN || "1h",
}