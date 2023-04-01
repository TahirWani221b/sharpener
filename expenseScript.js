document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();
        if (document.getElementById('myForm').checkValidity()) {
            callForm()
        } else {
            alert('Please Fill Out All the Fields');
        }
    })
    function callForm() {
        const key = 1;
        return () => {
            let formData = new FormData(document.getElementById('myForm'));
            const formDataObj = Object.fromEntries(formData.entries());
            localStorage.setItem('key' + key, JSON.stringify(formDataObj));
            this.key++;
        }
    }
})