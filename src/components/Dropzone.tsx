import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import clsx from 'clsx'

import Dropzone from 'react-dropzone'
import { Image } from "phosphor-react"
import { ListFile } from './ListFile';

import { firestore, storage } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function DropZone() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showList, setShowList] = useState(false)
  const [file, setFile] = useState<File>()

  async function handleUploadFile(file: File) {
    const storageRef = ref(storage, `images/${file.name}`)
    const response = await uploadBytesResumable(storageRef, file);
    await response.task.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
      // setLoading(progress)
      // },
      error => {
        setError(true)
        alert(error);
      },
      () => {
        getDownloadURL(storageRef)
          .then(async (url) => {
            const newMedia = {
              name: file.name,
              size: file.size,
              type: file.type,
              url: url,
              author: user
            }
            await setDoc(
              doc(firestore, "photos", `${file.name}`),
              newMedia)
              .then((response) => {
                setSuccess(true)
                setLoading(false)
                // console.log(response)
              })
              .catch((error) => {
                setError(true)
                setLoading(false)
                // console.log(error)
              });
          })
          .catch((error) => console.log('Erro download url: ' + error))
      }
    )
  }

  return (
    <div>
      <Dropzone accept={{ "image/*": [] }}
        onDrop={(acceptedFiles, _, dropEvent) => {
          acceptedFiles.length ? setShowList(true) : alert("Arquivo não suportado!");
        }}
        onDropAccepted={(files, onAcceptedEvent) => {
          setFile(files[0])
          handleUploadFile(files[0])
        }}
      >
        {({ getInputProps, getRootProps, isDragActive, isDragReject }) => (
          <div {...getRootProps()} className={clsx("cursor-pointer w-full h-full p-2 flex flex-col items-center", {
            "border border-dashed border-red-500 cursor-not-allowed": isDragReject,
          })}>
            <input {...getInputProps()} />
            <Image size={96} className="text-zinc-800" />

            {showList || !isDragActive &&
              <p className='text-zinc-900 font-extrabold text-xl text-center'>
                Solte o arquivo aqui <br />
                ou <br />
                Clique para selecionar</p>}

            {isDragReject && <p className='text-zinc-900 font-extrabold text-xl text-center'>Arquivo não suportado</p>}
          </div>
        )}
      </Dropzone>

      {showList && <ListFile loading={loading} file={file!} onSuccess={success} onError={error} />}
    </div>
  );
}