const btTest = document.getElementById("btTest");

btTest?.addEventListener("click", () => {
  fetch("http://localhost:3000/drawing/1")
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    }
    );
})