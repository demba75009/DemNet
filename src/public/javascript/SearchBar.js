window.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".Search");
  const div = document.querySelector("#search-menu-container");
  console.log(input);

  div.innerHTML = "";

  input.addEventListener("input", (e) => {
    const pseudo = e.target.value;

    axios
      .get(`/User?pseudo=` + pseudo)
      .then((res) => {
        console.log(res);

        div.innerHTML = res.data;
      })
      .catch((err) => console.log(err));
  });
});
