import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../Services/firebase";

export const AuthContext = createContext();

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
  
        const unsubcribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return unsubcribe;
    },[]);


    return(
        <AuthContext.Provider value={{user, loading}} >
                {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;