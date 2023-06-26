import { decodeAbiResponse, encodeGenerateEventRequest, encodeTransferCoinsRequest } from 'massa-proto-as/assembly';

import { NativeAddress } from 'massa-proto-as/assembly';
import { NativeAmount } from 'massa-proto-as/assembly'
// import { CallResponse } from 'massa-proto-as/assembly'
//import { CreateSCRequest } from 'massa-proto-as/assembly'
//import { CreateSCResponse } from 'massa-proto-as/assembly'
import { TransferCoinsRequest } from 'massa-proto-as/assembly'
import { GenerateEventRequest } from 'massa-proto-as/assembly'
import { decimalCount32 } from 'util/number'

import { SetDataRequest, encodeSetDataRequest } from 'massa-proto-as/assembly';
import { GetDataRequest, encodeGetDataRequest } from 'massa-proto-as/assembly';
import { DeleteDataRequest, encodeDeleteDataRequest } from 'massa-proto-as/assembly';
import { AppendDataRequest, encodeAppendDataRequest } from 'massa-proto-as/assembly';
import { HasDataRequest, encodeHasDataRequest } from 'massa-proto-as/assembly';

import { GetCurrentPeriodRequest, encodeGetCurrentPeriodRequest } from 'massa-proto-as/assembly';
import { GetCurrentThreadRequest, encodeGetCurrentThreadRequest } from 'massa-proto-as/assembly';

import { NativeHash, encodeNativeHashRequest } from 'massa-proto-as/assembly';
import { HashSha256Request, encodeHashSha256Request } from 'massa-proto-as/assembly';
import { Keccak256Request, encodeKeccak256Request } from 'massa-proto-as/assembly';

