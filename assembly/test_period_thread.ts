import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  // Call the abi
  var s = env.get_current_slot();

  env.generate_event("Current period: " + s.period.toString());
  env.generate_event("Current thread: " + s.thread.toString());

  return encode_result(new Uint8Array(0));
}
