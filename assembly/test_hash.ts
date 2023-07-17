import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  const buf = new Uint8Array(4);
  buf[0] = 0x31;
  buf[1] = 0x32;
  buf[2] = 0x33;
  buf[3] = 0x34;

  const hash_blake3 = env.hash_blake3(buf);
  env.generate_event("blake3Hash: " + hash_blake3.toString());

  const sha256_hash = env.hash_sha256(buf);
  env.generate_event("Hash Sha256: " + sha256_hash.toString());

  const keccak256_hash = env.hash_keccak256(buf);
  env.generate_event("Hash Keccak256: " + keccak256_hash.toString());

  return encode_result(new Uint8Array(0));
}
