import * as proto from "massa-proto-as/assembly";
import { StringValue } from "massa-proto-as/assembly/google/protobuf/StringValue";
import { UInt32Value } from "massa-proto-as/assembly/google/protobuf/UInt32Value";
import { UInt64Value } from "massa-proto-as/assembly/google/protobuf/UInt64Value";
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

// @ts-ignore: decorator
@external("massa", "abi_check_native_amount")
declare function abi_check_native_amount(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_add_native_amounts")
declare function abi_add_native_amounts(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_sub_native_amounts")
declare function abi_sub_native_amounts(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_mul_native_amount")
declare function abi_mul_native_amount(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_div_rem_native_amount")
declare function abi_div_rem_native_amount(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_div_rem_native_amounts")
declare function abi_div_rem_native_amounts(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_native_amount_to_string")
declare function abi_native_amount_to_string(arg: ArrayBuffer): ArrayBuffer;
// @ts-ignore: decorator
@external("massa", "abi_native_amount_from_string")
declare function abi_native_amount_from_string(arg: ArrayBuffer): ArrayBuffer;
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

  assert(
    resp.error === null,
    "Failed to create smart contract: " + resp.error!.message
  );
  assert(resp.res !== null, "response is null");
  assert(resp.res!.createScResult !== null, "createScResult is null");
  assert(resp.res!.createScResult!.scAddress !== "", "scAddress is empty");

  return resp.res!.createScResult!.scAddress;
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

export function generate_str_event(msg: string): void {
  return generate_event(stringToUint8Array(msg));
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

export function get_balance(
  optional_address: string | null
): proto.NativeAmount {
  const req = new proto.GetBalanceRequest(makeStringValue(optional_address));
  const req_bytes = proto.encodeGetBalanceRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_balance(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getBalanceResult !== null);

  return assert(resp.res!.getBalanceResult!.balance, "Could not get balance");
}

export function get_bytecode(optional_address: string | null): Uint8Array {
  const req = new proto.GetBytecodeRequest(makeStringValue(optional_address));
  const req_bytes = proto.encodeGetBytecodeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_bytecode(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getBytecodeResult !== null);

  return resp.res!.getBytecodeResult!.bytecode;
}

export function set_bytecode(
  bytecode: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.SetBytecodeRequest(
    bytecode,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeSetBytecodeRequest(req);
  abi_set_bytecode(encode_length_prefixed(req_bytes).buffer);
}

export function get_keys(
  prefix: Uint8Array,
  optional_address: string | null
): Uint8Array[] {
  const req = new proto.GetKeysRequest(
    prefix,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeGetKeysRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_keys(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getKeysResult !== null);

  return resp.res!.getKeysResult!.keys;
}

export function get_op_keys(prefix: Uint8Array): Uint8Array[] {
  const req = new proto.GetOpKeysRequest(prefix);
  const req_bytes = proto.encodeGetOpKeysRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_op_keys(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getOpKeysResult !== null);

  return resp.res!.getOpKeysResult!.keys;
}

export function has_op_key(key: Uint8Array): bool {
  const req = new proto.HasOpKeyRequest(key);
  const req_bytes = proto.encodeHasOpKeyRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_has_op_key(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.hasOpKeyResult !== null);

  return resp.res!.hasOpKeyResult!.hasKey;
}

export function get_op_data(key: Uint8Array): Uint8Array {
  const req = new proto.GetOpDataRequest(key);
  const req_bytes = proto.encodeGetOpDataRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_op_data(encode_length_prefixed(req_bytes).buffer)
  );
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

export function make_native_amount(
  mantissa: i64,
  scale: i32
): proto.NativeAmount {
  return new proto.NativeAmount(
    new UInt64Value(mantissa),
    new UInt32Value(scale)
  );
}

export function check_native_amount(to_check: proto.NativeAmount): bool {
  const req = new proto.CheckNativeAmountRequest(to_check);
  const req_bytes = proto.encodeCheckNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_check_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "check_native_amount" + resp.error!.message);
  assert(resp.res !== null, "check_native_amount res null");
  assert(
    resp.res!.checkNativeAmountResult !== null,
    "checkNativeAmountResult null"
  );
  return resp.res!.checkNativeAmountResult!.isValid;
}

export function add_native_amounts(
  amount1: proto.NativeAmount,
  amount2: proto.NativeAmount
): proto.NativeAmount {
  const req = new proto.AddNativeAmountsRequest(amount1, amount2);
  const req_bytes = proto.encodeAddNativeAmountsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_add_native_amounts(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "add_native_amounts" + resp.error!.message);
  assert(resp.res !== null, "add_native_amounts res null");
  assert(
    resp.res!.addNativeAmountsResult !== null,
    "addNativeAmountsResult null"
  );
  assert(resp.res!.addNativeAmountsResult!.sum !== null, "sum null");
  return resp.res!.addNativeAmountsResult!.sum!;
}

export function sub_native_amounts(
  left: proto.NativeAmount,
  right: proto.NativeAmount
): proto.NativeAmount {
  const req = new proto.SubNativeAmountsRequest(left, right);
  const req_bytes = proto.encodeSubNativeAmountsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_sub_native_amounts(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "sub_native_amounts" + resp.error!.message);
  assert(resp.res !== null, "sub_native_amounts res null");
  assert(
    resp.res!.subNativeAmountsResult !== null,
    "subNativeAmountsResult null"
  );
  assert(
    resp.res!.subNativeAmountsResult!.difference !== null,
    "difference null"
  );
  return resp.res!.subNativeAmountsResult!.difference!;
}

export function mul_native_amount(
  amount: proto.NativeAmount,
  coefficient: i64 = 0
): proto.NativeAmount {
  const req = new proto.MulNativeAmountRequest(
    amount,
    new UInt64Value(coefficient)
  );
  const req_bytes = proto.encodeMulNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_mul_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "mul_native_amount" + resp.error!.message);
  assert(resp.res !== null, "mul_native_amount res null");
  assert(
    resp.res!.mulNativeAmountResult !== null,
    "mulNativeAmountResult null"
  );
  assert(resp.res!.mulNativeAmountResult!.product !== null, "product null");
  return resp.res!.mulNativeAmountResult!.product!;
}

// return quotient and remainder
// int64 quotient;
// NativeAmount remainder;
export class DivRemNativeAmount {
  public quotient: i64;
  public remainder: proto.NativeAmount;

  constructor(quotient: i64, remainder: proto.NativeAmount) {
    this.quotient = quotient;
    this.remainder = remainder;
  }
}

export function div_rem_native_amounts(
  dividend: proto.NativeAmount,
  divisor: proto.NativeAmount
): DivRemNativeAmount {
  const req = new proto.DivRemNativeAmountsRequest(dividend, divisor);
  const req_bytes = proto.encodeDivRemNativeAmountsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_div_rem_native_amounts(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "div_rem_native_amounts" + resp.error!.message);
  assert(resp.res !== null, "div_rem_native_amounts res null");
  assert(
    resp.res!.divRemNativeAmountsResult !== null,
    "divRemNativeAmountsResult null"
  );
  assert(
    resp.res!.divRemNativeAmountsResult!.mandatoryQuotient !== null,
    "mandatoryQuotient null"
  );
  assert(
    resp.res!.divRemNativeAmountsResult!.remainder !== null,
    "remainder null"
  );
  return new DivRemNativeAmount(
    resp.res!.divRemNativeAmountsResult!.mandatoryQuotient!.value,
    resp.res!.divRemNativeAmountsResult!.remainder!
  );
}

// return quotient and remainder
// NativeAmount quotient;
// NativeAmount remainder;
// as an Array of NativeAmount
export function div_rem_native_amount(
  dividend: proto.NativeAmount,
  divisor: i64
): Array<proto.NativeAmount> {
  const req = new proto.ScalarDivRemNativeAmountRequest(
    dividend,
    new UInt64Value(divisor)
  );
  const req_bytes = proto.encodeScalarDivRemNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_div_rem_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "div_rem_native_amount" + resp.error!.message);
  assert(resp.res !== null, "div_rem_native_amount res null");
  assert(
    resp.res!.scalarDivRemNativeAmountResult !== null,
    "scalarDivRemNativeAmountResult null"
  );
  assert(
    resp.res!.scalarDivRemNativeAmountResult!.quotient !== null,
    "quotient null"
  );
  assert(
    resp.res!.scalarDivRemNativeAmountResult!.remainder !== null,
    "remainder null"
  );
  return [
    resp.res!.scalarDivRemNativeAmountResult!.quotient!,
    resp.res!.scalarDivRemNativeAmountResult!.remainder!,
  ];
}

export function native_amount_to_string(
  to_convert: proto.NativeAmount
): string {
  const req = new proto.NativeAmountToStringRequest(to_convert);
  const req_bytes = proto.encodeNativeAmountToStringRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_native_amount_to_string(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "native_amount_to_string error: " + resp.error!.message
  );
  assert(resp.res !== null, "native_amount_to_string res null");
  assert(
    resp.res!.nativeAmountToStringResult !== null,
    "nativeAmountToStringResult null"
  );
  return resp.res!.nativeAmountToStringResult!.convertedAmount;
}

export function native_amount_from_string(
  to_convert: string
): proto.NativeAmount {
  const req = new proto.NativeAmountFromStringRequest(to_convert);
  const req_bytes = proto.encodeNativeAmountFromStringRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_native_amount_from_string(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "native_amount_from_string error: " + resp.error!.message
  );
  assert(resp.res !== null, "native_amount_from_string res null");
  assert(
    resp.res!.nativeAmountFromStringResult !== null,
    "nativeAmountFromStringResult null"
  );
  assert(
    resp.res!.nativeAmountFromStringResult!.convertedAmount !== null,
    "convertedAmount null"
  );
  return resp.res!.nativeAmountFromStringResult!.convertedAmount!;
}
