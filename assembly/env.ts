import * as proto from "massa-proto-as/assembly";
import { StringValue } from "massa-proto-as/assembly/google/protobuf/StringValue";
import { decimalCount32 } from "util/number";

// ***************************************************************************
// abi declarations
// ***************************************************************************
// /*
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
@external("massa", "abi_get_balance")
declare function abi_get_balance(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_bytecode")
declare function abi_get_bytecode(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_set_bytecode")
declare function abi_set_bytecode(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_keys")
declare function abi_get_keys(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_op_keys")
declare function abi_get_op_keys(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_has_op_key")
declare function abi_has_op_key(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_op_data")
declare function abi_get_op_data(arg: ArrayBuffer): ArrayBuffer;

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
@external("massa", "abi_get_current_slot")
declare function abi_get_current_slot(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_hash_sha256")
declare function abi_hash_sha256(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_hash_keccak256")
declare function abi_hash_keccak256(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_blake3_hash")
declare function abi_blake3_hash(arg: ArrayBuffer): ArrayBuffer;
// */
// ***************************************************************************
// utility functions
// ***************************************************************************

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
  columnNumber: i32
): void {
  // 0: len
  // 4: buf...
  const lenPtr: usize = 0;
  const bufPtr: usize = lenPtr + sizeof<usize>();
  var ptr = bufPtr;

  store<u64>(ptr, 0x203a74726f6261);
  ptr += 7; // 'abort: '

  if (message != null) {
    ptr += String.UTF8.encodeUnsafe(
      changetype<usize>(message),
      message.length,
      ptr
    );
  }
  store<u32>(ptr, 0x206e6920);
  ptr += 4; // ' in '
  if (fileName != null) {
    ptr += String.UTF8.encodeUnsafe(
      changetype<usize>(fileName),
      fileName.length,
      ptr
    );
  }

  store<u8>(ptr++, 0x28); // (

  var len = decimalCount32(lineNumber);
  ptr += len;
  do {
    let t = lineNumber / 10;
    store<u8>(--ptr, 0x30 + (lineNumber % 10));
    lineNumber = t;
  } while (lineNumber);
  ptr += len;

  store<u8>(ptr++, 0x3a); // :

  len = decimalCount32(columnNumber);
  ptr += len;
  do {
    let t = columnNumber / 10;
    store<u8>(--ptr, 0x30 + (columnNumber % 10));
    columnNumber = t;
  } while (columnNumber);
  ptr += len;

  store<u8>(ptr, 0x29);
  ptr++; // )

  const msgLen = ptr - bufPtr;
  store<u8>(lenPtr, msgLen & 0xff);
  store<u8>(lenPtr + 1, (msgLen >> 8) & 0xff);
  store<u8>(lenPtr + 2, (msgLen >> 16) & 0xff);
  store<u8>(lenPtr + 3, (msgLen >> 24) & 0xff);

  abi_abort(changetype<i32>(lenPtr));

  unreachable();
}
// end of abort() implementation

export function stringToUint8Array(str: string): Uint8Array {
  return Uint8Array.wrap(String.UTF8.encode(str));
}

function makeStringValue(
  optional_sender_address: string | null
): StringValue | null {
  let sender_address: StringValue | null = null;

  if (optional_sender_address !== null) {
    sender_address = new StringValue(optional_sender_address);
  }

  return sender_address;
}

// ***************************************************************************
// abi wrapper implementations
// ***************************************************************************

// ABI to call another SC
export function call(
  address: string,
  func_name: string,
  arg: Uint8Array,
  coins: proto.NativeAmount
): Uint8Array {
  const req = new proto.CallRequest(address, func_name, arg, coins);
  const req_bytes = proto.encodeCallRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_call(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeCallResponse(resp_bytes);
  return resp.data;
}

// ABI to create a new SC
export function create_sc(bytecode: Uint8Array): string {
  const req = new proto.CreateScRequest(bytecode);
  const req_bytes = proto.encodeCreateScRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_create_sc(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);

  // const resp = Protobuf.decode<CreateScResponse>(resp_bytes, CreateSCResponse.decode);
  if (resp.address === null) {
    // FIXME add fake args to please asc
    abort("Failed to create smart contract.", "", 0, 0);
  }

  const addr: string = resp.address!;
  return addr.address;
}

// ABI to transfer coins to another address
export function transfer_coins(
  to_address: string,
  coins: proto.NativeAmount,
  optional_sender_address: string | null
): void {
  const req = new proto.TransferCoinsRequest(
    to_address,
    coins,
    makeStringValue(optional_sender_address)
  );
  const req_bytes = proto.encodeTransferCoinsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_transfer_coins(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
}

// ABI to generate an event
export function generate_event(event: Uint8Array): void {
  const req = new proto.GenerateEventRequest(event);
  const req_bytes = proto.encodeGenerateEventRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_generate_event(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
}

export function set_data(
  key: Uint8Array,
  data: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.SetDataRequest(
    key,
    data,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeSetDataRequest(req);
  abi_set_data(encode_length_prefixed(req_bytes).buffer);
}

export function get_data(
  key: Uint8Array,
  optional_address: string | null
): Uint8Array {
  const req = new proto.GetDataRequest(key, makeStringValue(optional_address));
  const req_bytes = proto.encodeGetDataRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_data(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getDataResult !== null);

  return resp.res!.getDataResult!.value;
}

export function delete_data(
  key: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.DeleteDataRequest(
    key,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeDeleteDataRequest(req);
  abi_delete_data(encode_length_prefixed(req_bytes).buffer);
}

export function append_data(
  key: Uint8Array,
  data: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.AppendDataRequest(
    key,
    data,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeAppendDataRequest(req);
  abi_append_data(encode_length_prefixed(req_bytes).buffer);
}

export function has_data(
  key: Uint8Array,
  optional_address: string | null
): bool {
  const req = new proto.HasDataRequest(key, makeStringValue(optional_address));
  const req_bytes = proto.encodeHasDataRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_has_data(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.hasDataResult !== null);

  return resp.res!.hasDataResult!.hasData;
}

export function get_balance(optional_address: string | null): proto.NativeAmount {
    const req = new proto.GetBalanceRequest(makeStringValue(optional_address));
    const req_bytes = proto.encodeGetBalanceRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_balance(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getBalanceResult !== null);
    
    return assert(resp.res!.getBalanceResult!.balance, "Could not get balance");
}

export function get_bytecode(optional_address: string | null): Uint8Array {
    const req = new proto.GetBytecodeRequest(makeStringValue(optional_address));
    const req_bytes = proto.encodeGetBytecodeRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_bytecode(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getBytecodeResult !== null);
    
    return resp.res!.getBytecodeResult!.bytecode;
}

export function set_bytecode(bytecode: Uint8Array, optional_address: string | null): void {
    const req = new proto.SetBytecodeRequest(bytecode, makeStringValue(optional_address));
    const req_bytes = proto.encodeSetBytecodeRequest(req);
    abi_set_bytecode(encode_length_prefixed(req_bytes).buffer);
}

export function get_keys(prefix: Uint8Array, optional_address: string | null): Uint8Array[] {
    const req = new proto.GetKeysRequest(prefix, makeStringValue(optional_address));
    const req_bytes = proto.encodeGetKeysRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_keys(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getKeysResult !== null);
    
    return resp.res!.getKeysResult!.keys;
}

// Prefix is optional: same as empty? I think so
export function get_op_keys(prefix: Uint8Array): Uint8Array[] {
    const req = new proto.GetOpKeysRequest(/*prefix*/);
    const req_bytes = proto.encodeGetOpKeysRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_op_keys(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getOpKeysResult !== null);
    
    return resp.res!.getOpKeysResult!.keys;
}

export function has_op_key(key: Uint8Array): bool {
    const req = new proto.HasOpKeyRequest(key);
    const req_bytes = proto.encodeHasOpKeyRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_has_op_key(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.hasOpKeyResult !== null);
    
    return resp.res!.hasOpKeyResult!.hasKey;
}

export function get_op_data(key: Uint8Array): Uint8Array {
    const req = new proto.GetOpDataRequest(key);
    const req_bytes = proto.encodeGetOpDataRequest(req);
    const resp_bytes = Uint8Array.wrap(abi_get_op_data(encode_length_prefixed(req_bytes).buffer));
    const resp = proto.decodeAbiResponse(resp_bytes);

    assert(resp.error === null);
    assert(resp.res !== null);
    assert(resp.res!.getOpDataResult !== null);
    
    return resp.res!.getOpDataResult!.value;
}

/// performs a keccak256 hash on byte array and returns the hash as byte array
export function hash_keccak256(data: Uint8Array): Uint8Array {
  const req = new proto.Keccak256Request(data);
  const req_bytes = proto.encodeKeccak256Request(req);
  const resp_bytes = Uint8Array.wrap(
    abi_hash_keccak256(encode_length_prefixed(req_bytes).buffer)
  );
  const abi_resp = proto.decodeAbiResponse(resp_bytes);
  assert(abi_resp.error === null);
  assert(abi_resp.res !== null);
  assert(abi_resp.res!.keccak256Result !== null);
  assert(abi_resp.res!.keccak256Result!.hash !== null);
  return abi_resp.res!.keccak256Result!.hash;
}

/// performs a sha256 hash on byte array and returns the hash as byte array
export function hash_sha256(data: Uint8Array): Uint8Array {
  const req = new proto.HashSha256Request(data);
  const req_bytes = proto.encodeHashSha256Request(req);
  const resp_bytes = Uint8Array.wrap(
    abi_hash_sha256(encode_length_prefixed(req_bytes).buffer)
  );
  const abi_resp = proto.decodeAbiResponse(resp_bytes);
  assert(abi_resp.error === null);
  assert(abi_resp.res !== null);
  assert(abi_resp.res!.hashSha256Result !== null);
  assert(abi_resp.res!.hashSha256Result!.hash !== null);
  return abi_resp.res!.hashSha256Result!.hash;
}

/// performs a hash on byte array and returns the NativeHash
export function blake3_hash(data: Uint8Array): Uint8Array {
  const req = new proto.Blake3HashRequest(data);
  const req_bytes = proto.encodeBlake3HashRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_blake3_hash(encode_length_prefixed(req_bytes).buffer)
  );
  const abi_resp = proto.decodeAbiResponse(resp_bytes);
  assert(abi_resp.error === null);
  assert(abi_resp.res !== null);
  assert(abi_resp.res!.blake3HashResult !== null);
  assert(abi_resp.res!.blake3HashResult!.hash !== null);
  return assert(
    abi_resp.res!.blake3HashResult!.hash,
    "NativeHash computation failed"
  );
}

/// gets the current execution slot
export function get_current_slot(): proto.Slot {
  const req = new proto.GetCurrentSlotRequest();
  const req_bytes = proto.encodeGetCurrentSlotRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_current_slot(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getCurrentSlotResult !== null);
  assert(resp.res!.getCurrentSlotResult !== null);
  return assert(
    resp.res!.getCurrentSlotResult!.slot,
    "Could not get current slot"
  );
}
