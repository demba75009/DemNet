window.addEventListener("DOMContentLoaded", () => {
  const AvatarForm = document.querySelector(".formAvatar");
  const ChangePhoto = document.querySelector(".ChangePhoto");

  const avatar = document.querySelector(".avatar");

  ChangePhoto.addEventListener("click", () => {
    avatar.click();
  });

  avatar.addEventListener("change", () => {
    AvatarForm.submit();
  });
});
