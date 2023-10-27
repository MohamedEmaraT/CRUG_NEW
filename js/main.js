// get total
// creat prodect
// clear the input
//save local storge
// show prodect
// count
//delet
// update
//serch
// clean dat
let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let counter = document.getElementById("Count");
let catigory = document.getElementById("catigory");
let creat = document.getElementById("creat");
let serch = document.getElementById("serch");
let serchByTitle = document.getElementById("serchtitle");
let serchByCatigory = document.getElementById("serchcategory");
let delletAll = document.getElementById("deleteAll");
let totalSpan = document.querySelector("#total span");

let btnCreat = "creat";

function totals() {
  if (price.value != "") {
    let theValue = +price.value + +texes.value + +ads.value - +discount.value;
    totalSpan.innerHTML = `${theValue}`;
  }
}
let arr;
if (localStorage.getItem("prodct")) {
  arr = JSON.parse(localStorage.getItem("prodct"));
  showData();
} else {
  arr = [];
}

creat.onclick = function () {
  let obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    texes: texes.value,
    ads: ads.value,
    discount: discount.value,
    total: totalSpan.innerHTML,
    counter: counter.value,
    catigory: catigory.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    catigory.value != "" &&
    counter.value <= 100
  ) {
    if (counter.value > 2) {
      for (let i = 0; i < counter.value; i++) {
        arr.push(obj);
      }
    } else {
      arr.push(obj);
    }

    title.value = "";
    price.value = "";
    texes.value = "";
    ads.value = "";
    discount.value = "";
    totalSpan.innerHTML = "";
    counter.value = "";
    catigory.value = "";
  }

  for (let i = 0; i < arr.length; i++) {
    localStorage.setItem("prodct", JSON.stringify(arr));
  }
  if (btnCreat === "UPDATE") {
    location.reload();
  }

  showData();
};

function showData() {
  let html = ``;

  for (let i = 0; i < arr.length; i++) {
    html += `  
  <tr>
  <td>${i + 1}</td>
  <td>${arr[i].title}</td>
  <td>${arr[i].price}</td>
  <td>${arr[i].texes}</td>
  <td>${arr[i].ads}</td>
  <td>${arr[i].discount}</td>
  <td>${arr[i].total}</td>
  <td>${arr[i].catigory}</td>
  <td><button class="btnn" onclick="updatedata(${i})"  type="button">Update</button></td>
  <td><button class="btnn" onclick="deleteOne(${i})" type="button">Delete</button></td>
</tr> `;
  }
  document.getElementById("tbody").innerHTML = html;
  theBtnn = document.getElementById("del");
  if (arr.length > 1) {
    theBtnn.innerHTML = ` <button id="deleteAll" onclick = "deletedAll()"	type="button">DeleteAll</button>`;
  }
}

function deleteOne(theI) {
  arr.splice(theI, 1);
  js = localStorage.setItem("prodct", JSON.stringify(arr));
  js = arr;
  if (arr.length === 0) {
    location.reload();
  }
  showData();
}

function updatedata(theI) {
  scroll({
    top: 0,
    behavior: "smooth",
  });
  btnCreat = "UPDATE";
  counter.style.display = "none";
  creat.innerHTML = btnCreat;
  if (btnCreat === "UPDATE") {
  }
  title.value = arr[theI].title;
  price.value = arr[theI].price;
  texes.value = arr[theI].texes;
  ads.value = arr[theI].ads;
  discount.value = arr[theI].discount;
  totalSpan.innerHTML = arr[theI].total;
  catigory.value = arr[theI].catigory;
  arr.splice(theI, 1);
  js = localStorage.setItem("prodct", JSON.stringify(arr));
  js = arr;
  showData();
}

let serchBy = "Title";

serchtitle.onclick = function () {
  serch.focus();
  serch.placeholder = "Serching By Title";
  serchBy = "Title";
};

serchcategory.onclick = function () {
  serch.focus();
  serch.placeholder = "Serching By Category";
  serchBy = "category";
};

let serchByy = function () {
  let trr = document.querySelectorAll("tr");
  for (let i = 0; i < trr.length; i++) {
    trr[i].style.display = "none";
  }
  if (serchBy == "Title") {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.startsWith(serch.value.toLowerCase())) {
        console.log(arr[i].title);
        console.log(i);
        trr[i + 1].style.display = "table-row";
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].catigory.startsWith(serch.value.toLowerCase())) {
        console.log(arr[i].title);
        console.log(i);
        trr[i + 1].style.display = "table-row";
      }
    }
  }
  if (serch.value === "") {
    showData();
  }
};

function deletedAll() {
  localStorage.clear();
  location.reload();
}

