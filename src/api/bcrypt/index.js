const bcrypt = require('bcrypt');
const saltRounds = 12;

function hash(myPlaintextPassword) {
    const myPlaintextPasswordStr = myPlaintextPassword.toString();
    return bcrypt.hashSync(myPlaintextPasswordStr, saltRounds);
}
  
function compare(myPlaintextPassword, hashedPassword) {
    return bcrypt.compareSync(myPlaintextPassword, hashedPassword); 
}
  
module.exports.hash = hash;
module.exports.compare = compare;