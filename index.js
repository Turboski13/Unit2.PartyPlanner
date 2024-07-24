const COHORT = "2405-FBT-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${2405-FBT-ET-WEB-PT}/events`;

const state = {
  events: [],
};

const eventsList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);
/**
 * Sync state with the API and rerender
 */
sync function render() {
    await getEvents();
    renderEvents();
  }
  render();
/**
 * Update state with events from API
 */
  async function getEvents() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.events = json.data;
    } catch (error) {
      console.error(error);
    }
  }

/**
 * Render events from state
 */
function renderEvents() {
    if (!state.events.length) {
      eventsListList.innerHTML = "<li>No events.</li>";
      return;
    }
  
    const eventCards = state.events.map((event) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h2>${events.name}</h2>
        <p>${events.description}</p>
        <p>${events.date}</p>
        <p>${events.location}</p>
      `;
      return li;
    });
  
    eventsListList.replaceChildren(...eventCards);
  }
  