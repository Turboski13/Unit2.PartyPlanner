const COHORT = "2405-FBT-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${COHORT}/events`;

const state = {
  events: [],
};

const eventsList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");

addEventForm.addEventListener("submit", addEvent);
/**
 * Sync state with the API and rerender
 */
async function render() {
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

/* // async // await example
(async () => {
    for (let i = 0; i < 5; i++) {
        await getEvents();
        const pElm = document.createElement("p");
        pElm.innerText = state.events[i] ? state.events[i].name : 'No event';
        document.getElementById('content').append(pElm)
        }
})();
 */
/**
 * Ask the API to create a new event based on form data
 * @param {Event} event
 */
async function addEvents(event) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        description: addEventForm.description.value,
        date: addEventForm.date.value,
        location: addEventForm.location.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}

//initial Arrrays for the table
const headers = ["Name", "Date", "Location", "Description"];
const initialEvents = [
  /**
   * Render events from state
   */
  function renderEvents() {
    if (!state.events.length) {
      eventsList.innerHTML = "<li>No events.</li>";
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

    eventsList.replaceChildren(...eventCards);
  },
];

//create the table
const table = document.createElement("table");
const tableHeader = document.createElement("thead");
const headerRow = document.createElement("tr");
const tableBody = document.createElement("tbody");

//attach table elements to body
body.append(table);
table.append(tableHeader);
table.append(tableBody);

//fill table header
headers.forEach((item) => {
  const th = document.createElement("th");
  th.innerText = item;
  headerRow.append(th);
});
tableHeader.append(headerRow);
