import { encode_length_prefixed } from "../env";

export let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function assert_args_addr(args: ArrayBuffer): void {
  assert(changetype<usize>(shared_mem) == changetype<usize>(args));
}

export function encode_result(result: Uint8Array): ArrayBuffer {
  shared_mem = encode_length_prefixed(result).buffer;
  return shared_mem;
}
