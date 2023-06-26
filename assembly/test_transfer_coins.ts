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

    // For test purposes, we create two fake addresses (won't work on the blockchain)
    const sender_buf = new Uint8Array(4);
    sender_buf[0] = 0x31; sender_buf[1] = 0x32; sender_buf[2] = 0x33; sender_buf[3] = 0x34;
    const sender_address = new NativeAddress(AddressCategory.ADDRESS_CATEGORY_USER_ADDRESS, 0, sender_buf);
    
    const to_buf = new Uint8Array(4);
    to_buf[0] = 0x35; to_buf[1] = 0x36; to_buf[2] = 0x37; to_buf[3] = 0x38;
    const to_address = new NativeAddress(AddressCategory.ADDRESS_CATEGORY_USER_ADDRESS, 0, to_buf);

    const amount = new NativeAmount(100, 0);

    // Call the abi
    env.transfer_coins(sender_address, to_address, amount);

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
