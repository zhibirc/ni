export const alphabet = {
    variable: /^(?:[A-Z]+(?:_?[A-Z]+)+|\$[a-z]{2,}[a-zA-Z]{2,78}|[a-zA-Z]{3,80})$/,
    operator: /^$/,
    keyword: /^(?:till|if)$/
};