/**
 *
 * @param {*} url
 * @param {*} method
 * @param {*} data
 * @param {Object} data.query
 */
const fetchWrapper = (url, method, data = {}) => {
  method = method.toUpperCase();
  const fetchData = { method };
  switch (method) {
    case "GET":
    case "DELETE":
      if (data.query) {
        let q = "?";
        for (let key in data.query) {
          q += [key, data.query[key]].map(encodeURIComponent).join("=") + "&";
        }
        url += q;
      }
      break;
    case "PUT":
    case "POST":
    case "PATCH":
      if (data.body) {
        if (typeof data.body === "object") {
          fetchData.body = JSON.stringify(data.body);
          fetchData.headers = {
            "Content-Type": "application/json",
          };
        } else {
          fetchData.body = body;
        }
      }
      break;
    default:
      throw new Error("Unsupported method: ", method);
  }
  return fetch(url, fetchData).then((res) => {
    if (res.ok) return res.json().then((json) => json.result);
    else {
      throw new Error(res.error);
    }
  });
};

function removeTodoApi(todo_id) {
  return fetchWrapper("/api/todo", "DELETE", { query: { todo_id } });
}

function loadTodoApi() {
  return fetchWrapper("/api/todos", "GET", {});
}

export default { removeTodoApi, loadTodoApi };
