import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../firebase.init';

const useAdmin = () => {
    const [user, userLoading] = useAuthState(auth);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    if(userLoading){
        setLoading(true);
    }
    
    useEffect(()=>{
        if(user){
            const email = user?.email;

            fetch(`/api/is-admin/${email}`)
            .then(res => res.json())
            .then(adminInfo =>{
                setAdmin(adminInfo?.isAdmin);
                setLoading(false);
            })
        }
    }, [user]);


    return [admin, loading];
};

export default useAdmin;