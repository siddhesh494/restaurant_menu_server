


async function auth(req, res, next) {

  try {
    console.log("in middleware")
    next()
  } catch (error) {
    
  } finally {
  }
}

module.exports = auth