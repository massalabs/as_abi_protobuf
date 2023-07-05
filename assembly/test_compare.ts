import * as env from "./env";

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
  shared_mem = new ArrayBuffer(size);
  return shared_mem;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
  assert(changetype<usize>(shared_mem) == changetype<usize>(_args));

  env.generate_event(
    "compare_address: " + env.compare_address("addr1", "addr1").toString()
  );
  env.generate_event(
    "compare_address: " + env.compare_address("addr1", "addr2").toString()
  );
  env.generate_event(
    "compare_address: " + env.compare_address("addr3", "addr2").toString()
  );

  env.generate_event(
    "compare_address: " +
      env
        .compare_native_amount(
          env.native_amount_from_string("1"),
          env.native_amount_from_string("2")
        )
        .toString()
  );

  env.generate_event(
    "compare_native_time: " +
      env
        .compare_native_time(env.get_native_time(), env.get_native_time())
        .toString()
  );

  env.generate_event(
    "compare_pub_key: " + env.compare_pub_key("pub_key1", "pub_key1").toString()
  );
  env.generate_event(
    "compare_pub_key: " + env.compare_pub_key("pub_key1", "pub_key2").toString()
  );
  env.generate_event(
    "compare_pub_key: " + env.compare_pub_key("pub_key3", "pub_key2").toString()
  );

  env.generate_event(
    "compare_sig: " + env.compare_sig("sig1", "sig1").toString()
  );
  env.generate_event(
    "compare_sig: " + env.compare_sig("sig1", "sig2").toString()
  );
  env.generate_event(
    "compare_sig: " + env.compare_sig("sig3", "sig2").toString()
  );

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
