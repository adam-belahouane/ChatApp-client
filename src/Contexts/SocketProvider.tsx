import { Socket } from 'dgram';
import React, { useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client"


const SocketContext : any = React.createContext({});

export function useSocket() : any {
  return useContext(SocketContext)
}

interface SocketProviderProps {
  id: string;
  children: React.ReactNode;
}

export function SocketProvider({ id, children }: SocketProviderProps) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket : any = io('http://localhost:3001', { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}