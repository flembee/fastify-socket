import fs from 'fs';
import fp from 'fastify-plugin';
import { Storage } from '@google-cloud/storage';
import PDFParser from "pdf2json";

const ReadPdfPlugin = fp(async function ReadPdfPlugin(fastify) {

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

  // const readPdf = (file, folder) => {
  //   return storage
  //     .bucket(GCP_STORAGE_BUCKET)
  //     .upload(file.path, { destination: `${folder}/${file.filename }`})
  //     .then((res) => {
  //       fs.unlinkSync(file.path)

  //       const pdfParser = new PDFParser();

  //       pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  //       pdfParser.on("pdfParser_dataReady", pdfData => {
  //           return {
  //               message: 'success', 
  //               data: pdfData,
  //               url: ""/*`https://storage.googleapis.com/arambi/${folder}/${file.filename }`*/
  //           }
  //       });
      
  //       pdfParser.loadPDF(file);

  //     })
  // }

  // fastify.decorate('readPdf', {
  //   readPdfFile: async (file, folder) => readPdf(file, folder)
  // });
});

export default ReadPdfPlugin;
