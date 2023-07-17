import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

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

  return encode_result(new Uint8Array(0));
}
