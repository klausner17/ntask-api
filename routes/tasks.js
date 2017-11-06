module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks Lista de tarefas
     * @apiGroup Tarefas
     * @apiHeader {String} Authorization Token de Usuário
     * @apiHeaderExample {json} Header
     *  {"Authorization", "Bearer xyz.abc.123.hgf"}
     * @apiSuccess (200) {Object[]} tasks Lista de tarefas
     * @apiSuccess (200) {Number} tasks.id Id do registro
     * @apiSuccess (200) {String} tasks.title Titulo da tarefa
     * @apiSuccess (200) {Boolean} tasks.done Tarefa foi concluída?
     * @apiSuccess (200) {Date} tasks.created_at Data da criação da tarefa
     * @apiSuccess (200) {Date} tasks.updated_at Data de atualização da tarefa
     * @apiSuccess (200) {Number} tasks.user_id Id do usuário
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   [{
     *       "id": 1,
     *       "title": "Estudar",
     *       "done": false;
     *       "updated_at": "2015-05-11T12:30:00.778Z",
     *       "created_at": "2015-05-11T12:30:00.778Z",
     *       "user_id": 1
     *   }]
     * @apiErrorExample {json} Error-Response:
         HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findAll({where: {user_id: req.user.id}})
        .then(result => res.json(result))
        .catch(error => {
          res.status(402).json({msg: error.message});
        });
    })
    /**
     * @api {post} /tasks Cadastra uma tarefa
     * @apiGroup Tarefas
     * @apiHeader (200) {String} Authorization Token de usuário
     * @apiHeaderExample {json} Request-Example:
     *   {"Authorization": "Bearer xyz.abc.123.ghf"}
     * @apiParam  {String} title Título da tareda
     * @apiParamExample  {json} Request-Example:
     *   {"title": "Estudar"}    
     * @apiSuccess (200) {Number} id Id da tarefa
     * @apiSuccess (200) {String} title Titulo da tarefa
     * @apiSuccess (200) {Boolean} done Tarefa concluída?
     * @apiSuccess (200) {Date} updated_at Data de atualização
     * @apiSuccess (200) {Date} created_at Data de criação
     * @apiSuccess (200) {Number} user_id Id do Usuário
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *       "id": 1,
     *       "title": "Estudar",
     *       "done": false,
     *       "updated_at": "2017-05-11T12:30:00.778Z",
     *       "created_at": "2017-05-11T12:30:00.778Z",
     *       "user_id": 1
     *   }
     * @apiErrorExample {json} Error-Response:
     *   HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks/:id Exibe uma tarefa
     * @apiGroup Tarefas
     * @apiHeader (200) {String} Authorization Token do usuário
     * @apiHeaderExample {json} Request-Example:
     *   {"Authorization": "Bearer abc.xwz.123.klj"}
     * @apiParam  {id} id Id do registro
     * @apiSuccess (200) {Number} id Id da tarefa
     * @apiSuccess (200) {String} title Titulo da tarefa
     * @apiSuccess (200) {Boolean} done Tarefa concluída?
     * @apiSuccess (200) {Date} updated_at Data de atualização
     * @apiSuccess (200) {Date} created_at Data de criação
     * @apiSuccess (200) {Number} user_id Id do Usuário
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *       "id": 1,
     *       "title": "Estudar",
     *       "done": false,
     *       "updated_at": "2017-05-11T12:30:00.778Z",
     *       "created_at": "2017-05-11T12:30:00.778Z",
     *       "user_id": 1
     *   }
     * @apiErrorExample {json} Not Found:
     *   HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Error-Response:
     *   HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Tasks.findOne({where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    /**
     * @api {put} /tasks/:id Atualiza uma tarefa
     * @apiGroup Tarefas
     * @apiHeader (200) {String} Authorization Token do usuário
     * @apiHeaderExample {json} Request-Example:
     *   {"Authorization": "Bearer abc.xwz.123.klj"}
     * @apiParam  {Number} id Id da tarefa
     * @apiParam  {String} title Titulo da tarefa
     * @apiParam  {Boolean} done Tarefa concluida?
     * @apiParamExample  {json} Request-Example:
     *   {
     *       "title": "Trabalhar",
     *       "done": true
     *   }
     * @apiSuccessExample {json} Success-Response:
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Error-Response:
         HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Tasks.update(req.body, { where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then(result => res.sendStatus(204)) 
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    /**
     * @api {delete} /tasks/:id Exclui uma tarefa
     * @apiGroup Tarefas
     * @apiHeader (200) {String} Authorization Token do usuário
     * @apiHeaderExample {json} Request-Example:
     *   {"Authorization": "Bearer abc.xwz.123.klj"}
     * @apiParam  {Number} id Id da tarefa
     * @apiSuccessExample {json} Success-Response:
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Error-Response:
         HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Tasks.destroy({ where: {
          id: req.params.id,
          user_id: req.user.id
        }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
}
