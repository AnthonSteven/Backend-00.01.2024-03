const bcrypt = require('bcrypt')

const encrypt = async (plainPass) => {
  const hash = await bcrypt.hash(plainPass, 10)
  return hash
}

const compare = async (plainPass, hashedPass) => {
  // console.log(plainPass, hashedPass)
  return await bcrypt.compare(plainPass, hashedPass)
}

module.exports = { encrypt, compare }