// @ts-ignore: decorator
@external("massa", "abi_set_data")
declare function abi_set_data(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_data")
declare function abi_get_data(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_delete_data")
declare function abi_delete_data(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_append_data")
declare function abi_append_data(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_has_data")
declare function abi_has_data(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_call")
declare function abi_call(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_create_sc")
declare function abi_create_sc(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_transfer_coins")
declare function abi_transfer_coins(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_generate_event")
declare function abi_generate_event(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_abort")
declare function abi_abort(arg: i32): i32;

// @ts-ignore: decorator
@external("massa", "abi_get_current_period")
declare function abi_get_current_period(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_current_thread")
declare function abi_get_current_thread(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_hash_sha256")
declare function abi_hash_sha256(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_hash_keccak256")
declare function abi_hash_keccak256(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_native_hash")
declare function abi_native_hash(arg: ArrayBuffer): ArrayBuffer;

/// performs a keccak256 hash on byte array and returns the hash as byte array
export function hash_keccak256(data: Uint8Array): Uint8Array {
    const req = new Keccak256Request(data);
    const req_bytes = encodeKeccak256Request(req);
    const resp_bytes = Uint8Array.wrap(abi_hash_keccak256(encode_length_prefixed(req_bytes).buffer));
    const abi_resp = decodeAbiResponse(resp_bytes);
    assert(abi_resp.error === null);
    assert(abi_resp.res !== null);
    assert(abi_resp.res!.keccak256Result !== null);
    assert(abi_resp.res!.keccak256Result!.hash !== null);
    return abi_resp.res!.keccak256Result!.hash

}

/// performs a sha256 hash on byte array and returns the hash as byte array
export function hash_sha256(data: Uint8Array): Uint8Array {
    const req = new HashSha256Request(data);
    const req_bytes = encodeHashSha256Request(req);
    const resp_bytes = Uint8Array.wrap(abi_hash_sha256(encode_length_prefixed(req_bytes).buffer));
    const abi_resp = decodeAbiResponse(resp_bytes);
    assert(abi_resp.error === null);
    assert(abi_resp.res !== null);
    assert(abi_resp.res!.hashSha256Result !== null);
    assert(abi_resp.res!.hashSha256Result!.hash !== null);
    return abi_resp.res!.hashSha256Result!.hash
}

/// performs a hash on byte array and returns the NativeHash
export function native_hash(data: Uint8Array): NativeHash {
    const req = new NativeHashRequest(data);
    const req_bytes = encodeNativeHashRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_native_hash(encode_length_prefixed(req_bytes).buffer));
    const abi_resp = decodeAbiResponse(resp_bytes);
    assert(abi_resp.error === null);
    assert(abi_resp.res !== null);
    assert(abi_resp.res!.nativeHashResult !== null);
    assert(abi_resp.res!.nativeHashResult!.hash !== null);
    return assert(abi_resp.res!.nativeHashResult!.hash, "NativeHash computation failed");
}

/// gets the period of the current execution slot
export function get_current_period(): i64 {
    const req = new GetCurrentPeriodRequest();
    const req_bytes = encodeGetCurrentPeriodRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_current_period(encode_length_prefixed(req_bytes).buffer));
    const resp = decodeAbiResponse(resp_bytes);
    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getCurrentPeriodResult !== null);
    return resp.res!.getCurrentPeriodResult!.period;
}

/// gets the thread of the current execution slot
export function get_current_thread(): i32 {
    const req = new GetCurrentThreadRequest();
    const req_bytes = encodeGetCurrentThreadRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_current_thread(encode_length_prefixed(req_bytes).buffer));
    const resp = decodeAbiResponse(resp_bytes);
    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getCurrentThreadResult !== null);
    return resp.res!.getCurrentThreadResult!.thread;
}

/// Creates a Uint8Array from an existing Uint8Array by prepending a little-endian i32 length prefix.
export function encode_length_prefixed(data: Uint8Array): Uint8Array {
    const len: i32 = data.length;
    const result = new Uint8Array(4 + len);
    result[0] = len & 0xff;
    result[1] = (len >> 8) & 0xff;
    result[2] = (len >> 16) & 0xff;
    result[3] = (len >> 24) & 0xff;
    result.set(data, 4);
    return result;
}

// abort() implementation adapted from https://github.com/AssemblyScript/wasi-shim.git
export function myabort(
    message: string | null,
    fileName: string | null,
    lineNumber: i32,
    columnNumber: i32,
): void {
    // 0: len
    // 4: buf...
    const lenPtr: usize = 0
    const bufPtr: usize = lenPtr + sizeof<usize>();
    var ptr = bufPtr;

    store<u64>(ptr, 0x203A74726F6261);
    ptr += 7; // 'abort: '

    if (message != null) {
        ptr += String.UTF8.encodeUnsafe(changetype<usize>(message), message.length, ptr);
    }
    store<u32>(ptr, 0x206E6920); ptr += 4; // ' in '
    if (fileName != null) {
        ptr += String.UTF8.encodeUnsafe(changetype<usize>(fileName), fileName.length, ptr);
    }

    store<u8>(ptr++, 0x28); // (

    var len = decimalCount32(lineNumber);
    ptr += len;
    do {
        let t = lineNumber / 10;
        store<u8>(--ptr, 0x30 + lineNumber % 10);
        lineNumber = t;
    } while (lineNumber); ptr += len;

    store<u8>(ptr++, 0x3A); // :

    len = decimalCount32(columnNumber);
    ptr += len;
    do {
        let t = columnNumber / 10;
        store<u8>(--ptr, 0x30 + columnNumber % 10);
        columnNumber = t;
    } while (columnNumber); ptr += len;

    store<u8>(ptr, 0x29); ptr++; // )

    const msgLen = ptr - bufPtr;
    store<u8>(lenPtr, msgLen & 0xff)
    store<u8>(lenPtr + 1, (msgLen >> 8) & 0xff);
    store<u8>(lenPtr + 2, (msgLen >> 16) & 0xff);
    store<u8>(lenPtr + 3, (msgLen >> 24) & 0xff);

    abi_abort(changetype<i32>(lenPtr));

    unreachable();
}
// end of abort() implementation

// ABI to call another SC
// export function call(address: string, func_name: string, arg: Uint8Array, coins: u64): Uint8Array {
//     const req = new CallRequest(new Address(address), func_name, arg, new Amount(coins));
//     const req_bytes = Protobuf.encode(req, CallRequest.encode);
//     const resp_bytes = Uint8Array.wrap(abi_call(encode_length_prefixed(req_bytes).buffer));
//     const resp = Protobuf.decode<CallResponse>(resp_bytes, CallResponse.decode);
//     return resp.returnData;
// }

// ABI to create a new SC
// export function create_sc(bytecode: Uint8Array): string {
//     const req = new CreateSCRequest(bytecode);
//     const req_bytes: Uint8Array = Protobuf.encode(req, CreateSCRequest.encode);
//     const resp_bytes = Uint8Array.wrap(abi_create_sc(encode_length_prefixed(req_bytes).buffer));
//     const resp = Protobuf.decode<CreateSCResponse>(resp_bytes, CreateSCResponse.decode);
//     if (resp.address === null) {
//         // FIXME add fake args to please asc
//         abort("Failed to create smart contract.", "", 0, 0);
//     }

//     // needed to please asc...
//     const addr: Address = resp.address!;
//     return addr.address;

// }

// ABI to transfer coins to another address
export function transfer_coins(to_address: NativeAddress, coins: NativeAmount): void {
    const req = new TransferCoinsRequest(to_address, coins);
    const req_bytes = encodeTransferCoinsRequest(req);
    abi_transfer_coins(encode_length_prefixed(req_bytes).buffer);
}

// ABI to generate an event
export function generate_event(event: string): void {
    const req = new GenerateEventRequest(event);
    const req_bytes = encodeGenerateEventRequest(req);
    abi_generate_event(encode_length_prefixed(req_bytes).buffer);
}

export function set_data(key: Uint8Array, data: Uint8Array): void {
    const req = new SetDataRequest(key, data);
    const req_bytes = encodeSetDataRequest(req);
    abi_set_data(encode_length_prefixed(req_bytes).buffer);
}

export function get_data(key: Uint8Array): Uint8Array {
    const req = new GetDataRequest(key);
    const req_bytes = encodeGetDataRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_data(encode_length_prefixed(req_bytes).buffer));

    const resp = decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getDataResult !== null)

    return resp.res!.getDataResult!.value;
}

export function delete_data(key: Uint8Array): void {
    const req = new DeleteDataRequest(key);
    const req_bytes = encodeDeleteDataRequest(req);
    abi_delete_data(encode_length_prefixed(req_bytes).buffer);
}

export function append_data(key: Uint8Array, data: Uint8Array): void {
    const req = new AppendDataRequest(key, data);
    const req_bytes = encodeAppendDataRequest(req);
    abi_append_data(encode_length_prefixed(req_bytes).buffer);
}

export function has_data(key: Uint8Array): bool {
    const req = new HasDataRequest(key);
    const req_bytes = encodeHasDataRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_has_data(encode_length_prefixed(req_bytes).buffer));

    const resp = decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.hasDataResult !== null);

    return resp.res!.hasDataResult!.hasData;
}
