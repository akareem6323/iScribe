document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    function setElementValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value || '';
            element.textContent = value || '';
        }
    }

    const PN = urlParams.get('PN');
    const PID = urlParams.get('PID');
    const ACN = urlParams.get('ACN');
    const SD = urlParams.get('SD');
    const EDT = urlParams.get('EDT');
    const OP = urlParams.get('OP');
    const AR = urlParams.get('AR');
    const RDT = moment().format('YYYY-MM-DD hh:mm A');
    const MMN = urlParams.get('MMN');
    const SN = urlParams.get('SN');
    const SBP = urlParams.get('SBP');
    const CP = urlParams.get('CP');
    const DP = urlParams.get('DP');

    setElementValue('PN', PN || 'Patient Name Not Provided');
    setElementValue('PID', PID || '123456');
    setElementValue('ACN', ACN || '78901234');
    setElementValue('SD', SD || 'Study Description Not Provided');
    setElementValue('EDT', EDT || '2023-08-25 10:00 AM');
    setElementValue('OP', OP || 'Dr. Smith');
    setElementValue('AR', AR || 'Dr. Johnson');
    setElementValue('RDT', RDT || '2023-08-25 2:00 PM');
    setElementValue('MMN', MMN || 'Model Name Not Provided');
    setElementValue('SN', SN || 'Station Name Not Provided');
    setElementValue('SBP', SBP || 'Body Part Not Provided');
    setElementValue('CP', CP || 'Capture Protocol Not Provided');
    setElementValue('DP', DP || 'Display Protocol Not Provided');

    setElementValue('PNInput', PN || '');
    setElementValue('PIDInput', PID || '123456');
    setElementValue('ACNInput', ACN || '78901234');
    setElementValue('SDInput', SD || '');
    setElementValue('EDTInput', EDT || '2023-08-25 10:00 AM');
    setElementValue('OPInput', OP || 'Dr. Smith');
    setElementValue('ARInput', AR || 'Dr. Johnson');
    setElementValue('RDTInput', RDT || '2023-08-25 2:00 PM');
    setElementValue('MMNInput', MMN || '');
    setElementValue('SNInput', SN || '');
    setElementValue('SBPInput', SBP || '');
    setElementValue('CPInput', CP || '');
    setElementValue('DPInput', DP || '');


});


