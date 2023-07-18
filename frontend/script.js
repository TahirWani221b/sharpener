async function allAppointments() {
    try {
        const result = await axios.get('http://localhost:4000/get-data/');
        let printData = "";
        let count = 1;
        if (result.data.length > 0) {
            result.data.forEach(user => {
                printData += '<tr><th scope = "row">' + count + '</th><td class="name">' + user.name + '</td><td class="email">' + user.email + '</td><td class="phone">' + user.phone + '</td></td><td><button data-info = ' + user.id + ' data-actionType = "delete" class="action mx-2 delete btn btn-primary">Delete</button><button data-info = ' + user.id + ' data-actionType = "edit" class="action mx-2 edit btn btn-primary">Edit</button></td></tr>';
                count++;
            });
            document.getElementById('booking-log-table-body').innerHTML = printData;
        } else {
            document.getElementById('booking-log-table-body').innerHTML = '<tr><td class="text-center" colspan = "5" ><h3>Data Not Available!!</h3><td></tr>';
        }

        let action = Array.from(document.getElementsByClassName('action'));
        action.forEach(element => {
            element.addEventListener('click', (event) => {
                let actionType = event.target.getAttribute('data-actionType');
                if (actionType == 'delete') {
                    let appointmentID = event.target.getAttribute('data-info');
                    axios.post('http://localhost:4000/delete-data/', {
                        id: appointmentID
                    })
                        .then(result => {
                            allAppointments();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    let id = event.target.getAttribute('data-info');
                    let name = event.target.parentElement.parentElement.getElementsByClassName('name')[0].innerText;
                    let phone = event.target.parentElement.parentElement.getElementsByClassName('phone')[0].innerText;
                    let email = event.target.parentElement.parentElement.getElementsByClassName('email')[0].innerText;

                    document.getElementById('name').value = name;
                    document.getElementById('email').value = email;
                    document.getElementById('phone').value = phone;

                    document.getElementById('booking-form-submit').setAttribute('data-submitType', 'update-user');
                    document.getElementById('booking-form-submit').setAttribute('data-info', id);
                    document.getElementById('booking-form-submit').innerText = 'Update';

                    window.scrollTo({
                        top: 0
                    });
                }
            })
        });
    } catch (error) {
        alert(error);
        return false;
    }
}
allAppointments();

/// Below code is used to save data and update data in the database using 'booking-from' route
const bookingForm = document.getElementById('bookingForm');
const formSubmit = document.getElementById('booking-form-submit');

formSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let bookingformData = new FormData(bookingForm);
    for (let [key, value] of bookingformData.entries()) {
        if (!value) {
            alert('ERROR : Please Fill all the fields!');
            return false;
        } else if (key === 'email' && (value.indexOf('@') === -1)) {
            alert('ERROR : Please Enter a valid Email Address!');
            return false;
        } else if (key === 'phone' && (value.length > 10)) {
            alert('ERROR : Please Enter a valid Phone number!');
            return false;
        }
    }
    const submitType = formSubmit.getAttribute('data-submitType');
    bookingformData.append('submitType', submitType);
    if (formSubmit.hasAttribute('data-info')) {
        bookingformData.append('id', formSubmit.getAttribute('data-info'));
    }
    async function bookAppointment() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const stringifiedData = new URLSearchParams(bookingformData).toString();
            const response = await axios.post('http://localhost:4000/booking-form/', stringifiedData, config);
            console.log(response);
            if (response.data === true) {
                allAppointments();
            } else {
                alert(response);
            }
            bookingForm.reset();
        } catch (error) {
            alert(error);
            return false;
        }
    }
    bookAppointment();
});


