export function recordChannel({ to, next }) {
  var regResult = location.search.match(/channel=([0-9]+)/)
  if (!regResult) {
    regResult = String(to.query.channel).match(/^[0-9]+$/)
  }
  if (regResult) {
    localStorage.channel = regResult[1]
  }
  return next()
}
