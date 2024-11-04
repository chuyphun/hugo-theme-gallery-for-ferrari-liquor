function ageConfirmed() {
    document.getElementById('ageVerificationModal').style.display = 'none';
    localStorage.setItem('ageVerified', 'true');
    //alert("Welcome! Enjoy responsibly.");
}

function ageDenied() {
    alert(ageDeniedTranslation);
    window.location.href = "https://www.google.com"; // Redirect to a safe page
}

// Show the modal on page load
window.onload = function() {
    if (!localStorage.getItem('ageVerified')) {
        document.getElementById('ageVerificationModal').style.display = 'flex';
    } else {
        document.getElementById('ageVerificationModal').style.display = 'none';
    }
};
