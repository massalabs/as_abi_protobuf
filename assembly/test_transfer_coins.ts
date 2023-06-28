import { AddressCategory, NativeAmount } from "massa-proto-as/assembly";
import * as env from "./env";

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
  // /!\ Can't trace here
  // // env.log("allocating " + size.toString() + "bytes");

  shared_mem = new ArrayBuffer(size);
  return shared_mem;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
  assert(changetype<usize>(shared_mem) == changetype<usize>(_args));

  // For test purposes, we create two fake addresses (won't work on the blockchain)

  const to_address = "abcd"
  const amount = new NativeAmount(100, 0);
  const optional_sender_address = "efgh";

  // Call the abi
  env.transfer_coins(to_address, amount, optional_sender_address);

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
