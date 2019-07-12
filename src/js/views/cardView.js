export const renderCard = (card, el) => {
    console.log(card);
    const markup = `<img src="${card.img}" class="card" data-cardname=${card.name}></img>`;
    el.insertAdjacentHTML('beforeend', markup);

};