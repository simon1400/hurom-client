const fs = require('fs');

export default (path, xml) => {
  fs.writeFile(path, xml, (err) => {
    if (err) return console.log(err);
    console.log(`Xml write in --> ${path}`);
  });
}
