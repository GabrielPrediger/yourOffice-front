import moment from 'moment';

export const formatDate = (value: number) => {
    const valor = moment(value).format('DD/MM/YYYY');

    return valor
    }