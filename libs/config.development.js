import logger from "./logger";

module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: (sql) => {
            logger.info(`[${new Date()} ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: "NTa$K-AP1",
    jwtSession: {session: false}
};