import cookie from "cookie";

export default function setCookies(res, name, value){
    if (res){
        res.setHeader('Set-Cookie', cookie.serialize(name, value));
        return
    }

    // Default
    document.cookie = cookie.serialize(name, value)
};