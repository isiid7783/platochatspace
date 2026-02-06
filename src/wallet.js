import { ethers } from "ethers"

export async function connectWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" })
  const provider = new ethers.BrowserProvider(window.ethereum)
  return await provider.getSigner()
}

export async function resolveENS(name) {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return await provider.resolveName(name)
}
