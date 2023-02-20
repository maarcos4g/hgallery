import { listAll, StorageReference } from "firebase/storage"
import { firestore } from "./services/firebase"

import { Header } from "./components/Header"
import { Image } from "./components/Image"
import { useEffect, useState } from "react";
import { collection, getDocs, } from "firebase/firestore";

export interface Photo {
  name: string;
  size: number;
  type: string;
  url: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>();

  async function getAllPhotosInDatabase() {
    const collectionRef = await collection(firestore, 'photos');
    const snapshot = await getDocs(collectionRef);


    const photoList: Photo[] = []
    snapshot.forEach((doc) => {
      const data = doc.data() as Photo;
      photoList.push(data)
    })
    setPhotos(photoList)
  }

  useEffect(() => {
    getAllPhotosInDatabase()
  }, [])

  return (
    <div className="w-full h-screen bg-[#FEFEFE]">
      <Header />

      <div className="px-24 py-10 grid grid-cols-5 gap-5">
        {photos && photos.map((photo) => (
          <Image key={photo.url} photo={photo} />
        ))}
      </div>
    </div>
  )
}

export default App