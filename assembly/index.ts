import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

// FIXME use a transformer >>> beg

export function initialize(arg: ArrayBuffer): ArrayBuffer {
  assert_args_addr(arg);

  let res = new Uint8Array(1);
  res[0] = Uint8Array.wrap(arg).length;
  env.generate_event("initialize will return: " + res[0].toString());

  return encode_result(res);
}

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  env.generate_event("hello world");

  return encode_result(new Uint8Array(0));
}

// Only one buffer for exchange between guest and host implies that
// any exported functions that take a buffer as argument must copy it
// because any call to an abi function will overwrite the buffer.

// export function myfunc(data: Uint8Array) -> Uint8Array {
//     ///...
//  }

// =>

//  export function myfunc(data: Uint8Array) -> Uint8Array {
//     const data_copy = data.copy();
//     const result = myfunc_orig(data_copy);
//     return encode_length_prefixed(result);
//  }

// it should be enough to take a new ref, the GC should not act and new alloc prevent modification from the memory
// export function myfunc(data: Uint8Array) -> Uint8Array {
//     const new_data = shared_mem;
//     const result = myfunc_orig(new_data);
//     return encode_length_prefixed(result);
//  }

// export function myfunc(data: Uint8Array) -> Uint8Array {
//     const new_data = shared_mem;
//     const result = myfunc_orig(new_data);
//     shared_mem = encode_length_prefixed(result);
//     return shared_mem;
//  }
//  (pour éviter que l'array que la fonction retourne ne soit droppé

// FIXME use a transformer  <<< end
