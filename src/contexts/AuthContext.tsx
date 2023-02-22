import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
    // navigate({ pathname: "/home" })
  }, [])

  useEffect(() => {
    const onSubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !email) {
          throw new Error('Missing information from Google Account');
        }

        const newUser = {
          id: uid,
          name: displayName,
          avatar: photoURL!,
          email: email,
        };

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate({ pathname: "/home" })
      } else {
        setUser(undefined);
        localStorage.removeItem('user');
        navigate({ pathname: "/" })
      }
    })

    return () => {
      onSubscribe();
    }
  }, [navigate])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !email) {
        throw new Error('Missing information from Google Account');
      }

      const newUser = {
        id: uid,
        name: displayName,
        avatar: photoURL!,
        email: email,
      };

      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate({ pathname: "/home" })
    }
  }


  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}