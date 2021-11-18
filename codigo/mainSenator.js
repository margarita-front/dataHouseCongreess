let senatorTable = document.getElementById("dataSenator");
let senateMembers = datosSenador.results[0].members;
let select_st = document.getElementById('state') //Datos en especificos
let filter_st = []; //vector de estados
let filter_member = []; //vector de miembros
let filter_par = []; //filtro de partidos
let statesAll = 'all'; //Generar persistencia
let party_checkboxes = document.getElementsByName('party');
console.log(senateMembers);


function filtrarSenadores() {
    if (filter_par.length === 0) {
        filter_member = senateMembers;
    } else {
        filter_member = [];
        senateMembers.forEach(member => {
            if (member.party === 'D' && filter_par.includes('D')) {
                filter_member.push(member)
            } else {
                if (member.party === 'R' && filter_par.includes('R')) {
                    filter_member.push(member)
                }
            }
        });

    }

    if (statesAll === 'all') {
        filter_member = filter_member;
    } else {
        filter_member = filter_member.filter(member => member.state === statesAll)
    }

}


function crearTabla() {
    senatorTable.innerHTML = ""
    filtrarSenadores()
    filter_member.forEach(member => {
        let items = document.createElement('tr')
        items.innerHTML = `<td><a target='_blank' href='${member.url}'>${member.first_name} 
        ${member.last_name}</a></td>
        <td>${member.party}</a></td>   
        <td>${member.state}</a></td>  
        <td>${member.seniority}</a></td>  
        <td>${member.total_votes}</a></td>`
        senatorTable.appendChild(items)
    })
}



senateMembers.forEach(member => {
    if (filter_st.includes(member.state)) {
        filter_st.push(member.state)
    }
})

filter_st.sort();

filter_st.forEach(state => {
    let option = document.createElement('option')
    option.innerHTML = state
    option.value = state
    select_st.appendChild(option)
})

select_st.addEventListener('change', (event) => {
    let sel_state = event.target.value
    statesAll = sel_state
    crearTabla()
})

party_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        let chekboxSel = event.target.value
        let checkLiber = event.target.checked
        if (filter_par.includes(chekboxSel) && !checkLiber) {
            filter_par = filter_par.filter(party => party !== chekboxSel)
        } else if (!filter_par.includes(chekboxSel) && checkLiber) {
            filter_par.push(chekboxSel)
        }
        crearTabla()
    })
})

select_st.addEventListener('change', (event) => {
    let sel_state = event.target.value
    statesAll = sel_state
    crearTabla()
})

crearTabla()