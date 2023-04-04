import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import socketIO, { Socket } from 'socket.io-client'

const socketClient = socketIO('http://localhost:4000')

export default function App({ Component, pageProps, socket = socketClient }: AppProps & { socket: Socket }) {
  return <Component {...{ ...pageProps, socket }} />
}
