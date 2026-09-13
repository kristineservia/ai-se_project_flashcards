const getQuote = () => {
  fetch("https://se-quotes-api.en.tripleten-services.com/v1/quotes/random")
    .then((res) => {
      console.log(res.status); // check response status
      console.log(res.headers.get("Content-Type")); // check Content-Type
      return res.json();
    })
    .then((data) => {
      console.log(data); // what's going on in the body?
    });
};

const button = document.querySelector(".button");
button.addEventListener("click", getQuote);
