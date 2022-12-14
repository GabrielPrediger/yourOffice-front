import moment from 'moment';

export const formatDate = (value: number | undefined | string) => {
    const valor = moment(value).add(1, "days").format('DD/MM/YYYY');

    return valor
}

export const formatStringDate = (value: | string) => {
    const valor = moment(value).format('DD/MMM/YYYY');

    return valor
}