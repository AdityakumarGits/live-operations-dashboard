import { Response } from "express";

const clients: Response[] = [];

export const addClient = (res: Response) => {
  clients.push(res);

  res.on("close", () => {
    const index = clients.indexOf(res);

    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
};

export const sendUpdate = (data: unknown) => {
  const message = `data: ${JSON.stringify(data)}\n\n`;

  clients.forEach((client) => {
    client.write(message);
  });
};