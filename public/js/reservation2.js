console.log("hellooooooooo");


let submitButton = document.getElementById("submitButton")
submitButton.addEventListener('click', async () => {
    let guestCountRetrieved = document.getElementById("guestCount").value
    let bedSelectionRetrieved = document.getElementById("roomSelection").value 
    const dateRange = document.getElementById("dateselect").value
    const [checkInDate, checkOutDate] = dateRange.split(" - ");
    
    try {
        let response = await fetch("/api/session/getSession", {
            method: 'GET'
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const sessionData = await response.json();
        // console.log(sessionData);

        let preparedBody = {
            "guestCount": guestCountRetrieved,
            "userId": sessionData.userId,
            "roomId": bedSelectionRetrieved,
            "checkInDate": checkInDate,
            "checkOutDate": checkOutDate
        }

        const response2 = await fetch('/api/reservations/newRes', {
            method: 'POST',
            body: JSON.stringify(preparedBody),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response2.ok) throw new Error('Second fetch failed');
        const data2 = await response2.json();
        console.log(data2)


    
        console.log(preparedBody)
    } catch (error) {
        console.error("Error fetching session data:", error);
    }



})


