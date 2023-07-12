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

  const buf = new Uint8Array(4);
  buf[0] = 0x31;
  buf[1] = 0x32;
  buf[2] = 0x33;
  buf[3] = 0x34;

  const hash_blake3 = env.hash_blake3(buf);

  const bs58_hash = env.bytes_to_base58_check(hash_blake3);
  const hash_form_bs58 = env.base58_check_to_bytes(bs58_hash);

  env.generate_event("hash_blake3: " + hash_blake3.toString());
  env.generate_event("bs58_hash: " + bs58_hash);
  env.generate_event("hash_form_bs58: " + hash_form_bs58.toString());

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
