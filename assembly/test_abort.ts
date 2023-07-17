import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  env.generate_event("will call abort()");

  // will cause a call to abort()
  assert(false, "abort test message");

  return encode_result(new Uint8Array(0));
}
