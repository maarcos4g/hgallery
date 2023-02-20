import { Image as PhosphorImage } from "phosphor-react"
import { Photo } from "../App";

interface ImageProps {
  photo: Photo;
}

export function Image({ photo }: ImageProps) {
  return (
    <a href={photo.url} target="_blank" className="flex flex-col items-center cursor-pointer">
      <img src={photo.url}
        alt={`${photo.name} do Banco de dados`}
        className="max-w-30 max-h-30"
      />
      <div className="w-full flex items-center justify-start gap-2 mt-2">
        <PhosphorImage size={28} />
        <span className="text-zinc-600 font-bold text-sm">{photo.name}</span>
      </div>
    </a>
  );
}