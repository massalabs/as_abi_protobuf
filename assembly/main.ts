import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";

declare function fileToByteArray(filePath: string): StaticArray<u8>;

function createContract(): string {
  env.generate_event("create contract");

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
  env.generate_event("SC len: " + wrapped_bytes.length.toString());

  env.generate_event("calling create_sc");
  const sc_address = env.create_sc(wrapped_bytes);
  env.generate_event("SC created @:" + sc_address);

  env.generate_event("Will transfer coins: 100_000_000_000");
  env.transfer_coins(sc_address, env.make_native_amount(100, 0), null);
  env.generate_event("Coins transfered");

  return sc_address;
}

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);
  env.generate_event("main");

  const sc_address = createContract();
  env.generate_event("sc created @:" + sc_address);

  const sc_args = new Uint8Array(0);
  env.call(sc_address, "initialize", sc_args, env.make_native_amount(100, 0));
  env.generate_event("method initialize called on sc @:" + sc_address);

  return encode_result(new Uint8Array(0));
}
