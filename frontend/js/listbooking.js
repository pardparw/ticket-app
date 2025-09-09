
const getValue = async () => {

    const response = await fetch('http://localhost:4000/ticket')
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json();
    return data;
}

const deleteTicket = async (id) => {
    console.log(id)
    if (confirm(`You Need To Delete ${id}`) == true) {
        const response = await fetch('http://localhost:4000/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        )
        if (!response.ok) {
            throw new Error(`Http error, ${response.status}`);
        }
        window.location.href = ""
    }

}


const setBooking = async () => {
    const bookingValue = await getValue();
    bookingValue.forEach(element => {
        const myDiv = document.getElementsByClassName("styled-table")[0];

        const row = document.createElement("tr");
        const start_airport = document.createElement("td");
        const end_airport = document.createElement("td");
        const go_date = document.createElement("td");
        const back_date = document.createElement("td");
        const passenger_adult = document.createElement("td");
        const passenger_children = document.createElement("td");
        const classType = document.createElement("td");
        const typeofFlight = document.createElement("td");
        const deleteBtn = document.createElement("td");

        row.className = "active-row";

        // Example values (replace with real data or variables)
        start_airport.textContent = element.start_airport;
        end_airport.textContent = element.end_airport;
        go_date.textContent = element.go_date.slice(0, 10);
        back_date.textContent = element.back_date.slice(0, 10);
        passenger_adult.textContent = element.passenger_adult;
        passenger_children.textContent = element.passenger_children;
        classType.textContent = element.class;
        typeofFlight.textContent = element.type;
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteTicket(element.id)
        })
        deleteBtn.style = "color: red";

        // Append <td> elements to row
        row.appendChild(start_airport);
        row.appendChild(end_airport);
        row.appendChild(go_date);
        row.appendChild(back_date);
        row.appendChild(passenger_adult);
        row.appendChild(passenger_children);
        row.appendChild(classType);
        row.appendChild(typeofFlight);
        row.appendChild(deleteBtn);

        // Append row to table body
        myDiv.querySelector("tbody").appendChild(row);



    });
}

setBooking()