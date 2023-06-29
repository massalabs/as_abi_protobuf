import * as env from "./env";

declare function fileToByteArray(filePath: string): StaticArray<u8>;

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
  // /!\ Can't trace here
  // // env.generate_str_event("allocating " + size.toString() + "bytes");

  shared_mem = new ArrayBuffer(size);
  return shared_mem;
}

function createContract(): string {
  env.generate_str_event("create contract");

  const bytes: StaticArray<u8> = fileToByteArray("./build/release.wasm_add");
  // const bytes: StaticArray<u8> = fileToByteArray("/home/jfmorcillo/deploy_generate_event.wasm");

  // Temporary code: adjust type

  // this fails at runtime
  // const wrapped_bytes = new Uint8Array(bytes.length);
  // for (let i = 0; i < bytes.length; i++) {
  //     wrapped_bytes[i] = bytes[i];
  // }

  // but seems to work...
  const casted_bytes = changetype<ArrayBuffer>(bytes);
  const wrapped_bytes = Uint8Array.wrap(casted_bytes);
  env.generate_str_event("SC len: " + wrapped_bytes.length.toString());

  env.generate_str_event("calling create_sc");
  const sc_address = env.create_sc(wrapped_bytes);
  env.generate_str_event("SC created @:" + sc_address);

  env.generate_str_event("Will transfer coins: 100_000_000_000");
  env.transfer_coins(sc_address, env.make_native_amount(100, 0), null);
  env.generate_str_event("Coins transfered");

  return sc_address;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
  assert(changetype<usize>(shared_mem) == changetype<usize>(_args));
  env.generate_str_event("main");

  const sc_address = createContract();
  env.generate_str_event("sc created @:" + sc_address);

  const args = new Uint8Array(0);
  env.call(sc_address, "initialize", args, env.make_native_amount(100, 0));
  env.generate_str_event("method initialize called on sc @:" + sc_address);

  shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
  return shared_mem;
}
