import { CloudSlash, Image } from "phosphor-react"
import colors from "tailwindcss/colors";

export function EmptyList() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5">
      <Image size={100} weight="thin" color={colors.zinc[600]} />
      <h1 className="text-center font-medium text-zinc-400">
        No momento sua galeria está vazia. Faça <br /> upload de alguma foto e volte para visualizar.
      </h1>
    </div>
  );
}