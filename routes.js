const auth = [
  {
    method: "post",
    path: "/login",
    handler: (request, h) => {
      const { username, password } = request.payload;
      return `Welcome, ${username} == ${password}`;
    },
  },
];

const users = [
  {
    method: "post",
    path: "/users",
    handler: (request, h) => {
      return h.response(
        JSON.stringify({
          username: request.payload.username,
          password: request.payload.password,
        }),
        201
      );
    },
  },
  {
    method: "put",
    path: "/users/{id}",
    handler: (request, h) => {
      return h
        .response(
          JSON.stringify({
            username: request.payload.username,
            password: request.payload.password,
            id: request.params.id,
          })
        )
        .code(201)
        .type("application/json")
        .header("X-Custom", "some-values");
    },
  },
];

let data = [{ title: "judul 1", desc: "deskripsi 1" }];
const cards = [
  {
    method: "get",
    path: "/cards",
    handler: (request, h) => {
      return h.response(JSON.stringify(data), 200);
    },
  },
  {
    method: "post",
    path: "/cards",
    handler: (request, h) => {
      const reqData = request.payload
      data.push(reqData)
      return h
      .response(JSON.stringify(data))
      .code(200)
      .type('application/json')
    },
  },
  {
    method: "delete",
    path: "/cards/{id}",
    handler: (request, h) => {
      const { id } = request.params
      data = data.filter((card, idx) => {
        if(idx != id) {
          return card
        }
      })
      return h
      .response(JSON.stringify(data))
      .code(200)
      .type('application/json')
    },
  }
];

export const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      const { name = 'Stranger', location = 'Unknown Origin' } = request.query;
      return `Homepage, ${name} from ${location}`;
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About Page";
    },
  },
  ...auth,
  ...users,
  ...cards,
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "404 Not Found";
    },
  },
];
