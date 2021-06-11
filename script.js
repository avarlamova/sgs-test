const CITIES = ["Москва", "Санкт-Петербург", "Челябинск", "Омск"];

const FACTORIES = {
  Москва: [1, 2, 3],
  "Санкт-Петербург": [4, 5, 6],
  Челябинск: [7, 8, 9],
  Омск: [10, 11, 12],
};

const WORKERS = {
  1: "Юрьев",
  2: "Петров",
  3: "Сидоров",
  4: "Романов",
  5: "Павлов",
  6: "Андреев",
  7: "Иванов",
  8: ["Кузнецов", "Кошкин"],
  9: "Ульянов",
  10: "Воронов",
  11: "Тихонов",
  12: ["Никитин", "Попов"],
};

//function to show corresponing workers and factories
function fillList(arr, id) {
  if (Array.isArray(arr)) {
    for (el of arr) {
      let options = document.createElement("option");
      document.getElementById(id).appendChild(options).innerText = el;
    }
  } else {
    let options = document.createElement("option");
    document.getElementById(id).appendChild(options).innerHTML = arr;
  }
}

fillList(CITIES, "cities");
//obtaining a full list of factories from object
let factories = Object.values(FACTORIES).reduce((e, f) => e.concat(f), []);
fillList(factories, "factories");

//obtaining a full list of workers from object
let workers = Object.values(WORKERS).reduce((e, f) => e.concat(f), []);
fillList(workers, "workers");

//changing values of lists when changing the other parameters
function refreshList(id, val) {
  let itemForm = document.getElementById(id);
  itemForm.innerHTML = "";
  itemForm = document.createElement("select");
  itemForm.id = id;
  itemForm.innerHTML = fillList(val, id);
}

cookieObject = {
  city: "",
  factory: "",
  worker: "",
};

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//obtaining cookie values if any
if (document.cookie) {
  let initialState = JSON.parse(getCookie("cookieObject"));

  if (initialState.city != "") {
    let initialCity = initialState.city;
    document.getElementById("cities").value = initialCity;
  }
  if (initialState.factory != "") {
    let initialFactory = initialState.factory;
    document.getElementById("factories").value = initialFactory;
    refreshList("factories", initialFactory);
  }
  if (initialState.worker != "") {
    let initialWorker = initialState.worker;
    document.getElementById("workers").value = initialWorker;

    refreshList("workers", initialWorker);
  }
}

function getKey(object, value) {
  return Object.keys(object).find((key) => object[key].includes(value));
}

document.getElementById("city").addEventListener("change", (el) => {
  chosenCity = el.target.value;
  cookieObject.city = chosenCity;

  //changing factories
  factories = FACTORIES[chosenCity];
  cookieObject.factory = factories;
  refreshList("factories", factories);

  //changing workers
  workers = [];
  factories.forEach((el) => workers.push(WORKERS[el]));
  cookieObject.worker = workers;

  refreshList("workers", workers);
  document.cookie = "cookieObject=" + JSON.stringify(cookieObject);
});

document.getElementById("factory").addEventListener("change", (el) => {
  chosenFactory = el.target.value;
  cookieObject.factory = chosenFactory;

  //changing city
  chosenCity = getKey(FACTORIES, parseInt(chosenFactory));
  cookieObject.city = chosenCity;
  refreshList("cities", chosenCity);

  //changing workers
  workers = WORKERS[chosenFactory];
  cookieObject.worker = workers;
  refreshList("workers", workers);
  document.cookie = "cookieObject=" + JSON.stringify(cookieObject);
});

document.getElementById("worker").addEventListener("change", (el) => {
  chosenWorker = el.target.value;
  cookieObject.worker = chosenWorker;

  //changing factory
  chosenFactory = getKey(WORKERS, chosenWorker);
  cookieObject.factory = chosenFactory;
  refreshList("factories", chosenFactory);

  //changing city
  chosenCity = getKey(FACTORIES, parseInt(chosenFactory));
  cookieObject.city = chosenCity;
  refreshList("cities", chosenCity);
  document.cookie = "cookieObject=" + JSON.stringify(cookieObject);
});

//function to reset cookies
document.getElementById("reset").addEventListener("click", () => {
  cookieObject = {
    city: "",
    factory: "",
    worker: "",
  };
  document.cookie = "cookieObject=" + JSON.stringify(cookieObject);
  location.reload();
});
//handling shifts
document.getElementById("shift").addEventListener("change", (el) => {
  chosenShift = el.target.value;
  document.getElementById("team").querySelector("option").textContent =
    chosenShift === "1" ? "Первая" : "Вторая";
});
//handling teams
document.getElementById("team").addEventListener("change", (el) => {
  chosenTeam = el.target.value;
  document.getElementById("shift").querySelector("option").textContent =
    chosenTeam === "1" ? "8:00-20:00" : "20:00-8:00";
});
