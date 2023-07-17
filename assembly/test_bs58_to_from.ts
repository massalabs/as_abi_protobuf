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

  const bs58_hash = env.bytes_to_base58_check(hash_blake3);
  const hash_form_bs58 = env.base58_check_to_bytes(bs58_hash);

  env.generate_event("hash_blake3: " + hash_blake3.toString());
  env.generate_event("bs58_hash: " + bs58_hash);
  env.generate_event("hash_form_bs58: " + hash_form_bs58.toString());

  return encode_result(new Uint8Array(0));
}
