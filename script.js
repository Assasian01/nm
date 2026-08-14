// Get saved participants
let participants =
    JSON.parse(localStorage.getItem("participants")) || [];

const form = document.getElementById("registrationForm");
const table = document.getElementById("participantTable");
const total = document.getElementById("totalParticipants");
const emptyMessage = document.getElementById("emptyMessage");
const search = document.getElementById("search");


// Display participants
function displayParticipants(data = participants) {

    table.innerHTML = "";

    if (data.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    data.forEach((person, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>${person.name}</strong>
            </td>

            <td>${person.email}</td>

            <td>${person.workshop}</td>

            <td>${person.mode}</td>

            <td>
                <span class="status">
                    Confirmed
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteParticipant(${person.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    total.textContent = participants.length;
}


// Registration
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const phone =
        document.getElementById("phone").value.trim();

    const workshop =
        document.getElementById("workshop").value;

    const organization =
        document.getElementById("organization").value.trim();

    const mode =
        document.getElementById("mode").value;


    // Duplicate checking
    const alreadyRegistered =
        participants.some(
            person => person.email === email
        );

    if (alreadyRegistered) {

        alert(
            "This email is already registered!"
        );

        return;
    }


    // Create participant
    const participant = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        workshop: workshop,

        organization: organization,

        mode: mode,

        registrationDate:
            new Date().toLocaleDateString()

    };


    // Add participant
    participants.push(participant);


    // Save to browser
    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );


    // Update table
    displayParticipants();


    // Show confirmation
    document.getElementById("confirmationText").textContent =
        `Thank you ${name}! Your seat for ${workshop} has been successfully confirmed.`;

    document.getElementById("popup").style.display =
        "flex";


    // Reset form
    form.reset();

});


// Delete participant
function deleteParticipant(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this registration?"
        );

    if (!confirmDelete) {
        return;
    }

    participants =
        participants.filter(
            person => person.id !== id
        );


    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );


    displayParticipants();
}


// Search
search.addEventListener("input", function() {

    const keyword =
        search.value.toLowerCase();

    const filtered =
        participants.filter(person =>

            person.name
                .toLowerCase()
                .includes(keyword)

            ||

            person.email
                .toLowerCase()
                .includes(keyword)

            ||

            person.workshop
                .toLowerCase()
                .includes(keyword)

        );

    displayParticipants(filtered);

});


// Close popup
function closePopup() {

    document.getElementById("popup")
        .style.display = "none";

}


// Initial display
displayParticipants();