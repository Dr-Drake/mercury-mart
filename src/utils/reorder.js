export default function reorder(obj, order){
    let result = {};

    for (let i = 0; i < order.length; i++){
        let key = order[i]
        result[key] = obj[key];
    }

    return result
}