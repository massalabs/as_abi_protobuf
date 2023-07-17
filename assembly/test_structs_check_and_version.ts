import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

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

  return encode_result(new Uint8Array(0));
}
