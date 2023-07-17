import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  const to_address = "abcd";
  const amount = env.make_native_amount(100, 0);
  const optional_sender_address = "efgh";

  // Call the abi
  env.transfer_coins(to_address, amount, optional_sender_address);

  return encode_result(new Uint8Array(0));
}
