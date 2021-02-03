const months =[
    "Jan", "Feb", "Mar",
    "April", "May", "June",
    "July", "Aug", "Sept",
    "Oct", "Nov", "Dec"
] 
export default function formatDate(dateString){
    let date = new Date(dateString);
    return date.toLocaleDateString('en-GB')
}