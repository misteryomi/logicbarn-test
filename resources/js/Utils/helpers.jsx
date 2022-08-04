import moment from 'moment';

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export function formatDate(date, useAgo = false) {
    return useAgo ? moment(date).fromNow() : moment(date).format('LL');
}

export function getEventValue(event) {
    return event.target.type === 'checkbox' ? event.target.checked : event.target.value;
}