// шаг 1. находим все HTML элементы

const travelForm = document.getElementById('travelForm');
const travelList = document.getElementById('cardList');
const emptyState = document.getElementById('emptyState');
const commentInput = document.getElementById('formComment');

 if (window.innerWidth < 500) {
        commentInput.placeholder = 'Лучшее путешествие...';
}

loadTravel();
updateEmptyState();

// submit form
travelForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const travelCountry = document.getElementById('formCountry').value.trim();
    const travelDate = document.getElementById('formDate').value;
    const travelComment = document.getElementById('formComment').value.trim();

    if (!travelCountry || !travelDate || !travelComment) {
        alert('Заполни все поля!');
        return;
    }

    const travelData = {
        id: Date.now(),
        travelCountry,
        travelDate,
        travelComment
    };

    saveTravel(travelData);

    renderTravel(travelData);

    updateEmptyState();

    travelForm.reset();

});

// создаем функцию, которая отрисует карточку
function renderTravel(travelData) {

    const card = document.createElement('div');

    const formattedDate = new Date(travelData.travelDate)
        .toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

    card.classList.add('card-travel');

    card.dataset.id = travelData.id;

    card.innerHTML = `
    
        <p>🌍 ${travelData.travelCountry}</p>

        <p>📅 ${formattedDate}</p>

        <p>📝 ${travelData.travelComment}</p>

        <button class="delete-btn">Удалить</button>

    `;

    card.querySelector('.delete-btn').addEventListener('click', () => {

        deleteTravel(travelData.id);

        card.remove();

        updateEmptyState();

    })

    travelList.appendChild(card);

}

function saveTravel(card) {

    const cards = JSON.parse(localStorage.getItem('cards')) || [];

    cards.push(card);

    localStorage.setItem('cards', JSON.stringify(cards));

}

function loadTravel() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];

    cards.forEach(card => renderTravel(card));
}

function updateEmptyState() {
    emptyState.style.display =
        travelList.childElementCount === 0 ? 'block' : 'none';
}

function deleteTravel (id) {
    let cards = JSON.parse(localStorage.getItem('cards')) || [];

    cards = cards.filter(card => card.id != id);

    localStorage.setItem('cards', JSON.stringify(cards));
}