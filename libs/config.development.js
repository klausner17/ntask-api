module.exports = {
    datbase: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "NTas$K-AP1",
    jwtSession: {session: false}
};