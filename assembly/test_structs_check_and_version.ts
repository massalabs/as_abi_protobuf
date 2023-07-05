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

  const address = "address_abcd";
  const pubkey = "pubkey_abcd";
  const signature = "signature_abcd";

  env.generate_event("test check_address");
  const res_check_address = env.check_address(address);
  env.generate_event("result: " + res_check_address.toString());

  env.generate_event("test check_pubkey");
  const res_check_pubkey = env.check_pubkey(pubkey);
  env.generate_event("result: " + res_check_pubkey.toString());

  env.generate_event("test check_signature");
  const res_check_signature = env.check_signature(signature);
  env.generate_event("result: " + res_check_signature.toString());
  
  env.generate_event("test get_address_category");
  const res_get_address_category = env.get_address_category(address);
  env.generate_event("result: " + res_get_address_category.toString());

  env.generate_event("test get_address_version");
  const res_get_address_version = env.get_address_version(address);
  env.generate_event("result: " + res_get_address_version.toString());
  
  env.generate_event("test get_pubkey_version");
  const res_get_pubkey_version = env.get_pubkey_version(pubkey);
  env.generate_event("result: " + res_get_pubkey_version.toString());
  
  env.generate_event("test get_signature_version");
  const res_get_signature_version = env.get_signature_version(signature);
  env.generate_event("result: " + res_get_signature_version.toString());

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
