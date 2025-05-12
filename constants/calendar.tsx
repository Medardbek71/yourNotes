const dayjs = require('dayjs')
const toArray = require('dayjs/plugin/toArray')
const isToday = require('dayjs/plugin/isToday')

dayjs.extend(toArray)
dayjs.extend(isToday)

export const daysOfWeek = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
export const daysOfWeekMin = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
export const monthsOfYear = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
export const monthsOfYearMin = ['Jan','Fev','Mar','Avr','Mai','Aou','Sep','Nov','Dec']
const day = dayjs().startOf('week')

const day1 = day.add(1,'day')
const day2 = day.add(2,'day')
const day3 = day.add(3,'day')
const day4 = day.add(4,'day')
const day5 = day.add(5,'day')
const day6 = day.add(6,'day')
const day7 = day.add(7,'day')


const today = new Date().getDay()
const currentMonth = new Date().getMonth()
const currentDayNumber = new Date().getDate()
const currentYear = new Date().getFullYear()

export const currentWeek = [ day1 , day2 , day3 , day4 , day5 , day6 , day7 ]

export const currentDate = `${daysOfWeek[today]} ${currentDayNumber} ${monthsOfYear[currentMonth]} ${currentYear}` 