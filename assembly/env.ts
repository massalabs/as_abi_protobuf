import { Protobuf } from 'as-proto/assembly';
import { AbortRequest } from './abi/AbortRequest'; // generated file
import { CallRequest } from './abi/CallRequest';
import { Address } from './abi/Address';
import { Amount } from './abi/Amount';
import { CallResponse } from './abi/CallResponse';
import { CreateSCRequest } from './abi/CreateSCRequest';
import { CreateSCResponse } from './abi/CreateSCResponse';
import { TestRequest } from './abi/TestRequest';
import { TestResponse } from './abi/TestResponse';
import { LogRequest } from './abi/LogRequest';

@external("massa", "abi_call")
declare function abi_call(arg: ArrayBuffer): ArrayBuffer;

@external("massa", "abi_create_sc")
declare function abi_create_sc(arg: ArrayBuffer): ArrayBuffer;

@external("massa", "abi_abort")
declare function abi_abort(arg: ArrayBuffer): ArrayBuffer;

@external("massa", "abi_log")
declare function abi_log(arg: ArrayBuffer): ArrayBuffer;

@external("massa", "abi_test")
declare function abi_test(arg: ArrayBuffer): ArrayBuffer;

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

// TODO use --use abort=assembly/env/myabort  in asc to override AS's default myabort
export function myabort(
    message: string | null,
    fileName: string | null,
    lineNumber: u32,
    columnNumber: u32,
): void {
    const text_message = `Aborted with message '${message ? message : "null"}' (in '${fileName ? fileName : "null"}', line ${lineNumber}, column ${columnNumber})`;
    const req = new AbortRequest(text_message);
    // const req_bytes = Protobuf.encode(req, AbortRequest.encode);
    // abi_abort(encode_length_prefixed(req_bytes));
}

// ABI to call another SC
export function call(address: string, func_name: string, arg: Uint8Array, coins: u64): Uint8Array {
    const req = new CallRequest(new Address(address), func_name, arg, new Amount(coins));
    const req_bytes = Protobuf.encode(req, CallRequest.encode);
    const resp_bytes = Uint8Array.wrap(abi_call(encode_length_prefixed(req_bytes).buffer));
    const resp = Protobuf.decode<CallResponse>(resp_bytes, CallResponse.decode);
    return resp.returnData;
}

// ABI to create a new SC
export function create_sc(bytecode: Uint8Array): string {
    const req = new CreateSCRequest(bytecode);
    const req_bytes: Uint8Array = Protobuf.encode(req, CreateSCRequest.encode);
    const resp_bytes = Uint8Array.wrap(abi_create_sc(encode_length_prefixed(req_bytes).buffer));
    const resp = Protobuf.decode<CreateSCResponse>(resp_bytes, CreateSCResponse.decode);
    if (resp.address === null) {
        // FIXME add fake args to please asc
        abort("Failed to create smart contract.", "", 0, 0);
    }

    // needed to please asc...
    const addr: Address = resp.address!;
    return addr.address;

}

// TODO export
export function myalloc(size: i32): Uint8Array {
    return new Uint8Array(size);
}

export function log(message: string): void {
    const req = new LogRequest(message);
    const req_bytes = encode_length_prefixed(Protobuf.encode(req, LogRequest.encode));
    abi_log(req_bytes.buffer);
}

export function test(message_in: Uint8Array): Uint8Array {
    const req = new TestRequest(message_in);
    const req_bytes = encode_length_prefixed(Protobuf.encode(req, TestRequest.encode));
    const resp_bytes = Uint8Array.wrap(abi_test(req_bytes.buffer));
    const resp = Protobuf.decode<TestResponse>(resp_bytes, TestResponse.decode);
    return resp.messageOut;
}