import * as env from "./env";



// FIXME use a transformer >>> beg

// using a global to prevent problem with GC
let shared_mem: Uint8Array = new Uint8Array(0);

export function __alloc(size: i32): usize {
    shared_mem = new Uint8Array(size);

    // for (let i = 0; i < 10 && i < size; i++) {
    //     shared_mem[i] = i;
    // }
    return changetype<usize>(shared_mem);
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


// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
    return a + b;
}

export function call_test(fake: i32): i32 {
    // const array = new Uint8Array(1);
    // const coins: u64 = 10;
    // const ret = env.call("address", "add", array, coins);

    const array = new Uint8Array(20);
    for (let i = 0; i < array.length; i++) {
        array[i] = i;
    }


    const ret = env.test(array);

    return 0;
}