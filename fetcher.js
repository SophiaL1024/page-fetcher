const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {
  if (error) {
    return console.error(error);
  }
  console.log('statusCode:', response && response.statusCode);
  if (fs.existsSync(args[1])) {
    rl.question('file already exists, do you want to rewrite?', (answer) => {
      if (answer !== 'y') {
        process.exit();
      }else{
        rl.close();
      }
      fs.writeFile(args[1], body, (error) => {
        if (error) {
          return console.error(error);
        }
        console.log(`Download and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}`);
      })
    })
  }
});


