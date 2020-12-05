import moment from 'moment';

export function validateDate(date){
    const extractionDate = date.split(".");
    const verifyDate = moment(date).format('dd.mm.YYYY');
    if((verifyDate === "Invalid date")){
        return false;
    } else {
        const day = extractionDate[0];
        const month = extractionDate[1];
        const year = extractionDate[2];
        if(day && month && year){
            return true
        }
        return false
    }
}