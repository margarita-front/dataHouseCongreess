//let senateMembers=houseDatos.results[0].members;
//console.log(senateMembers);
let senate_static = { //objeto estadistico para pintarlo en DOM House
    democrats: [],
    republicans: [],
    independents: [],
    democrats_average_party: 0,
    republicans_average_party: 0,
    independents_average_party: 0,
    most_engaged: [],
    least_engaged: [],
    most_loyalty: [],
    least_loyalty: []
}
let senateMembers = datosSenador.results[0].members.filter(member => member.total_votes != 0);
//Calculo de representantes por estados
function saveHousePartyMember(party, caract) {
    senate_static[party] = senateMembers.filter(member => member.party === caract)
}
//Llamar a la funcion por cada partido
saveHousePartyMember('democrats', 'D');
saveHousePartyMember('republicans', 'R');
saveHousePartyMember('independents', 'I');
//--------------------------------------------------------
//Calculo de porcentaje de votos por partido
function estimateHouseAverageVotes(party, membersVotes) {
    senate_static[party].forEach(member => {
        senate_static[membersVotes] = senate_static[membersVotes] +
            member.votes_with_party_pct / senate_static[party].length;

    })
}
//Llamar a la funcion por cada partido
estimateHouseAverageVotes('democrats', 'democrats_average_party');
estimateHouseAverageVotes('republicans', 'republicans_average_party');
estimateHouseAverageVotes('independents', 'independents_average_party');
//****************************************/
//Estimacion de mas/menos comprometidos/leales(Attendance/Loyalty)
function estimateStatsMembers(votes, most, least) {
    senateMembers.sort((membermin, membermay) => {
        if (membermin[votes] > membermay[votes])
            return 1;
        if (membermin[votes] < membermay[votes])
            return -1;
        return 0
    })
    for (let i = 0; i < (Math.round(senateMembers.length * 0.1)); i++) { senate_static[most].push(senateMembers[i]); } //Creciente

    for (let j = senateMembers.length - 1; j > senateMembers.length - 1 - (Math.round(senateMembers.length * 0.1)); j--) { senate_static[least].push(senateMembers[j]); } //Decreciente
}
estimateStatsMembers("missed_votes_pct", 'most_engaged', 'least_engaged')
estimateStatsMembers("votes_against_party_pct", 'most_loyalty', 'least_loyalty')