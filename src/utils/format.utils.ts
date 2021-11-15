import moment from 'moment'



export function dateToSqlDatetimeFormat(date: Date): string{
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
}