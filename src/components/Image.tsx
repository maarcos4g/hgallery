import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../services/firebase";

import { Photo } from "../pages/Home";
import { Image as PhosphorImage, TrashSimple } from "phosphor-react"

import colors from "tailwindcss/colors";
import { deleteDoc, doc } from "firebase/firestore";

interface ImageProps {
  photo: Photo;
}

export function Image({ photo }: ImageProps) {
  async function handleDeleteImageInDatabase(path: string) {
    const result = confirm(`Deseja excluir ${path} da sua galeria?`)

    if (result) {
      const storageRef = ref(storage, `images/${path}`);

      await deleteObject(storageRef)
        .then(() => console.log("Imagem deletada"))
        .catch(() => console.log("Erro ao deletar imagem"));

      await deleteDoc(doc(firestore, "photos", path))
        .then(() => console.log("imagem deleteda do banco"))
        .catch(() => console.log("Erro ao deletar imagem do banco"));

      return alert("Imagem deletada com sucesso!")
    } else {
      return;
    }

  }

  return (
    <div>
      <a href={photo.url} target="_blank" className="flex flex-col items-center cursor-pointer">
        <img src={photo.url}
          alt={`${photo.name} do Banco de dados`}
          className="max-w-30 max-h-30"
        />
      </a>
      <div className="w-full flex items-center justify-between mt-2">
        <div className="flex items-center justify-center gap-2">
          <PhosphorImage size={28} />
          <span className="text-zinc-600 font-bold text-sm">{photo.name}</span>
        </div>
        <TrashSimple
          size={24}
          color={colors.red[600]}
          className="cursor-pointer"
          onClick={() => handleDeleteImageInDatabase(photo.name)} />
      </div>
    </div>
  );
}