


async function auth(req, res, next) {

  try {
    console.log("in middleware")
  } catch (error) {
    
  } finally {
    next()
  }
}

module.exports = auth