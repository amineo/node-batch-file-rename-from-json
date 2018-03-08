/*
 * Batch File Renaming in Node from a JSON file
 * Anthony Mineo - anthonymineo.com
*/

// Require Node's File System module
const fs = require('fs');

// Read the JSON file
fs.readFile('data.json', function (error, data) {
    if (error) {
        console.log(error);
        return;
    }

    const obj = JSON.parse(data);

    // Iterate over the object
    Object.keys(obj).forEach(key => {
        let _from = `${__dirname}/files/${obj[key].guid}.zip`;
        let _to = `${__dirname}/files/${obj[key].name}.zip`;

        console.log(_from, _to); 

        fs.rename(_from, _to, function (err) {
             if (err){
                 console.log('ERROR: ' + err);

                 // If there was a file defined in the data.json that was supposed to be renamed but did not exist
                 // Let us know which files (if any) were missing
                 let stream = fs.createWriteStream(`${__dirname}/files/${obj[key].guid}.txt`);
                 stream.once('open', function (fd) {
                     stream.write("This file was supposed to be defined in the object\n");
                     stream.end();
                 });
            }
        });
    });
});