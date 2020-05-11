export function hasEmpty(obj) {
    let hasEmpty = false;
    for (let key in obj) {
        if (obj[key] === "") {
            hasEmpty = true;
            break;
        }
    }
    return hasEmpty;
}
