import * as env from "./env";

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
  // /!\ Can't trace here
  // // env.log("allocating " + size.toString() + "bytes");

  shared_mem = new ArrayBuffer(size);
  return shared_mem;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
  assert(changetype<usize>(shared_mem) == changetype<usize>(_args));

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

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
