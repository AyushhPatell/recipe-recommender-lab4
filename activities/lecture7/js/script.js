// In this example, I want to create an interactive form that allows Newt Scamander create a sort of inventory of the Fantastic Beasts he's rescuing
// Here's what we'll need to do:
// 1. Grab the input a user enters into our form
// 2. Represent this input in a meaningful way, let's say an Object
// 3. Push the contents of that Object into an Array
// 4. Reset our form so that the user can add a new creature if they want without having to manually delete the previous input
// 5. Display the new creature in our Array back to the user on our page

let creatures = [];
document.getElementById('addCreatureForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('creatureName').value;
    let type = document.getElementById('creatureType').value;
    let habitat = document.getElementById('creatureHabitat').value;

    let newCreature = {
        name: name,
        type: type,
        habitat: habitat
    };

    creatures.push(newCreature);
    document.getElementById('addCreatureForm').reset();

    displayCreatures();
});

function displayCreatures() {
    let display = document.getElementById('creatureSanctuary');
    display.innerHTML = '';

    if (creatures.length == 0) {
        display.innerHTML = '<p>No creatures found!</p>';
        return;
    }

    let heading = document.createElement('h4');
    heading.textContent = 'We have ' + creatures.length + ' creatures';
    display.appendChild(heading);

    let list = document.createElement('ul');
    list.className = 'list-group mt-3';

    let i = 0;
    while (i < creatures.length)
    {
        let creature = creatures[i];
        let item = document.createElement('li');
        item.className = 'list-group-item';

        let text = creature.name + ' is a ' + creature.type + ' living in ' + creature.habitat;
        item.textContent = text;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-sm btn-danger float-right';

        deleteButton.onclick = function()
        {
            let index = i;
            creatures.splice(index, 1);
            displayCreatures();
        };

        item.appendChild(deleteButton);
        list.appendChild(item);
        i = i + 1;
    }
    display.appendChild(list);
}

function searchCreature() {
    let searchText = document.getElementById('searchBox').value;

    if (searchText == '') {
        displayCreatures();
        return;
    }

    searchText = searchText.toLowerCase();
    let display = document.getElementById('creatureSanctuary');
    display.innerHTML = '';

    let matchingCreatures = [];
    let i = 0;
    while (i < creatures.length)
    {
        let creature = creatures[i];
        let creatureName = creature.name.toLowerCase();
        let creatureType = creature.type.toLowerCase();

        if (creatureName.includes(searchText) || creatureType.includes(searchText))
        {
            matchingCreatures.push(creature);
        }
        i = i + 1;
    }

    if (matchingCreatures.length == 0)
    {
        display.innerHTML = '<p>No creatures found!</p>';
        return;
    }

    let heading = document.createElement('h4');
    heading.textContent = 'Found ' + matchingCreatures.length + ' creature(s)';
    display.appendChild(heading);

    let list = document.createElement('ul');
    list.className = 'list-group mt-3';

    let j = 0;
    while (j < matchingCreatures.length)
    {
        let creature = matchingCreatures[j];
        let item = document.createElement('li');
        item.className = 'list-group-item';
        let text = creature.name + ' is a ' + creature.type + ' living in ' + creature.habitat;
        item.textContent = text;

        list.appendChild(item);
        j = j + 1;
    }
    display.appendChild(list);
}
