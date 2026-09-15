const baseURL = "https://se-flashcards-api.en.tripleten-services.com/v1";

function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);
}
