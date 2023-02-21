import { useAuth } from "../hooks/useAuth";

import { GoogleLogo, Image } from "phosphor-react";
import colors from "tailwindcss/colors";

export function Login() {
  const { signInWithGoogle } = useAuth()

  return (
    <div className="w-full h-screen bg-[#FEFEFE] flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center">
        <Image size={120} weight="light" color={colors.zinc[700]} />
        <h1 className="font-bold text-zinc-900 text-xl">hGallery</h1>
        <p className="font-light text-zinc-700 text-sm">Entre e comece a guardar suas fotos.</p>
      </div>

      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center gap-3 bg-blue-400 px-4 py-3 rounded-lg text-white font-semibold text-base hover:bg-blue-400/90 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <GoogleLogo size={22} weight="bold" />
        Entrar na plataforma
      </button>
    </div>
  );
}