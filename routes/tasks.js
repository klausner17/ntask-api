module.exports = app => {
  app.get("/tasks", (req, res) => {
    res.status(200).json({
      tasks: [{ tile: "Fazer compras" }, { tile: "Consertar o PC" }]
    });
  });
};
