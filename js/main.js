// ?  В пагинации количество постов составляет по 3 на каждую страницу. Всего 3 страниц
//  ? Комментарий можно изменить в редактировании.
// ? Добавлены курсоры на все элементы редактирование

let API = " http://localhost:8001/public";

let addPost = $("#add-post");
let modal = $("#exampleModal");
let savePost = $("#btn-save-modal");
let postForm = $("#post-form");
let saveEditBtn = $("#btn-save-edit");
let inpSearch = $("#inp-search");
let inpCommit = $("#add-commit");

// ! add
let addName = $("#add-name");
let addAccount = $("#add-account");
let addImage1 = $("#add-image-1");
let addImage2 = $("#add-image-2");
let addDesc = $("#add-word");

// ! edit
let editName = $("#edit-name");
let editAccount = $("#edit-account");
let editImage1 = $("#edit-image-1");
let editImage2 = $("#edit-image-2");
let editDesc = $("#edit-word");
let editId = $("#edit-id");
let editCommit = $("#edit-commit");
let saveCommit = $("btn-save-commit");
let pagination = $("#paginations");

let page = 1;
let limit = 2;

addPost.on("click", function () {});

savePost.on("click", function () {
  if (!addName.val().trim()) {
    alert("Пожалуйста введите имя!");
    return;
  }
  if (!addAccount.val().trim()) {
    alert("Пожалуйста фото!");
    return;
  }
  if (!addImage1.val().trim()) {
    alert("Пожалуйста добавьте фото!");
    return;
  }
  if (!inpCommit.val().trim()) {
    alert("Пожалуйста добвьте комментарий!");
    return;
  }
  if (!addDesc.val().trim()) {
    alert("Пожалуйста добвьте описание!");
    return;
  }
  let post = {
    name: addName.val(),
    account: addAccount.val(),
    image1: addImage1.val(),
    image2: addImage2.val(),
    desc: addDesc.val(),
    commit: inpCommit.val(),
  };

  newTask(post);
  addName.val(""),
    addAccount.val(""),
    addImage1.val(""),
    addImage2.val(""),
    addDesc.val(""),
    inpCommit.val("");
});
function newTask(post) {
  fetch(API, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((response) => render());
}

async function render() {
  postForm.empty();
  await fetch(`${API}?q=${inpSearch.val()}&_page=${page}&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        postForm.append(` <div id=${item.id} class="card mb-3 container mt-5" >
        <div class="div d-flex" >
          <img
            src=${item.account}
            style="width: 50px; border-radius: 50%; height: 50px; margin: 10px"; object-fit: center;
            alt=""
          />
          <h5 class="card-title mt-3 ms-3">${item.name}</h5>
        </div>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src=${item.image1}
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item" >
              <img
                src=${item.image2}
                class="d-block w-100"
                alt="..."
              />
            </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
            </div>
            <div class="card-body  ">
            <img src="./images/heart1.svg" class="blue" margin: 10px 0;  id="like"/>
            <img  src="https://cdn-icons.flaticon.com/png/512/2414/premium/2414210.png?token=exp=1646989608~hmac=4ee3e03b5ead4ec61681880d765f34da" id="btn-commit" style="width:32px;cursor: pointer; margin: 9px 0; margin-left:10px" data-bs-toggle="modal" data-bs-target="#exampleModal2"/>
          
          <div class="d-flex"> 
           <h5 class="card-title">${item.name}</h5> 
            <p class="card-text ms-2">
          ${item.desc}
          </p>
          </div>
          <div class="card-body">
          <p class="card-text" >
          Комментарий:
          ${item.commit}
          </p>
          </div>
          <div class="d-flex justify-content-between align-items: center">
          <p class="card-text" style="padding-top: 5px">
            <small class="text-muted">Последнее обновление 1 мин. назад</small>
          </p>
          <div >
          <img id="image-icon-edit" style="width:20px ; cursor: pointer" src="https://cdn-icons.flaticon.com/png/512/2740/premium/2740651.png?token=exp=1646978278~hmac=21a7057d215a8272b85137c62a946de6" data-bs-toggle="modal" data-bs-target="#exampleModal1"/>
          <img id="image-icon-delete" style="width:20px; margin-left: 30px;  cursor: pointer" src="https://cdn-icons.flaticon.com/png/512/484/premium/484611.png?token=exp=1646978193~hmac=d2edf0e88d278e929678f0da242ebbce" />
          </div>
          </div>
        </div>
      </div>
      </div>
      
 `);
      });
    });
  pagination.html(
    `<button ${
      page !== 1 ? "disabled" : ""
    }disabled id="btn-prev" class="btn btn-secondary me-4 mt-4">Предыдущая страница</button><h3> ${page} </h3><button ${
      page == 2 ? "disabled" : ""
    }
         id="btn-next"class="btn btn-secondary ms-4 mt-4">Следующая страница</button>`
  );
}
$("body").on("click", ".blue", function () {
  $(this).addClass("highlight");
});

$("body").on("click", "#btn-prev", function () {
  page -= 1;

  render();
});
$("body").on("click", "#btn-next", function () {
  page += 1;
  render();
});

$("body").on("click", "#like", function () {
  $("#like").toggleClass(red);
});

inpSearch.on("input", render);

$("body").on("click", "#image-icon-delete", async function (e) {
  let id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((response) => render());
});

$("body").on("click", "#image-icon-edit", async function (e) {
  let id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  let editData = await fetch(`${API}/${id}`).then((response) =>
    response.json()
  );
  editName.val(editData.name);
  editAccount.val(editData.account);
  editImage1.val(editData.image1);
  editImage2.val(editData.image2);
  editDesc.val(editData.desc);
  editId.val(editData.id);
  editCommit.val(editData.commit);
});

saveEditBtn.on("click", async function () {
  let newInfo = {
    name: editName.val(),
    account: editAccount.val(),
    image1: editImage1.val(),
    image2: editImage2.val(),
    desc: editDesc.val(),
    commit: editCommit.val(),
  };
  console.log(newInfo);
  await fetch(`${API}/${editId.val()}`, {
    method: "PATCH",
    body: JSON.stringify(newInfo),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  render();
});

$("body").on("input", "#btn-commit", function () {});

saveCommit.on("click", async function () {
  let editedCommit = {
    name: editName.val(),
    account: editAccount.val(),
    image1: editImage1.val(),
    image2: editImage2.val(),
    desc: editDesc.val(),
    commit: editCommit.val(),
  };
  console.log(editedCommit.commit);
  await fetch(`${API}/${editId.val()}`, {
    method: "PATCH",
    body: JSON.stringify(editedCommit),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  render();
});

render();
