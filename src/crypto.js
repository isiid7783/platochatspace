import nacl from "tweetnacl"
import util from "tweetnacl-util"

export function generateKeys() {
  return nacl.box.keyPair()
}

export function encrypt(message, theirPub, mySec) {
  const nonce = nacl.randomBytes(24)
  const encrypted = nacl.box(
    util.decodeUTF8(message),
    nonce,
    theirPub,
    mySec
  )
  return { encrypted, nonce }
}
