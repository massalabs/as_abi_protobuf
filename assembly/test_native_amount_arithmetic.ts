import { NativeAmount } from "massa-proto-as/assembly";
import * as env from "./env";
import { UInt64Value } from "massa-proto-as/assembly/google/protobuf/UInt64Value";

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

  const amount1 = env.make_native_amount(100, 0);
  const amount2 = env.make_native_amount(100, 0);

  env.generate_event("test check_native_amount");
  const is_valid = env.check_native_amount(amount1);
  env.generate_event("amount1 is valid: " + is_valid.toString());

  env.generate_event("test native_amount_to_string");
  const amount1_str = env.native_amount_to_string(amount1);
  const amount2_str = env.native_amount_to_string(amount2);
  const amount3_str = "50";

  env.generate_event("test native_amount_from_string");
  const amount3 = env.native_amount_from_string(amount3_str);

  env.generate_event("amount1 as string: " + amount1_str);
  env.generate_event("amount2 as string: " + amount2_str);

  // 200
  env.generate_event("test add_native_amounts");
  const amount4 = env.add_native_amounts(amount1, amount2);
  const amount4_str = env.native_amount_to_string(amount4);
  env.generate_event("amount4 (amount1 + amount2) as string: " + amount4_str);

  // 50
  env.generate_event("test sub_native_amounts");
  const amount5 = env.sub_native_amounts(amount1, amount3);
  const amount5_str = env.native_amount_to_string(amount5);
  env.generate_event("amount5 (amount1 - amount3) as string: " + amount5_str);

  // 200
  env.generate_event("test mul_native_amount");
  const amount6 = env.mul_native_amount(amount1, 2);
  const amount6_str = env.native_amount_to_string(amount6);
  env.generate_event("amount6 (amount1 * 2) as string: " + amount6_str);

  const amount7 = env.make_native_amount(152, 0);
  // [3, 2]
  env.generate_event("test div_rem_native_amount");
  const amount8 = env.div_rem_native_amount(amount7, 50);
  const amount8_quotient_str = env.native_amount_to_string(amount8[0]);
  const amount8_remainder_str = env.native_amount_to_string(amount8[1]);
  env.generate_event(
    "amount8 / 50 = 152/50 = [3,2] : [" +
      amount8_quotient_str +
      "," +
      amount8_remainder_str +
      "]"
  );

  // [3, 2]
  env.generate_event("test div_rem_native_amounts");
  const amount9 = env.div_rem_native_amounts(amount7, amount3);
  const amount9_quotient_str = amount9.quotient.toString();
  const amount9_remainder_str = env.native_amount_to_string(amount9.remainder);
  env.generate_event(
    "amount9 / 50 = 152/50 = [3,2] : [" +
      amount9_quotient_str +
      "," +
      amount9_remainder_str +
      "]"
  );

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
