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

  env.generate_event(
    env.stringToUint8Array(
      "key = " + key.toString() + ", data = " + data.toString()
    )
  );

  const optional_address = "abcd";

  env.set_data(key, data, optional_address);
  env.get_data(key, optional_address);
  env.append_data(key, data, optional_address);
  env.delete_data(key, optional_address);
  const has_data = env.has_data(key, optional_address);

  env.generate_event(
    env.stringToUint8Array("has_data = " + has_data.toString())
  );

  env.set_data(key, data, null);
  env.get_data(key, null);
  env.append_data(key, data, null);
  env.delete_data(key, null);
  const has_data_null = env.has_data(key, null);

  env.generate_event(
    env.stringToUint8Array("has_data = " + has_data_null.toString())
  );

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
