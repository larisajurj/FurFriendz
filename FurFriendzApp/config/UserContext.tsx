import React, {createContext, useContext, useState} from 'react';
import UserModel from '@/api/model/userModel'

export const UserContext = createContext<{
  user: UserModel | null;
  setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
} | null>(null);

export function useUserContext(){
    const user = useContext(UserContext);
    if(user === undefined){
        throw new Error("user is undefined");
    }

    return user;
}