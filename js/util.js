const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}
const formatDate = date => {
  return `${MONTHS[date.getMonth() + 1]} ${date.getDate()}`
}

const formatNumber = num => num.toLocaleString('en')

const formatTime = time => {
  const minutes = time.getMinutes()
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${time.getHours()}:${paddedMinutes}`
}

const formatTimeAmount = timeAmount => {
  const time = Math.abs(timeAmount)
  if (time < 60) return `${Math.round(time)} minutes`
  else if (time >= 60 && time < 1440) return `${Math.round(time / 60)} hours`
  else if (time >= 1440) return `${Math.round(time / 60 / 24)} days`
}
