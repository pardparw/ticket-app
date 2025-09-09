const addticket = async (formData) => {
//    console.log(formData)
    const response = await fetch('http://localhost:4000/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        )
        if (!response.ok) {
            throw new Error(`Http error, ${response.status}`);
        }
        alert("Add Successfully")

}



const form = document.querySelector('form');
form.addEventListener('submit', ((e) => {
    e.preventDefault();


    const flightType = form.querySelector('input[name="flight-type"]:checked')?.id || '';
    const inputs = form.querySelectorAll('input[type="text"], input[type="date"]');
    const flyingFrom = inputs[0].value;
    const flyingTo = inputs[1].value;
    const departing = inputs[2].value;
    const returning = inputs[3].value;

    const selects = form.querySelectorAll('select');
    const adults = selects[0].value;
    const children = selects[1].value;
    const travelClass = selects[2].value;

    const formData = {
        start_airport: flyingFrom,
        end_airport: flyingTo,
        go_date: departing,
        back_date: returning,
        passenger_adult: adults,
        passenger_children: children,
        class: travelClass,
        type: flightType
       
    };
    addticket(formData)

}))