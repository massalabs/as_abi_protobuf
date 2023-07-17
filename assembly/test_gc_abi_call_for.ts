import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

/*
 * Gas calibration: the most basic unit test for abi call
 */
export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  let count: u64 = 11;
  for (let y: u64 = 0; y < count; ++y) {
    env.generate_event("foo");
  }

  return encode_result(new Uint8Array(0));
}
