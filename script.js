const users = document.querySelector("#user-list");
const appURL = "https://crudcrud.com/api/3322009ad3db46a7a0d3b2343a38a3fd";

fetch(`${appURL}/users`)
  .then((response) => response.json())
  .then((userList) => {
    userList.forEach((user) => {
      const item = document.createElement("li");

      item.innerHTML = `<b>Nome: </b> ${user.name} <b>E-mail: </b> ${user.email} <button onclick(remove(user._id)) class="delete">X</button>`;

      users.appendChild(item);
    });
  });
