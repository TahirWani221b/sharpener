document.addEventListener('DOMContentLoaded', function () {
    /*print all the data when page loads */
    let totalKeys = Object.keys(localStorage).length;
    if (totalKeys == 0) {
        tableNoData = "<tr id='no_data'><td colspan='4' class='text-center text-danger'>Data Not Available.<tr></tr>";
        document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', tableNoData);
    }
    for (const [key, value] of Object.entries(localStorage)) {
        let valueObj = JSON.parse(value);
        let tableData = "<tr data-key=" + key + ">";
        for (const [indKey, indVal] of Object.entries(valueObj)) {
            tableData += "<td>" + indVal + "</td>";
        }
        tableData += "<td><button class='edit btn btn-primary'>Edit</button></td><td><button class='delete btn btn-danger'>Delete</button></td><tr>";
        tableData += "</tr>";
        document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', tableData);
    }
    /* on submit save data */
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();
        if (document.getElementById('myForm').checkValidity()) {
            let formData = new FormData(document.getElementById('myForm'));
            const formDataObj = Object.fromEntries(formData.entries());
            localStorage.setItem('key' + (++totalKeys), JSON.stringify(formDataObj));
            var allInputs = document.querySelectorAll('input');
            allInputs.forEach(singleInput => singleInput.value = '');
            let tableData = "<tr data-key=" + 'key' + totalKeys + ">";
            for (const [indKey, indVal] of Object.entries(formDataObj)) {
                tableData += "<td>" + indVal + "</td>";
            }
            tableData += "<td><button class='edit btn btn-primary'>Edit</button></td><td><button class='delete btn btn-danger'>Delete</button></td><tr>";
            tableData += "</tr>";
            if (document.getElementById('no_data')) document.getElementById('no_data').remove();
            document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', tableData);
        } else {
            alert('Please Fill Out All the Fields');
        }
    })
    /* on delete, delete from localstorage */
    document.addEventListener("click", function (e) {
        const target = e.target.closest(".delete");
        if (target) {
            let dataParent = target.parentElement.parentElement;
            let keyname = dataParent.getAttribute('data-key');
            localStorage.removeItem(keyname);
            dataParent.remove();
            console.log(totalKeys);
            totalKeys--;
            if (totalKeys == 0) {
                tableNoData = "<tr id='no_data'><td colspan='4' class='text-center text-danger'>Data Not Available.<tr></tr>";
                document.getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', tableNoData);
            }
        }
    });
    /* on edit , edit your data */

})