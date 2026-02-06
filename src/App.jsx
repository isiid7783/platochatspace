import React, { useEffect, useState } from "react"
import { connectWallet } from "./wallet"
import { createNode } from "./libp2p"
import { generateKeys } from "./crypto"
import { saveToIPFS } from "./ipfs"
import { createZKIdentity } from "./zk"
import { rotateKeys } from "./rotation"

function App() {

  const [wallet, setWallet] = useState(null)
  const [node, setNode] = useState(null)
  const [keys, setKeys] = useState(null)
  const [zkId, setZkId] = useState(null)
  const [message, setMessage] = useState("")
  const [log, setLog] = useState([])

  useEffect(() => {
    async function init() {
      const signer = await connectWallet()
      setWallet(await signer.getAddress())

      const libp2pNode = await createNode()
      setNode(libp2pNode)

      const kp = generateKeys()
      setKeys(kp)

      const zk = createZKIdentity(await signer.getAddress())
      setZkId(zk)
    }

    init()
  }, [])

  async function sendMessage() {
    const cid = await saveToIPFS({
      message,
      timestamp: Date.now(),
      wallet
    })

    setLog(prev => [...prev, { message, cid }])
    setMessage("")
  }

  function rotate() {
    const newKeys = rotateKeys()
    setKeys(newKeys)
  }

  return (
    <div className="container">
      <h1>Plato Messenger Ultimate</h1>

      <p>Wallet: {wallet}</p>

      <textarea
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Encrypted message"
      />

      <button onClick={sendMessage}>
        Send → IPFS
      </button>

      <button onClick={rotate}>
        Rotate Keys
      </button>

      <pre>{JSON.stringify(log,null,2)}</pre>
    </div>
  )
}

export default App

