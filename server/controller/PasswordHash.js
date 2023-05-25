const bcrypt = require("bcrypt");

async function encryptPass(plaintextPassword) {
  const salt = await bcrypt.genSalt(10)
  let rs = bcrypt.hashSync(plaintextPassword,salt)
//   console.log(rs)
    return rs;
}

async function comparePass(inputPassword,hashedPassword) {
    if(await bcrypt.compare(inputPassword,hashedPassword)){
        return true;
    }
    return false;
    
  }

module.exports.encryptPass = encryptPass;
module.exports.comparePass = comparePass;

