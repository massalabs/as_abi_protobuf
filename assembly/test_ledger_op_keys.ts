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

    const optional_address = "abcd";
    const bytecode = new Uint8Array(1);
    bytecode[0] = 21;
    const prefix = new Uint8Array(1);
    prefix[0] = 21;
    const key = new Uint8Array(1);
    key[0] = 21;

    env.generate_event(
        env.stringToUint8Array("bytecode = " + bytecode.toString() + ", prefix = " + prefix.toString() + ", key = " + key.toString())
      );

    env.get_balance(optional_address);
    env.get_bytecode(optional_address);
    env.set_bytecode(bytecode, optional_address);
    env.get_keys(prefix, optional_address);

    env.get_balance(null);
    env.get_bytecode(null);
    env.set_bytecode(bytecode, null);
    env.get_keys(prefix, null);

    env.get_op_keys(prefix);
    env.has_op_key(key);
    env.get_op_data(key);

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}
