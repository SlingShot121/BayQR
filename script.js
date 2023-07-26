// A function that parses URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// The function that sets the selected option of the dropdown
function setSelectedOption(selectElement, valueToSet) {
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value == valueToSet) {
            selectElement.options[i].selected = true;
            return;
        }
    }
}

// Mock reference values
var referenceValues = {
    '1': 'L63798',
    '2': 'L63549',
    '3': 'L67898',
    // Add more as needed
};

// When scan is successful function will produce data
function onScanSuccess(qrCodeMessage) {
    // Stop the scanner

    var currentReference = "2"

    html5QrCodeScanner.clear().then(() => {
        // Navigate to the URL
        window.location.href = qrCodeMessage + "&ref=" + currentReference;
    }).catch((err) => {
        console.log(err);
    });
}

// When scan is unsuccessful function will produce error message
function onScanError(errorMessage) {
    console.log(errorMessage);
}

// Setting up Qr Scanner properties
var html5QrCodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, /* verbose= */ false, /* disableFlip= */ true);

// Usage
window.onload = function () {
    var bay = getUrlParameter('bay');
    var ref = getUrlParameter('ref');
    var selectElement = document.getElementById('bays-id-503891');
    var inputElement = document.getElementById('reference-input');
    setSelectedOption(selectElement, bay);
    inputElement.value = referenceValues[ref];

    // Open the camera app when the button is clicked
    document.getElementById('scan-bay-button').addEventListener('click', function() {
        html5QrCodeScanner.render(onScanSuccess, onScanError);
    });
}
