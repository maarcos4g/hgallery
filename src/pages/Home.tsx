import { useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase"

import { Header } from "../components/Header"
import { Image } from "../components/Image"
import { collection, getDocs, query, where, } from "firebase/firestore";
import { EmptyList } from "../components/EmptyList";
import { useAuth } from "../hooks/useAuth";

export interface Photo {
  name: string;
  size: number;
  type: string;
  url: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }
}

export function Home() {
  const [photos, setPhotos] = useState<Photo[]>();
  const { user } = useAuth()

  async function getAllPhotosInDatabase() {
    if (!user) {
      console.log("Usuário não encontrado.")
    }

    const collectionRef = collection(firestore, 'photos');
    const queryUser = query(collectionRef, where('author.id', '==', user?.id));
    const snapshot = await getDocs(queryUser);

    const photoList: Photo[] = []
    snapshot.forEach((doc) => {
      const data = doc.data() as Photo;
      photoList.push(data)
    })
    setPhotos(photoList)
  }

  useEffect(() => {
    getAllPhotosInDatabase()
  }, [user])

  return (
    <div className="w-full h-screen bg-[#FEFEFE]">
      <Header />

      <div className="px-24 py-10 grid grid-cols-5 gap-5">
        {photos && photos.map((photo) => (
          <Image key={photo.url} photo={photo} />
        ))}
      </div>

      {photos?.length === 0 && <EmptyList />}
    </div>
  )
}