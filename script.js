const users = document.querySelector("#user-list");
const appURL = "https://crudcrud.com/api/c091b19d38574f6ea6ab801079591acf";

fetch(`${appURL}/users`)
  .then((response) => response.json())
  .then((userList) => {
    userList.forEach((user) => {
      const item = document.createElement("li");
      item.id = `user-${user._id}`;

      item.innerHTML = `<b>Nome: </b> ${user.name} <b>E-mail: </b> ${user.email} <button onclick="remove('${user._id}')" class="delete">X</button>`;

      users.appendChild(item);
      console.log(user);
    });
  });

document.querySelector("#register").addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  fetch(`${appURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      const item = document.createElement("li");
      item.id = `user-${user._id}`;

      item.innerHTML = `<b>Nome: </b> ${user.name} <b>E-mail: </b> ${user.email} <button onclick="remove('${user._id}')" class="delete">X</button>`;

      users.appendChild(item);
    });
});

function remove(id) {
  fetch(`${appURL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      _id: id,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao remover usuário do programa.");
      }

      return response.status === 204 ? {} : response.json().catch(() => ({}));
    })
    .then(() => {
      document.querySelector(`#user-${id}`).remove();
    });
}
