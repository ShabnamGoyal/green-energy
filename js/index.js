function readWhatIsClicked(event) {
    let whatIsClicked = event.target;

    // alert(whatIsClicked.innerHTML);
}

//readWhatIsClicked('whatever');

window.addEventListener('click', readWhatIsClicked);

let btn = document.getElementById('controls');
let listItems = btn.children;

function handleClick(ev) {

    let currentItem = ev.target;

    let $dc = document.getElementById('dynamic-content');
    //loop throught the list of all buttons
    for (let i = 0; i < listItems.length; i++) {

        //if button contains attribute type of id
        if (listItems[i].hasAttribute('id')) {
            //remover the attribute type of id
            listItems[i].removeAttribute('id');
        }
    }

    //add attribute to the currently clicked element
    let selectedPartial = '';
    if (currentItem.hasAttribute('src')) {
        // checking if image click

        currentItem.parentNode.setAttribute('id', 'active-button');
        selectedPartial = currentItem.parentNode.getAttribute("class");
    } else {
        currentItem.setAttribute('id', 'active-button');
        selectedPartial = currentItem.getAttribute("class");
    }

    let data = fetch("content/content.json")
        .then(response => response.json())
        .then((json) => {

            let markup = `<h1>${json[selectedPartial].heading}</h1>
                        <section class="content">
                            <img src="${json[selectedPartial].imageURL}" alt="${json[selectedPartial].imageAlt}" />
                            <p>${json[selectedPartial].bodyText}</p>
                        </section>`;

            $dc.innerHTML = markup;
        });


}

//registering list items for click event:
for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', handleClick);
}
