import { NativeAddress } from "massa-proto-as/assembly/massa/model/v1/NativeAddress";
import * as env from "./env";
import { AddressCategory } from "massa-proto-as/assembly/massa/model/v1/AddressCategory";

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

    const key = new Uint8Array(1);
    const data = new Uint8Array(1);
    key[0] = 21;
    data[0] = 99;

    env.generate_event("key = " + key.toString() + ", data = " + data.toString());

    const sender_buf = new Uint8Array(4);
    sender_buf[0] = 0x31; sender_buf[1] = 0x32; sender_buf[2] = 0x33; sender_buf[3] = 0x34;
    const sender_address = new NativeAddress(AddressCategory.ADDRESS_CATEGORY_USER_ADDRESS, 0, sender_buf);

    env.set_data(sender_address, key, data);
    env.get_data(sender_address, key);
    env.append_data(sender_address, key, data);
    env.delete_data(sender_address, key);
    const has_data = env.has_data(sender_address, key);

    env.generate_event("has_data = " + has_data.toString());
    
    env.set_data(null, key, data);
    env.get_data(null, key);
    env.append_data(null, key, data);
    env.delete_data(null, key);
    const has_data_null = env.has_data(null, key);

    env.generate_event("has_data = " + has_data.toString());

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
