import * as Dialog from '@radix-ui/react-dialog';

import { Image, Plus, X } from "phosphor-react"
import { useAuth } from '../hooks/useAuth';
import { DropZone } from './Dropzone';

export function Header() {
  const { user } = useAuth();

  const initialName = user?.name[0]

  return (
    <div className="w-full px-24 py-3 flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <Image size={48} color="#183A8C" />
        <span className="text-blue-400 font-bold text-lg">hGallery</span>
      </div>

      <div className='flex items-center gap-4'>
        <Dialog.Root>
          <Dialog.Trigger
            type='button'
            className='border border-blue-400 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700'
          >
            <Plus size="20" className="text-blue-400" />
            Novo upload
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='w-screen h-screen bg-zinc-100/80 fixed inset-0' />

            <Dialog.Content className='absolute p-10 bg-zinc-300 rounded-2xl w-full max-w-md flex flex-col justify-center gap-4 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Dialog.Close className="absolute right-6 top-6 text-zinc-900 hover:text-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700">
                <X size={24} aria-label="Fechar" />
              </Dialog.Close>

              <DropZone />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {user?.avatar ?
          <img src={user?.avatar} className="w-10 h-10 rounded-full border-[2px] border-blue-400 cursor-pointer" /> :
          <span className='w-10 h-10 border rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold text-2xl'>
            {initialName}
          </span>}
      </div>
    </div>
  );
}