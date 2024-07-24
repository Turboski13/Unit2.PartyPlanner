const COHORT = "2405-FBT-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${2405-FBT-ET-WEB-PT}/events`;

const state = {
  events: [],
};

const eventsList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

sync function render() {
    await getEvents();
    renderEvents();
  }
  render();

  async function getEvents() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.events = json.data;
    } catch (error) {
      console.error(error);
    }
  }