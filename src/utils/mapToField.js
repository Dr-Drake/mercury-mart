export default function mapToField(map, obj, relevantKeys){

    let clone = {...obj}

    let keys = Object.keys(clone)

    for (let i = 0; i < keys.length; i++){
        let key = keys[i];

        if (!(relevantKeys.includes(key))){
            delete clone[key]
        } else{
            clone[map[key]] = clone[key]
            delete clone[key]
        }
        
        
    }

    return clone;
}

/*let map = {
    "productName": "name",
    "productDescription": "description",
    "productPrice": "price",
    "categoryId" : "category",
    "createdAt" : "date"
}
let tObj = {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "productId": 0,
        "productName": "MacBook Pro",
        "productDescription": "This is a macbook",
        "productPrice": 650000,
        "categoryId": 0,
        "productSerialNumber": "123456",
        "attachmentLink": null,
        "attachmentPublicId": null,
        "attachmentFileName": null,
        "createdAt": "2021-01-24T23:46:21.874Z",
        "deletedAt": "2021-01-24T23:46:21.874Z"
}
let relevant = ["productName", "productDescription", "productPrice", "categoryId", "createdAt"]

console.log(mapToField(map, tObj, relevant)); */