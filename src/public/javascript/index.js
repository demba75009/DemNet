window.addEventListener("DOMContentLoaded", () => {
  const div = document.querySelector(".card-body");

  const button = document.querySelectorAll(".btn-outline-danger");
  const editer = document.querySelectorAll(".btn-outline-warning");

  button.forEach((e) => {
    e.addEventListener("click", (event) => {
      const PostId = event.target.getAttribute("PostId");
      console.log(PostId);
      axios
        .delete(`Posts/${PostId}`)
        .then((res) => {
          div.innerHTML = res.data;
        })
        .catch((err) => console.log(err));
    });
  });

  editer.forEach((e) => {
    e.addEventListener("click", (event) => {
      const PostId = event.target.getAttribute("PostId");
      axios
        .get(`Posts/Edit/${PostId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    });
  });
});
