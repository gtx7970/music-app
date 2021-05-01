export function getRandomVal(prefix: string = '') {
  return prefix + (Math.random() + '').replace('0.', '')
}

export function getUid() {
  const t = (new Date()).getUTCMilliseconds()
  return '' + Math.round(2147483647 * Math.random()) * t % 1e10
}