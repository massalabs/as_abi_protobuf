import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  const key = new Uint8Array(1);
  const data = new Uint8Array(1);
  key[0] = 21;
  data[0] = 99;

  env.generate_event("key = " + key.toString() + ", data = " + data.toString());

  const optional_address = "abcd";

  env.set_ds_value(key, data, optional_address);
  env.get_ds_value(key, optional_address);
  env.append_ds_value(key, data, optional_address);
  env.delete_ds_entry(key, optional_address);
  const ds_entry_exists = env.ds_entry_exists(key, optional_address);

  env.generate_event("ds_entry_exists = " + ds_entry_exists.toString());

  env.set_ds_value(key, data, null);
  env.get_ds_value(key, null);
  env.append_ds_value(key, data, null);
  env.delete_ds_entry(key, null);
  const ds_entry_exists_null = env.ds_entry_exists(key, null);

  env.generate_event("ds_entry_exists = " + ds_entry_exists_null.toString());

  return encode_result(new Uint8Array(0));
}
