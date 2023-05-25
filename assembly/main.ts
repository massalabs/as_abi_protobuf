import * as env from "./env";

declare function fileToByteArray(filePath: string): StaticArray<u8>;


// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
    // /!\ Can't trace here
    // // env.log("allocating " + size.toString() + "bytes");

    shared_mem = new ArrayBuffer(size);
    return shared_mem;
}

function createContract(): string {
    // env.log("create contract");

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
    // env.log("SC len: " + wrapped_bytes.length.toString());


    // env.log("calling create_sc");
    const sc_address = env.create_sc(wrapped_bytes);
    // env.log("SC created @:" + sc_address);

    // env.log("Will transfer coins: 100_000_000_000");
    env.transfer_coins(sc_address, 100);
    // env.log("Coins transfered");


    return sc_address;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(_args));
    // env.log("main");

    const sc_address = createContract();
    // env.log("-------");

    const args = new Uint8Array(0);
    env.call(sc_address, "initialize", args, 0);
    env.generate_event("Created a Protobuffed smart-contract at:" + sc_address);

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
