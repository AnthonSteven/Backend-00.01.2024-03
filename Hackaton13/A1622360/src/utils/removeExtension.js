const removeExtension = (filename) => {
  return filename.split('.').shift()
}

module.exports = removeExtension
