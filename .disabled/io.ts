// import { Server as NetServer } from "http";
// import { NextApiRequest } from "next";
// import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
//   if (!res.socket.server.io) {
//     const path = "/api/socket/io";
//     const httpServer: NetServer = res.socket.server as any;
//     const io = new ServerIO(httpServer, {
//       path: path,
//       // @ts-ignore
//       addTrailingSlash: false,
//     });
//     res.socket.server.io = io;
//   }

//   res.end();
// }

// export default ioHandler;
// ioHandler.ts

import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import  zlib  from "zlib";
export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    // Enable permessage-deflate compression
    const io = new ServerIO(httpServer, {
      path: path,
      perMessageDeflate: {
        zlibDeflateOptions: {
          level: 5,
        },
        zlibInflateOptions: {
          
        },
        clientNoContextTakeover: true, // Accept clients that do not support context takeover
        serverNoContextTakeover: true, // Accept servers that do not support context takeover
        serverMaxWindowBits: 10, // Max window size for compression
        memLevel: 7, // Memory level for compression
      },
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
