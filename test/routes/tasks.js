import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
  const Users = app.db.models.Users;
  const Tasks = app.db.models.Tasks;
  const jwtSecret = app.libs.config.jwtSecret;

  let token;
  let fakeTask;

  beforeEach(done => {
    Users.truncate({})
      .then(() => Users.create({
          name: "John",
          email: "john@mail.net",
          password: "12345"
        }))
      .then(user => {
        Tasks.truncate()
          .then(() =>
            Tasks.bulkCreate([{
                id: 1,
                title: "work",
                user_id: user.id
              }, {
                id: 2,
                title: "study",
                user_id: user.id
              }]))
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
        request
          .get("/tasks")
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql("work");
            expect(res.body[1].title).to.eql("study");
            done(err);
          });
      });
    });
  });
  describe("POST /tasks", () => {
    describe("status 200", () => {
      it("create a new task", done => {
        request
          .post("/tasks")
          .set("Authorization", `Bearer ${token}`)
          .send({ title: "run" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("run");
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });
  describe("GET /tasks/:id", () => {
    describe("status 200", () => {
      it("returns one task", done => {
        request
          .get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("work");
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("throws errors when tasks not exist", done => {
        request
          .get("/tasks/0")
          .set("Authorization", `Bearer ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });
  describe("PUT /tasks/:id", () => {
    describe("status 204", () => {
      it("update a tasks", done => {
        request.put(`/tasks/${fakeTask.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "travel",
            done: false
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
  describe("DELETE /tasks/:id", () => {
    describe("status 204", () => {
      it("remove a task", done => {
        request.delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
