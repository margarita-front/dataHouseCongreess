//Elemento controlador entre la vista y el modelo de datos->Pseudo Modelo Vista Controlador
//Capturas de datos para las tabla de houseAttendance
let democrats_table = document.getElementById('democrats_td');
let republicans_table = document.getElementById('republicans_td');
let independents_table = document.getElementById('independents_td');
let total_table = document.getElementById('total_td');
//house_least_engaged//house_most_engaged
let list_leastEngaged = document.getElementById('senate_least_engaged');
let list_mostEngaged = document.getElementById('senate_most_engaged');
//house_least_loyalty//house_most_loyalty
let list_leastLoyalty = document.getElementById('senate_least_loyalty'); //Esta parte se integra a DOM
let list_mostLoyalty = document.getElementById('senate_most_loyalty'); //Esta parte se integra a DOM
//let list_leastLoyalty=document.getElementById('house_least_loyalty');//Esta parte se integra a DOM
//let list_mostLoyalty=document.getElementById('house_most_loyalty');//Esta parte se integra a DOM


/*FUNCION PARA LLENAR TABLA SUPERIOR*/
function paintTable(congress, party, partyVotes, partyTable) {
    let item = document.createElement('td')
    item.innerHTML = congress[party].length
    let item2 = document.createElement('td')
    item2.innerHTML = congress[partyVotes].toFixed(2) + '%' //ponga el dato en factor decimal y agregue porcentaje
    partyTable.appendChild(item)
    partyTable.appendChild(item2)
}

function getDocument() {
    paintTable(senate_static, 'democrats', 'democrats_average_party', democrats_table);
    paintTable(senate_static, 'republicans', 'republicans_average_party', republicans_table);
    paintTable(senate_static, 'independents', 'independents_average_party', independents_table);

    let item = document.createElement('td');
    item.innerHTML = senateMembers.length;
    let item2 = document.createElement('td');
    item2.innerHTML = ((senate_static.independents_average_party +
        senate_static.republicans_average_party +
        senate_static.democracts_average_party) / 3).toFixed(2) + '%';
    total_table.appendChild(item);
    total_table.appendChild(item2); //Indice general  
}
/*Funcion que presenta datos de House Engagged*/
function createListEngaged(array, table, engaged_votes, engaged_pct) {
    array.forEach(member => {
        let item = document.createElement('tr') //craer un arranque de row o fila
        item.innerHTML = `<td><a target='_blank' href='${member.url}'>${member.first_name}
                              ${member.middle_name || ""}
                              ${member.last_name}</a></td>
                              <td>${member[engaged_votes]}</td> 
                              <td>${member[engaged_pct]}%</td> `
        table.appendChild(item)
    })
}
/*Funcion que presenta datos de House Engagged*/
function createListLoyalty(array, table, loyalty_votes, loyalty_pct) {
    array.forEach(member => {
        let item = document.createElement('tr') //craer un arranque de row o fila
        item.innerHTML = `<td><a target='_blank' href='${member.url}'>${member.first_name}
                              ${member.middle_name || ""}
                              ${member.last_name}</a></td>

                              <td>${Math.round(member[loyalty_votes] /100 * member[loyalty_pct])}</td> 

                              <td>${member[loyalty_pct]}%</td> `
        table.appendChild(item)
    })
}
//---------------------------------------------------
getDocument()
    //Llamar funcion para menos y mas comprometidos
function documentSelection() {
    if (document.getElementById("senateAttendance")) {
        createListEngaged(senate_static.least_engaged, list_leastEngaged, 'missed_votes', 'missed_votes_pct')
        createListEngaged(senate_static.most_engaged, list_mostEngaged, 'missed_votes', 'missed_votes_pct')
    } else if (document.getElementById("senateLoyalty")) {
        createListLoyalty(senate_static.least_loyalty, list_leastLoyalty, 'total_votes', 'votes_with_party_pct')
        createListLoyalty(senate_static.most_loyalty, list_mostLoyalty, 'total_votes', 'votes_with_party_pct')
    }
}
documentSelection()