const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
console.log(fifaData.filter((element) => {
    return element['Year'] === 2014 && element['Stage'] === 'Final';
}));

//(a) Home Team name for 2014 world cup final
console.log('task 1a:', 
fifaData.filter((element, index) => {
    if(element['Year'] === 2014 && element['Stage'] === 'Final') {
        return element['Home Team Name'];
    };
}));
//(b) Away Team name for 2014 world cup final
console.log('task 1b:', fifaData.filter((element, index) => {
  if(element['Year'] === 2014 && element['Stage'] === 'Final') { 
      return element['Away Team Name'];
  };
}));
//(c) Home Team goals for 2014 world cup final
console.log('task 1c:', fifaData.filter((element, index) => {
    if(element['Year'] === 2014 && element['Stage'] === 'Final') {
        return element['Home Team Goals'];
    };
}));
//(d) Away Team goals for 2014 world cup final
console.log('task 1d:', fifaData.filter((element, index) => {
    if(element['Year'] === 2014 && element['Stage'] === 'Final') {
        return element['Away Team Goals'];
    };
}));
//(e) Winner of 2014 world cup final */
console.log('task 1e:', fifaData.filter((element, index) => {
    if(element['Year'] === 2014 && element['Stage'] === 'Final') {
        return element['Winner'];
    };
}));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/


function getFinals(array) {
    return array.filter(element => element['Stage'] === 'Final');
 }




/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, callback) {
    const years = callback(array).map(element => {return element.Year}) 
    return years  
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, callback) {
    const winners = callback(array).map(element => {
        if (element['Home Team Goals'] > element['Away Team Goals']) {
            return element['Home Team Name'];
        } else if (element['Home Team Goals'] < element['Away Team Goals']) {
            return element['Away Team Name'];
        } else if (element['Home Team Goals'] === element['Away Team Goals']) {
            if (element['Win conditions'].split(' ').splice(0, 1).join() === 'Brazil') {
                return "Italy";
            }else if (element['Win conditions'].split(' ').splice(0, 1).join() === 'Italy') {
                return "France";
            }
        }
    });
    return winners;
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */


function getWinnersByYear(array, getFinals, getYears, getWinners) {
    let year = getYears(array, getFinals);
    let country = getWinners(array, getFinals);
    let stringArr = []
    for (let index = 0; index < country.length; index++) {
        stringArr.push(`In ${year[index]}, ${country[index]} won the world cup!`);
    }
    return stringArr;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(getFinals) {
    let homeTeam = getFinals.map(element => element['Home Team Goals']).reduce((a, b) => (a + b));
    let awayTeam = getFinals.map(element => element['Away Team Goals']).reduce((a, b) => (a + b));
    let homeTeamA = homeTeam / getFinals.map(element => element['Away Team Goals']).length;
    let awayTeamA = awayTeam / getFinals.map(element => element['Home Team Goals']).length;
    let average = homeTeamA + awayTeamA;
    return average.toFixed(2);
 }



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
