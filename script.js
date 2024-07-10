function getRandomX(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function notifyBot() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userid');
    fetch('https://yourserver.com/webhook', { // Replace with your server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
    });
}

window.onload = () => {
    const lastVisit = getCookie('lastVisit');
    const now = new Date().getTime();
    const waitTime = 3 * 60 * 1000; // 10 minutes in milliseconds 10 * 60 * 1000

    if (lastVisit && (now - lastVisit) < waitTime) {
        const timeLeft = waitTime - (now - lastVisit);
        const minutes = Math.floor(timeLeft / (60 * 1000));
        const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        document.body.innerHTML = `<div class="title">Пожалуйста подождите ${minutes} минут и ${seconds} секунд для получения следующего сигнала.</div>`;
    } else {
        setCookie('lastVisit', now, 10); // Set cookie for 10 minutes
        const coefficientElement = document.getElementById('coefficient');
        const randomX = getRandomX(1.09, 1.45);
        coefficientElement.textContent = randomX;
        notifyBot(); // Notify the bot about the page visit
    }
};
