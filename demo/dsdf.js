let sum = arr => arr.reduce((prev, current) => prev + current, 0)

function test(num, org = num, result = []) {
  if (sum(result) === org) {
    return console.log(result)
  }
  for (var i = 1; i <= num; i++) {
    result.push(i)
    test(num - i, org, result)
    result.pop()
  }
}
test(6)
