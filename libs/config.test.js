module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        logging: false,
        storage: "ntask.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "NTASK-API",
    jwtSession: {session: false}
};