
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

    // Call the abi
    const bytes = new Uint8Array(32);

    const buf = new Uint8Array(4);
    buf[0] = 0x31; buf[1] = 0x32; buf[2] = 0x33; buf[3] = 0x34;

    const native_hash = env.native_hash(buf);

    //env.generate_event("Hash: " + native_hash.toString());

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
