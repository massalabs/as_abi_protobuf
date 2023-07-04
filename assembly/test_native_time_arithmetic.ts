//import { NativeTime } from "massa-proto-as/assembly";
import { NativeTime } from "massa-proto-as/assembly/massa/model/v1/NativeTime";
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

  const time1 = new NativeTime(100);
  const time2 = new NativeTime(100);
  const time3 = new NativeTime(50);

  // 200
  env.generate_event("test checked_add_native_time");
  const time4 = env.checked_add_native_time(time1, time2);
  const time4_str = time4.milliseconds.toString();
  env.generate_event("time4 (time1 + time2) as string: " + time4_str);

  // 50
  env.generate_event("test checked_sub_native_time");
  const time5 = env.checked_sub_native_time(time1, time3);
  const time5_str = time5.milliseconds.toString();
  env.generate_event("time5 (time1 - time3) as string: " + time5_str);

  // 200
  env.generate_event("test checked_mul_native_time");
  const time6 = env.checked_mul_native_time(time1, 2);
  const time6_str = time6.milliseconds.toString();
  env.generate_event("time6 (time1 * 2) as string: " + time6_str);

  const time7 = new NativeTime(152);
  // [3, 2]
  env.generate_event("test checked_scalar_div_native_time");
  const time8 = env.checked_scalar_div_native_time(time7, 50);
  assert(time8.length == 2, "Cannot compute scalar div");
  const time8_quotient_str = time8[0].milliseconds.toString();
  const time8_remainder_str = time8[1].milliseconds.toString();
  env.generate_event(
    "time7 / 50 = 152/50 = [3,2] : [" +
      time8_quotient_str +
      "," +
      time8_remainder_str +
      "]"
  );

  // [3, 2]
  env.generate_event("test checked_div_native_time");
  const time9 = env.checked_div_native_time(time7, time3);
  const time9_quotient_str = time9.quotient.toString();
  const time9_remainder_str = time9.remainder.milliseconds.toString();
  env.generate_event(
    "time7 / time3 = 152/50 = [3,2] : [" +
      time9_quotient_str +
      "," +
      time9_remainder_str +
      "]"
  );

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
