import { assert_args_addr, encode_result } from "./sdk/shared_mem";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  return encode_result(new Uint8Array(0));
}
