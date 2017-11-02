import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
  const Users = app.db.models.Users;
  const Tasks = app.db.models.Tasks;
  const jwtSecret = app.libs.config.jwtSecret;

  let token;
  let fakeTask;

  beforeEach(done => {
    Users.truncate({})
      .then(() =>
        User.create({
          name: "John",
          email: "john@mail.net",
          password: "12345"
        })
      )
      .then(user => {
        Tasks.truncate()
          .then(() =>
            Tasks.bulkCreate([
              {
                id: 1,
                title: "work",
                user_id: user.id
              },
              {
                id: 2,
                title: "study",
                user_id: user.id
              }
            ])
          )
          .then(tasks => {
            fakeTask = tasks[0];
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });
  describe("GET /tasks", () => {
    describe("status 200", () => {
      it("returns a list of tasks", done => {
        //teste
      });
    });
  });
  describe("POST /tasks", () => {
    describe("status 200", () => {
      it("create a new task", done => {
        //teste
      });
    });
  });
  describe("GET /tasks/:id", () => {
    describe("status 200", () => {
      it("returns one task", done => {
        //teste
      });
    });
    describe("status 404", () => {
      it("throws errors when tasks not exist", done => {
        //teste
      });
    });
  });
  describe("PUT /tasks/:id", () => {
    describe("status 204", () => {
      it("update a tasks", () => {
        //teste
      });
    });
  });
  describe("DELETE /tasks/:id", () => {
    describe("status 204", () => {
      it("delete a tasks", () => {
        //teste
      });
    });
  });
});
