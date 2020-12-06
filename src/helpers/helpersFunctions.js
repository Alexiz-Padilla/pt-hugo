import moment from 'moment';
import _ from 'lodash';

export function validateDate(date) {
    const extractionDate = date.split(".");
    const verifyDate = moment(date).format('dd.mm.YYYY');
    if ((verifyDate === "Invalid date")) {
        return false;
    } else {
        const day = extractionDate[0];
        const month = extractionDate[1];
        const year = extractionDate[2];
        if (day && month && year) {
            return true
        }
        return false
    }
}

export function dynamicBubbleSort(arr, key) {
    const l = arr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - 1 - i; j++) {
            if (arr[j][key] > arr[j + 1][key]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
};

export function getSequence(data, key) {
    const curatedData = _.isObject(data) ? _.values(data) : data;
    if (curatedData.length) {
        const sortData = dynamicBubbleSort(curatedData, key);
        const initStateData = _.keyBy(sortData, key);
        return initStateData[sortData[sortData.length - 1][key]][key] + 1;
    }
    return 1;
};