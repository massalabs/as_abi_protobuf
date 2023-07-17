import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  env.generate_event("Call 1");
  env.generate_event("Call 2");

  return encode_result(new Uint8Array(0));
}
