export const configureId = (id) => {
    let finalId = "" + id

    if(finalId.length === 1) {
        finalId = "00" + finalId;
    } else if(finalId.length === 2) {
        finalId = "0" + finalId
    }

    return finalId
}