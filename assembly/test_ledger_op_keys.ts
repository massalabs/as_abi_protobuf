import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  const optional_address = "abcd";
  const bytecode = new Uint8Array(1);
  bytecode[0] = 21;
  const prefix = new Uint8Array(1);
  prefix[0] = 21;
  const key = new Uint8Array(1);
  key[0] = 21;

  env.generate_event(
    "bytecode = " +
      bytecode.toString() +
      ", prefix = " +
      prefix.toString() +
      ", key = " +
      key.toString()
  );

  env.get_balance(optional_address);
  env.get_bytecode(optional_address);
  env.set_bytecode(bytecode, optional_address);
  env.get_ds_keys(prefix, optional_address);

  env.get_balance(null);
  env.get_bytecode(null);
  env.set_bytecode(bytecode, null);
  env.get_ds_keys(prefix, null);

  env.get_op_keys(prefix);
  env.op_entry_exists(key);
  env.get_op_data(key);

  return encode_result(new Uint8Array(0));
}
