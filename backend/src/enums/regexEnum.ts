export const regexEnum = {
    email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/,
    name: /^[A-Z][a-z]{1,9}$/,
    car: /^[A-Z][a-z0-9-]*(\s[A-Z][a-zA-Z0-9-]*)*$/
};