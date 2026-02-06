import { Identity } from "@semaphore-protocol/identity"

export function createZKIdentity(seed) {
  return new Identity(seed)
}
