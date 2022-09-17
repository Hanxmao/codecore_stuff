const { ADDRGETNETWORKPARAMS } = require('dns');
const readline= require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})

let target= Math.ceil(Math.random()*10);
console.log(target)



const ask=()=>{
rl.question(`I'm thinking of a number between 1 and 10\n`, answer =>{
    let count = 1
    if (answer!= target){
        console.log('Nope. Try again')
        count+=1
        ask()
        } else {
        console.log(`Guessed "${target}" correctly in ${count} attempts!`)
        rl.close()
    }
    
})
}

ask()


// const readline = require('readline');

// const rl = readline.createInterface({
//     input : process.stdin, 
//     output: process.stdout 
// })

// const rightNum = 3; 

// let guess = 1;
// function recursiveReadLine() {
//     rl.question(`${
//         guess == 1 ? 
//         'I am thinking of a number between 1 and 10. Wanna Take a guess?\n' 
//         : 'Nope. Try Again.\n'}`, 
//         (answer) => {
//         let answerNum = parseInt(answer);
//         if (answerNum === rightNum) {
//             console.log(`Guessed "${rightNum}" correctly in ${guess} times `);
//             return rl.close();
//         }
//         guess++;
//         recursiveReadLine(); 
//     });
//   };
  
// recursiveReadLine();