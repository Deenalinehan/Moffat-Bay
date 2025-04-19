let loggedInIconDiv = document.getElementById("loggedInIconDiv");
let userFirstName = document.getElementById("userFirstName");



// function to flip the hiding or displaying of an element
function toggleVisibility(id, show) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'flex' : 'none';
}

// for reservation anchor in nav
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('hidden');

    // close dropdown when clicking outside
    document.addEventListener('click', handleClickOutside);
  }

// for reservation anchor in nav
  function handleClickOutside(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const menuLink = document.getElementById('reservation-link');
    
    if (!dropdown.contains(event.target) && !menuLink.contains(event.target)) {
      dropdown.classList.add('hidden');
      document.removeEventListener('click', handleClickOutside); // clean up listener
    }
  }

// when the page loads, conditionally render either the "log in" anchor or the "log out" anchor based on logged in status
// reservations are only available when logged in also
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/session/getSession')
        .then(res => res.json())
        .then(({ logged_in, firstName }) => {
            toggleVisibility('login-link', !logged_in);
            toggleVisibility('logout-link', logged_in);
            toggleVisibility('reservation-link', logged_in);
            toggleVisibility('loggedInIconDiv', logged_in)
            if (firstName) {
                userFirstName.innerHTML = firstName
                console.log(userFirstName)
            }
        });
});


// when the log out anchor is clicked, call route to end user session
document.getElementById('logout-link').addEventListener('click', async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users/logoutUser', {
        method: 'POST',
    });

    if (res.ok) {
        window.location.href = '/login';
    } else {
        alert('Failed to log out.');
    }
});