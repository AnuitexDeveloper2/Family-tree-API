declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // General
      PORT: string;

      // Auth
      API_KEY: string;

      // Database
      CONNECTION_STRING: string;
    }
  }

  namespace Storage {
    interface MultipartFile {
      toBuffer: () => Promise<Buffer>;
      file: NodeJS.ReadableStream;
      filepath: string;
      fieldname: string;
      filename: string;
      encoding: string;
      mimetype: string;
      fields: import("fastify-multipart").MultipartFields;
    }
  }
}

declare module "fastify" {
  interface FastifyRequest {
    incomingFile: Storage.MultipartFile;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
