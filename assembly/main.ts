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

  env.generate_event("Will transfer coins: 10");
  env.transfer_coins(sc_address, env.make_native_amount(10, 0), null);
  env.generate_event("Coins transfered");

  return sc_address;
}

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);
  env.generate_event("main");

  const sc_address = createContract();
  env.generate_event("sc created @:" + sc_address);

  const f_exists = env.functionExists(sc_address, "initialize");
  env.generate_event("function initialize exists: " + f_exists.toString());

  const ret_call = env.call(
    sc_address,
    "initialize",
    new Uint8Array(0),
    env.make_native_amount(10, 0)
  );

  env.generate_event(
    "method initialize called on sc @:" +
      sc_address +
      " with result: " +
      ret_call[0].toString()
  );

  const ret_local_call = env.localCall(
    sc_address,
    "initialize",
    new Uint8Array(10)
  );

  env.generate_event(
    "method initialize called locally on sc @:" +
      sc_address +
      " with result: " +
      ret_local_call[0].toString()
  );

  const bytes: StaticArray<u8> = fileToByteArray("./build/release.wasm_add");
  const casted_bytes = changetype<ArrayBuffer>(bytes);
  const wrapped_bytes = Uint8Array.wrap(casted_bytes);
  env.local_execution(wrapped_bytes, "initialize", new Uint8Array(10))

  env.generate_event("method initialize called on localExecution");

  return encode_result(new Uint8Array(0));
}
