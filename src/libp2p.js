import { createLibp2p } from "libp2p"
import { webRTC } from "@libp2p/webrtc"
import { webSockets } from "@libp2p/websockets"
import { noise } from "@chainsafe/libp2p-noise"
import { mplex } from "@libp2p/mplex"
import { kadDHT } from "@chainsafe/libp2p-kad-dht"

export async function createNode() {
  const node = await createLibp2p({
    transports: [webRTC(), webSockets()],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
    services: {
      dht: kadDHT()
    }
  })

  await node.start()
  return node
}
