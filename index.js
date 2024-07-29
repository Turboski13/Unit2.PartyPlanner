const COHORT = "2405-ftb-et-web-pt";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventsList = document.querySelector("#events");
const addEventsForm = document.querySelector("#addEvents");

addEventsForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  console.log(API_URL);
  await getEvents();
  console.log("State after fetching events:", state);
  renderEvents();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    state.events = json.data;
    console.log("Fetched events:", state.events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}


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
      <h1>${event.name}</h1>
      <p>${event.description}</p>
      <p>${event.date}</p>
      <p>${event.location}</p>
      <button type="button" onclick="() => eventDelete(${event.id})">Delete</button>
    `;
    return li;
  });
  eventsList.replaceChildren(...eventCards);
}

/**
 * Ask the API to delete an event
 * @param {number} id
 */
  async function eventDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
  
      render();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

 

/**
 * Ask the API to create a new event based on form data
 * @param {Event} event
 */ 
async function addEvent(event) {
  event.preventDefault();

  try {
    console.log(addEventsForm.location.value);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventsForm.name.value,
        description: addEventsForm.description.value,
        date: new Date (addEventsForm.date.value),
        location: addEventsForm.location.value,
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