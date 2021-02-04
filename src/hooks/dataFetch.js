import useSWR from "swr";
import axios from "axios";
import { initializeStore } from '../redux/store';

const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEzIiwiVXNlckVtYWlsIjoibXIuZHIuaWtlbUBnbWFpbC5jb20iLCJuYW1laWQiOiIxNCIsIlVzZXJUeXBlIjoiMSIsInJvbGUiOiJTeXN0ZW1BZG1pbiIsIm5iZiI6MTYxMjE3Njc5MCwiZXhwIjoxNjEyMjYzMTkwLCJpYXQiOjE2MTIxNzY3OTB9.MU8tVNeJWQYldQYn7wit_QsDn0wdzQdhEqNJGQeYX7ryL9kfgT18cliN84WUMQSTUlcPt-VPOt4keIQtmT_Z3A'  
}
const fetcher = (...args) => axios.get(...args)
.then((response)=> response.data.objectValue);

const productFetcher = (...args) => axios.get(...args)
.then((response)=> response.data.objectValue);


export function useProduct () {
    const { data, error } = useSWR(process.env.PRODUCTS_API, productFetcher)
    console.log(data)
    return {
        products: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function useCategories(){
    const { data, error } = useSWR(process.env.CATEGORY_API, fetcher)
    return{
        categories: data,
        isLoading: !error && !data,
        isError: error
    }
}