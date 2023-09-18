const apiEP = "https://randomuser.me/api/?results=20";

let userList = [];
const listElm = document.getElementById("list");

const male = `<i class="fa-solid fa-mars"></i>`;
const female = `<i class="fa-solid fa-venus"></i>`;

// const fetchUser = (url) => {
// promise using fetch to fetch data from any server, fetch()
// ..........................................................
// fetch(url)
//   .then((dt) => {
//     return dt.json();
//   })
//   .then((data) => {
//     userList = data.results;
//     display(userList);
//   });
// };

const fetchUser = async (url) => {
  // Async / Await
  // ..............

  try {
    const dt = await fetch(url);
    const data = await dt.json();
    userList = data.results;
    display(userList);
  } catch (err) {
    console.log(err);
  }
};

fetchUser(apiEP);

const display = (users) => {
  document.querySelector(".count").textContent = users.length;

  let str = "";

  users.map((item, i) => {
    str += `<div class="card flex-grow-1" style="width: 18rem">
    <img
      src="${item?.picture?.large}"
      class="card-img-top"
      alt="users image"
    />
    <div class="card-body">
      <h5 class="card-title">${item?.name?.title} ${item?.name?.first} ${
      item?.name?.last
    }</h5>
      <div class="card-list">
        <ul class="list-unstyled">
          <li><i class="fa-solid fa-phone"></i> ${item?.phone}</li>
          <li><i class="fa-solid fa-envelope"></i> ${item?.email}</li>
          <li><i class="fa-solid fa-address-book"></i> ${
            item?.location?.city
          } ${item?.location?.state} ${item?.location?.postcode}</li>
          <li>${item?.gender === "male" ? male : female} ${item?.gender}</li>
        </ul>
      </div>
    </div>
  </div>`;
  });

  listElm.innerHTML = str;
};

const handleOnGenderSelect = (e) => {
  const url = `${apiEP}&gender=${e.value}`;
  fetchUser(url);
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;

  const filteredArg = userList.filter((usr) => {
    const fullName = `${usr.name.first} ${usr.name.last}`.toLowerCase();

    if (fullName.includes(value.toLowerCase())) {
      return true;
    }
  });

  display(filteredArg);
});
