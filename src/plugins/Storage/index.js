import fs from 'fs';
import fp from 'fastify-plugin';
import { Storage } from '@google-cloud/storage';

const StoragePlugin = fp(async function StoragePlugin(fastify) {
  // const {config: { gcpcloud }} = fastify;

  // const {
  //   GCP_PROJECT_ID,
  //   GCP_SERVICE_ACCOUNT,
  //   GCP_PRIVATE_KEY,
  //   GCP_STORAGE_BUCKET
  // } = gcpcloud

  // const privateKey = fs.readFileSync(GCP_PRIVATE_KEY)

  // const storage = new Storage({
  //   projectId: GCP_PROJECT_ID,
  //   credentials: {
  //     client_email: GCP_SERVICE_ACCOUNT,
  //     private_key: privateKey
  //   }
  // })

  // const upload = (file, folder) => {
  //   return storage
  //     .bucket(GCP_STORAGE_BUCKET)
  //     .upload(file.path, { destination: `${folder}/${file.filename }`})
  //     .then((res) => {
  //       fs.unlinkSync(file.path)
  //       return {message: 'success', url: ""/*`https://storage.googleapis.com/arambi/${folder}/${file.filename }`*/}
  //     })
  // }

  // fastify.decorate('upload', {
  //   uploadFile: async (file, folder) => upload(file, folder)
  // });
});

export default StoragePlugin;
