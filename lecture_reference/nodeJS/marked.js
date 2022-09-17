let target= process.argv[2];
const resultFile= process.argv[3];


const fs= require('fs');
let result= ''

fs.readFile(target, {encoding: 'utf8'}, (err, data)=>{
        if(err){
            console.log('Error: ', err)
        }else {
            data= data.split('\n')
            for(let i=0; i<data.length; i++){
                if(data[i].endsWith('yes')){
                    data.splice(i, 1)
                }
            }
            result= data
        } 
    })  
console.log(result)
// fs.writeFile(resultFile, newStr, (err)=>{
//     console.log("File created!")
// })







// const fs = require('fs');
// const fileToRead = process.argv[2];
// const fileToCreate = process.argv[3];
// fs.readFile(
//     ./${fileToRead},
//     { encoding: 'utf-8' },
//     (err, data) => {
//         if (err) {
//             console.log('Error', err)
//         } else {
//             const dataArr = data.split('\n');
//             const newStrArr = [];
//             dataArr.forEach((line) => {
//                 if (!line.endsWith('yes')) {
//                     newStrArr.push(line)
//                 }
//             }
//             )
//             const newStr = newStrArr.join('\n')
//             fs.writeFile(./${fileToCreate}, newStr, (err) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log('File is created');
//                 }
//             }
//             )
//         }
//     });