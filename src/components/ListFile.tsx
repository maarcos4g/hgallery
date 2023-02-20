import { CheckCircle, WarningCircle } from 'phosphor-react'
import { Spinner } from "react-activity";
import { filesize } from 'filesize';
import colors from 'tailwindcss/colors'

import "react-activity/dist/library.css";

interface ListFileProps {
  loading: boolean;
  file: File;
  onSuccess: boolean;
  onError: boolean;
}

export function ListFile({ loading, file, onSuccess, onError }: ListFileProps) {

  const fileSize = filesize(file.size)

  return (
    <ul className='w-full'>
      <p className='mt-4 text-xs mb-1'>Arquivo selecionado:</p>
      <li className='flex gap-8 justify-between items-center text-[#444]'>
        <div className='flex flex-col'>
          <strong>{file.name}</strong>
          <span className='text-xs text-[#999] mt-1'>
            {fileSize.toString()}
          </span>
        </div>

        <div className='mr-4 flex items-center gap-2'>
          {loading && <Spinner />}
          {onSuccess && <CheckCircle size={24} color={colors.green[400]} weight="bold" />}
          {onError && <WarningCircle size={24} color={colors.red[400]} weight="bold" />}
        </div>
      </li>
    </ul>
  );
}