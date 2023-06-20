import { AddressCategory, NativeAddress, NativeAmount } from "massa-proto-as/assembly";
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

    // For test purposes, we create a fake address (won't work on the blockchain)
    const buf = new Uint8Array(4);
    buf[0] = 0x31; buf[1] = 0x32; buf[2] = 0x33; buf[3] = 0x34;
    const address = new NativeAddress(AddressCategory.ADDRESS_CATEGORY_USER_ADDRESS, 0, buf);
    const amount = new NativeAmount(100, 0);

    // Call the abi
    env.transfer_coins(address, amount);

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
