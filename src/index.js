document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOM has been fully loaded");
  // console.table(gifts);

  const ul = document.querySelector(".gift-list");
  ul.innerHTML = "";

  function btn(li) {
    const button = document.createElement("button");

    button.innerText = "x";
    li.appendChild(button);
    button.addEventListener("click", function () {
      ul.removeChild(li);
    });
  }
  fetch("http://localhost:3000/gifts")
    .then((response) => response.json())
    .then((data) => {
      eachGift(data);
      // const icon = document.querySelector(".ui icon input");
      const input = document.querySelector("#filter-input");
      // const search = document.querySelector(".search icon");

      input.addEventListener("keyup", function () {
        const arr = data.filter((e) => e.name.includes(input.value));
        ul.innerHTML = "";

        console.log(arr);
        eachGift(arr);
      });
    });
  function eachGift(arr) {
    arr.forEach((e) => {
      const img = document.createElement("img");
      const li = document.createElement("li");
      img.src = e["image"];
      img.alt = e["name"];
      li.innerText = e["name"] + " ";
      btn(li);
      li.appendChild(img);
      ul.appendChild(li);
    });
  }
  // eachGift(gifts);

  const form = document.querySelector("#new-gift-form");
  const giftName = document.querySelector("#gift-name-input");
  const giftImg = document.querySelector("#gift-image-input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = giftImg.value;
    img.alt = giftName.value;
    li.innerText = giftName.value + " ";
    btn(li);
    li.appendChild(img);

    ul.appendChild(li);
    const newData = {
      name: giftName.value,
      image: giftImg.value,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    };
    fetch("http://localhost:3000/gifts", config);
    //   gifts.push({ name: giftName.value, image: giftImg.value });
    e.target.reset();
  });

  // console.log(gifts);
});
