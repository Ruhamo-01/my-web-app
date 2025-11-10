const fs = require('fs');

fs.writeFile('example.txt', 'Hello World!', (err) => {
  if (err) throw err;
  console.log('File created successfully!');
});
