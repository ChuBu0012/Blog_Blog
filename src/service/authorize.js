//เก็บ Token / username => session
export const authenticate = (res,next)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลง session
        sessionStorage.setItem("token",JSON.stringify(res.data.Token))
        sessionStorage.setItem("username",JSON.stringify(res.data.username))
    }
    next()
    
}

//ดึงข้อมูล token
export const gettoken = () =>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false;
        }
    }
}

export const getusername = () =>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false;
        }
    }
}

export const logout = (next) =>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("token")
        }else{
            return false;
        }
    }
    next()
}