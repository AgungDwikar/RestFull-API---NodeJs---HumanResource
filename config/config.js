const config = {
    env: process.env.NODE_ENV || 'DEVELOPMENT',
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "youre secret key",
    db_name : "hr_db",
    db_username : "postgres",
    db_password : "ganbatte",
    URL_DOMAIN : ""
}
export default config