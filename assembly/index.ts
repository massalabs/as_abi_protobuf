import * as env from "./env";

// FIXME use a transformer >>> beg

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
    // /!\ Can't trace here
    // env.log("allocating " + size.toString() + "bytes");

    shared_mem = new ArrayBuffer(size);
    return shared_mem;
}

export function echo(arg: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(arg));
    let warg = Uint8Array.wrap(arg);

    env.log("echo input: " + warg.toString());

    shared_mem = env.encode_length_prefixed(warg).buffer;
    return shared_mem;
}

export function call_loop_echo(arg: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(arg));

    // This is fine, this loop ensures that we don't have mem leak
    for (let i = 0; i < 100; i++) {
        const warg = Uint8Array.wrap(arg);

        let msg = new Uint8Array(warg.length + 1);
        msg[0] = i;
        for (let j = 0; j < warg.length; j++) {
            msg[j + 1] = warg[j];
        }

        env.log("calling host test method with input: " + msg.toString());
        const test_res = env.echo(msg);
        // env.log("res len: " + test_res.length.toString());
    }

    const arr = [1, 2, 3, 4];
    const res = new Uint8Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        res[i] = arr[i];
    }


    // TODO move in its own test
    // transfer a somewhat big array
    // let res = new Uint8Array(30000);
    // res.fill(44);

    env.log("calling host test method with input: " + res.toString());


    // /!\ do not call any abi here (for exemple log) it will
    // allocate memory and overwrite the buffer
    shared_mem = env.encode_length_prefixed(res).buffer;
    return shared_mem;
}

export function initialize(arg: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(arg));
    env.log("initialize");


    let res = new Uint8Array(1);
    res[0] = 1;
    shared_mem = env.encode_length_prefixed(res).buffer;
    return shared_mem;
}

export function main(_args: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(_args));

    env.log("empty main");

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}

export function call_abort(_args: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(_args));

    env.log("will call abort()");

    // will cause a call to abort()
    assert(false, "abort test message");

    return new ArrayBuffer(0); // fake return to pleas asc
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
