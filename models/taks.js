module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback([{ tile: "Fazer compras" }, { tile: "Consertar o PC" }]);
        }
    };
};