import moment from 'moment';
import 'colors';

export const LINE = '--------------';
export const UTF = 'utf8';

export const newDate = () => moment().format('DD/MM/YYYY HH:mm:ss:SS');
export const newDateWithMagenta = () => newDate().magenta;
export const indent = (n = 1) => ' '.repeat(n);
