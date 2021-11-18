//let houseMembers=houseDatos.results[0].members;
//console.log(houseMembers);
let house_statics={  //objeto estadistico para pintarlo en DOM House
    democrats:[],
    republicans:[],
    independents:[],
    democrats_average_party:0,
    republicans_average_party:0,
    independents_average_party:0,
    most_engaged:[],
    least_engaged:[],
    most_loyalty:[],
    least_loyalty:[]
}
let houseMembers=houseDatos.results[0].members.filter(member =>member.total_votes != 0);
//Calculo de representantes por estados
function saveHousePartyMember(party,caract)
{   house_statics[party]=houseMembers.filter(member =>member.party===caract)
}
//Llamar a la funcion por cada partido
saveHousePartyMember('democrats','D');
saveHousePartyMember('republicans','R');
saveHousePartyMember('independents','I');
//--------------------------------------------------------
//Calculo de porcentaje de votos por partido
function estimateHouseAverageVotes(party,membersVotes)
{
    house_statics[party].forEach(member =>{
        house_statics[membersVotes]=house_statics[membersVotes]+
                                    member.votes_with_party_pct/house_statics[party].length;
                                   
    })
}
//Llamar a la funcion por cada partido
estimateHouseAverageVotes('democrats','democrats_average_party');
estimateHouseAverageVotes('republicans','republicans_average_party');
estimateHouseAverageVotes('independents','independents_average_party');
//****************************************/
//Estimacion de mas/menos comprometidos/leales(Attendance/Loyalty)
function estimateStatsMembers(votes, most, least)
{   houseMembers.sort((membermin,membermay)=>{
     if(membermin[votes]>membermay[votes])
        return 1;
    if(membermin[votes]<membermay[votes])
        return -1;
    return 0
    })
    for(let i=0; i < (Math.round(houseMembers.length*0.1));i++)
    {  house_statics[most].push(houseMembers[i]);       }//Creciente

    for(let j=houseMembers.length-1;  j > houseMembers.length -1 -(Math.round(houseMembers.length*0.1));j--)
    {  house_statics[least].push(houseMembers[j]);  }  //Decreciente
}
estimateStatsMembers("missed_votes_pct", 'most_engaged','least_engaged')
estimateStatsMembers("votes_against_party_pct", 'most_loyalty','least_loyalty')



