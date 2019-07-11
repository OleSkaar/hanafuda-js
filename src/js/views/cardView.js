export const renderCard = card => {
    const markup = `
    <img src="${card.img}" class="card" data-cardname=${card.name}></img>
    `;
    document.querySelector('#table').insertAdjacentHTML('beforeend', markup);

};