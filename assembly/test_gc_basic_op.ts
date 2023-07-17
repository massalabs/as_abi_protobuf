import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

/*
 * Gas calibration: the most basic unit test for ops
 */
export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  let a = 1;
  let b = 2;
  let c = a + b;
  // debug only
  // env.generate_event(`${a} + ${b} == ${c}`);

  return encode_result(new Uint8Array(0));
}
