import * as proto from "massa-proto-as/assembly";
import { StringValue } from "massa-proto-as/assembly/google/protobuf/StringValue";
import { decimalCount32 } from "util/number";

// ***************************************************************************
// abi declarations
// ***************************************************************************
// /*
// @ts-ignore: decorator
@external("massa", "abi_set_ds_value")
declare function abi_set_ds_value(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_ds_value")
declare function abi_get_ds_value(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_delete_ds_entry")
declare function abi_delete_ds_entry(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_append_ds_value")
declare function abi_append_ds_value(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_ds_entry_exists")
declare function abi_ds_entry_exists(arg: ArrayBuffer): ArrayBuffer;

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
@external("massa", "abi_get_ds_keys")
declare function abi_get_ds_keys(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_op_keys")
declare function abi_get_op_keys(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_op_entry_exists")
declare function abi_op_entry_exists(arg: ArrayBuffer): ArrayBuffer;

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
@external("massa", "abi_hash_blake3")
declare function abi_hash_blake3(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_verify_evm_signature")
declare function abi_verify_evm_signature(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_remaining_gas")
declare function abi_get_remaining_gas(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_owned_addresses")
declare function abi_get_owned_addresses(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_call_stack")
declare function abi_get_call_stack(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_address_from_public_key")
declare function abi_address_from_public_key(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_unsafe_random")
declare function abi_unsafe_random(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_call_coins")
declare function abi_get_call_coins(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_native_time")
declare function abi_get_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_send_async_message")
declare function abi_send_async_message(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_origin_operation_id")
declare function abi_get_origin_operation_id(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_local_execution")
declare function abi_local_execution(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_caller_has_write_access")
declare function abi_caller_has_write_access(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_check_native_amount")
declare function abi_check_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_add_native_amount")
declare function abi_add_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_sub_native_amount")
declare function abi_sub_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_scalar_mul_native_amount")
declare function abi_scalar_mul_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_scalar_div_rem_native_amount")
declare function abi_scalar_div_rem_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_div_rem_native_amount")
declare function abi_div_rem_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_native_amount_to_string")
declare function abi_native_amount_to_string(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_native_amount_from_string")
declare function abi_native_amount_from_string(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_base58_check_to_bytes")
declare function abi_base58_check_to_bytes(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_bytes_to_base58_check")
declare function abi_bytes_to_base58_check(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_check_address")
declare function abi_check_address(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_check_pubkey")
declare function abi_check_pubkey(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_check_signature")
declare function abi_check_signature(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_address_category")
declare function abi_get_address_category(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_address_version")
declare function abi_get_address_version(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_pubkey_version")
declare function abi_get_pubkey_version(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_get_signature_version")
declare function abi_get_signature_version(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_checked_add_native_time")
declare function abi_checked_add_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_checked_sub_native_time")
declare function abi_checked_sub_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_checked_mul_native_time")
declare function abi_checked_mul_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_checked_scalar_div_native_time")
declare function abi_checked_scalar_div_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_checked_div_native_time")
declare function abi_checked_div_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_compare_address")
declare function abi_compare_address(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_compare_native_amount")
declare function abi_compare_native_amount(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_compare_native_time")
declare function abi_compare_native_time(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_compare_pub_key")
declare function abi_compare_pub_key(arg: ArrayBuffer): ArrayBuffer;

// @ts-ignore: decorator
@external("massa", "abi_verify_signature")
declare function abi_verify_signature(arg: ArrayBuffer): ArrayBuffer;
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

function stringToUint8Array(str: string): Uint8Array {
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

export function verify_evm_signature(
  sig: Uint8Array,
  message: Uint8Array,
  pub_key: Uint8Array
): bool {
  const req = new proto.VerifyEvmSigRequest(sig, message, pub_key);
  const req_bytes = proto.encodeVerifyEvmSigRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_verify_evm_signature(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.verifyEvmSigResult !== null);
  return resp.res!.verifyEvmSigResult!.isVerified;
}

export function get_remaining_gas(): u64 {
  const req = new proto.GetRemainingGasRequest();
  const req_bytes = proto.encodeGetRemainingGasRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_remaining_gas(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getRemainingGasResult !== null);
  return resp.res!.getRemainingGasResult!.remainingGas;
}

export function get_owned_addresses(): string[] {
  const req = new proto.GetOwnedAddressesRequest();
  const req_bytes = proto.encodeGetOwnedAddressesRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_owned_addresses(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getOwnedAddressesResult !== null);
  return resp.res!.getOwnedAddressesResult!.addresses;
}

export function get_call_stack(): string[] {
  const req = new proto.GetCallStackRequest();
  const req_bytes = proto.encodeGetCallStackRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_call_stack(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getCallStackResult !== null);
  return resp.res!.getCallStackResult!.calls;
}

export function address_from_public_key(public_key: string): string {
  const req = new proto.AddressFromPubKeyRequest(public_key);
  const req_bytes = proto.encodeAddressFromPubKeyRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_address_from_public_key(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.addressFromPubKeyResult !== null);
  return resp.res!.addressFromPubKeyResult!.address;
}

export function unsafe_random(num_bytes: u32): Uint8Array {
  const req = new proto.UnsafeRandomRequest(num_bytes);
  const req_bytes = proto.encodeUnsafeRandomRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_unsafe_random(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.unsafeRandomResult !== null);
  return resp.res!.unsafeRandomResult!.randomBytes;
}

export function get_call_coins(): proto.NativeAmount {
  const req = new proto.GetCallCoinsRequest();
  const req_bytes = proto.encodeGetCallCoinsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_call_coins(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getCallCoinsResult !== null);
  return assert(
    resp.res!.getCallCoinsResult!.coins,
    "Could not get call coins"
  );
}

export function get_native_time(): proto.NativeTime {
  const req = new proto.GetNativeTimeRequest();
  const req_bytes = proto.encodeGetNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getNativeTimeResult !== null);
  return assert(
    resp.res!.getNativeTimeResult!.time,
    "Could not get native time"
  );
}

export function send_async_message(
  target_address: string,
  target_handler: string,
  validity_start: proto.Slot,
  validity_end: proto.Slot,
  execution_gas: u64,
  raw_fee: u64,
  raw_coins: u64,
  data: Uint8Array,
  filter: proto.SendAsyncMessageFilter
): void {
  const req = new proto.SendAsyncMessageRequest(
    target_address,
    target_handler,
    validity_start,
    validity_end,
    execution_gas,
    raw_fee,
    raw_coins,
    data,
    filter
  );
  const req_bytes = proto.encodeSendAsyncMessageRequest(req);
  abi_send_async_message(encode_length_prefixed(req_bytes).buffer);
}

export function get_origin_operation_id(): string | null {
  const req = new proto.GetOriginOperationIdRequest();
  const req_bytes = proto.encodeGetOriginOperationIdRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_origin_operation_id(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getOriginOperationIdResult !== null);
  if (resp.res!.getOriginOperationIdResult!.operationId === null) {
    return null;
  }
  return resp.res!.getOriginOperationIdResult!.operationId!.value;
}

export function local_execution(
  bytecode: Uint8Array,
  target_function: string,
  arg: Uint8Array
): Uint8Array {
  const req = new proto.LocalExecutionRequest(bytecode, target_function, arg);
  const req_bytes = proto.encodeLocalExecutionRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_local_execution(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.localExecutionResponse !== null);
  return resp.res!.localExecutionResponse!.data;
}

export function caller_has_write_access(): bool {
  const req = new proto.CallerHasWriteAccessRequest();
  const req_bytes = proto.encodeCallerHasWriteAccessRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_caller_has_write_access(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.callerHasWriteAccessResult !== null);
  return resp.res!.callerHasWriteAccessResult!.hasWriteAccess;
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
export function generate_event(event: string): void {
  const message = stringToUint8Array(event);
  const req = new proto.GenerateEventRequest(message);
  const req_bytes = proto.encodeGenerateEventRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_generate_event(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null, "Error generating event" + resp.error!.message);
}

export function set_ds_value(
  key: Uint8Array,
  data: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.SetDsValueRequest(
    key,
    data,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeSetDsValueRequest(req);
  abi_set_ds_value(encode_length_prefixed(req_bytes).buffer);
}

export function get_ds_value(
  key: Uint8Array,
  optional_address: string | null
): Uint8Array {
  const req = new proto.GetDsValueRequest(key, makeStringValue(optional_address));
  const req_bytes = proto.encodeGetDsValueRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_ds_value(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getDsValueResult !== null);

  return resp.res!.getDsValueResult!.value;
}

export function delete_ds_entry(
  key: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.DeleteDsEntryRequest(
    key,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeDeleteDsEntryRequest(req);
  abi_delete_ds_entry(encode_length_prefixed(req_bytes).buffer);
}

export function append_ds_value(
  key: Uint8Array,
  data: Uint8Array,
  optional_address: string | null
): void {
  const req = new proto.AppendDsValueRequest(
    key,
    data,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeAppendDsValueRequest(req);
  abi_append_ds_value(encode_length_prefixed(req_bytes).buffer);
}

export function ds_entry_exists(
  key: Uint8Array,
  optional_address: string | null
): bool {
  const req = new proto.DsEntryExistsRequest(key, makeStringValue(optional_address));
  const req_bytes = proto.encodeDsEntryExistsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_ds_entry_exists(encode_length_prefixed(req_bytes).buffer)
  );

  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.dsEntryExistsResult !== null);

  return resp.res!.dsEntryExistsResult!.hasData;
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

export function get_ds_keys(
  prefix: Uint8Array,
  optional_address: string | null
): Uint8Array[] {
  const req = new proto.GetDsKeysRequest(
    prefix,
    makeStringValue(optional_address)
  );
  const req_bytes = proto.encodeGetDsKeysRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_ds_keys(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.getDsKeysResult !== null);

  return resp.res!.getDsKeysResult!.keys;
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

export function op_entry_exists(key: Uint8Array): bool {
  const req = new proto.OpEntryExistsRequest(key);
  const req_bytes = proto.encodeOpEntryExistsRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_op_entry_exists(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);

  assert(resp.error === null);
  assert(resp.res !== null);
  assert(resp.res!.opEntryExistsResult !== null);

  return resp.res!.opEntryExistsResult!.hasKey;
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
export function hash_blake3(data: Uint8Array): Uint8Array {
  const req = new proto.HashBlake3Request(data);
  const req_bytes = proto.encodeHashBlake3Request(req);
  const resp_bytes = Uint8Array.wrap(
    abi_hash_blake3(encode_length_prefixed(req_bytes).buffer)
  );
  const abi_resp = proto.decodeAbiResponse(resp_bytes);
  assert(abi_resp.error === null);
  assert(abi_resp.res !== null);
  assert(abi_resp.res!.hashBlake3Result !== null);
  assert(abi_resp.res!.hashBlake3Result!.hash !== null);
  return assert(
    abi_resp.res!.hashBlake3Result!.hash,
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
  return assert(
    resp.res!.getCurrentSlotResult!.slot,
    "Could not get current slot"
  );
}

export function make_native_amount(
  mantissa: i64,
  scale: i32
): proto.NativeAmount {
  return new proto.NativeAmount(mantissa, scale);
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

export function add_native_amount(
  amount1: proto.NativeAmount,
  amount2: proto.NativeAmount
): proto.NativeAmount {
  const req = new proto.AddNativeAmountRequest(amount1, amount2);
  const req_bytes = proto.encodeAddNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_add_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, resp.error!.message);
  assert(resp.res !== null, "add_native_amount res null");
  assert(
    resp.res!.addNativeAmountResult !== null,
    "addNativeAmountResult null"
  );
  assert(resp.res!.addNativeAmountResult!.sum !== null, "sum null");
  return resp.res!.addNativeAmountResult!.sum!;
}

export function sub_native_amount(
  left: proto.NativeAmount,
  right: proto.NativeAmount
): proto.NativeAmount {
  const req = new proto.SubNativeAmountRequest(left, right);
  const req_bytes = proto.encodeSubNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_sub_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, resp.error!.message);
  assert(resp.res !== null, "sub_native_amount res null");
  assert(
    resp.res!.subNativeAmountResult !== null,
    "subNativeAmountResult null"
  );
  assert(
    resp.res!.subNativeAmountResult!.difference !== null,
    "difference null"
  );
  return resp.res!.subNativeAmountResult!.difference!;
}

export function scalar_mul_native_amount(
  amount: proto.NativeAmount,
  coefficient: i64 = 0
): proto.NativeAmount {
  const req = new proto.ScalarMulNativeAmountRequest(amount, coefficient);
  const req_bytes = proto.encodeScalarMulNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_scalar_mul_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, resp.error!.message);
  assert(resp.res !== null);
  assert(
    resp.res!.scalarMulNativeAmountResult !== null
  );
  assert(resp.res!.scalarMulNativeAmountResult!.product !== null, "product null");
  return resp.res!.scalarMulNativeAmountResult!.product!;
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

export function div_rem_native_amount(
  dividend: proto.NativeAmount,
  divisor: proto.NativeAmount
): DivRemNativeAmount {
  const req = new proto.DivRemNativeAmountRequest(dividend, divisor);
  const req_bytes = proto.encodeDivRemNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_div_rem_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, resp.error!.message);
  assert(resp.res !== null);
  assert(
    resp.res!.divRemNativeAmountResult !== null,
    "divRemNativeAmountResult null"
  );
  assert(
    resp.res!.divRemNativeAmountResult!.remainder !== null,
    "remainder null"
  );
  return new DivRemNativeAmount(
    resp.res!.divRemNativeAmountResult!.quotient,
    resp.res!.divRemNativeAmountResult!.remainder!
  );
}

// return quotient and remainder
// NativeAmount quotient;
// NativeAmount remainder;
// as an Array of NativeAmount
export function scalar_div_rem_native_amount(
  dividend: proto.NativeAmount,
  divisor: i64
): Array<proto.NativeAmount> {
  const req = new proto.ScalarDivRemNativeAmountRequest(dividend, divisor);
  const req_bytes = proto.encodeScalarDivRemNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_scalar_div_rem_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, resp.error!.message);
  assert(resp.res !== null, "scalar_div_rem_native_amount res null");
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

export function base58_check_to_bytes(to_decode: string): Uint8Array {
  const req = new proto.Base58CheckToBytesRequest(to_decode);
  const req_bytes = proto.encodeBase58CheckToBytesRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_base58_check_to_bytes(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "base58_check_to_bytes error: " + resp.error!.message
  );
  assert(resp.res !== null, "base58_check_to_bytes res null");

  assert(
    resp.res!.base58CheckToBytesResult !== null,
    "base58CheckToBytesResult null"
  );
  return resp.res!.base58CheckToBytesResult!.bytes;
}

export function bytes_to_base58_check(to_encode: Uint8Array): string {
  const req = new proto.BytesToBase58CheckRequest(to_encode);
  const req_bytes = proto.encodeBytesToBase58CheckRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_bytes_to_base58_check(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "bytes_to_base58_check error: " + resp.error!.message
  );
  assert(resp.res !== null, "bytes_to_base58_check res null");

  assert(
    resp.res!.bytesToBase58CheckResult !== null,
    "bytesToBase58CheckResult null"
  );
  return resp.res!.bytesToBase58CheckResult!.base58Check;
}

export function check_address(to_check: string): bool {
  const req = new proto.CheckAddressRequest(to_check);
  const req_bytes = proto.encodeCheckAddressRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_check_address(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "check_address" + resp.error!.message);
  assert(resp.res !== null, "check_address res null");
  assert(resp.res!.checkAddressResult !== null, "checkAddressResult null");
  return resp.res!.checkAddressResult!.isValid;
}

export function check_pubkey(to_check: string): bool {
  const req = new proto.CheckPubKeyRequest(to_check);
  const req_bytes = proto.encodeCheckPubKeyRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_check_pubkey(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "check_pubkey" + resp.error!.message);
  assert(resp.res !== null, "check_pubkey res null");
  assert(resp.res!.checkPubKeyResult !== null, "checkPubKeyResult null");
  return resp.res!.checkPubKeyResult!.isValid;
}

export function check_signature(to_check: string): bool {
  const req = new proto.CheckSigRequest(to_check);
  const req_bytes = proto.encodeCheckSigRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_check_signature(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "check_signature" + resp.error!.message);
  assert(resp.res !== null, "check_signature res null");
  assert(resp.res!.checkSigResult !== null, "checkSigResult null");
  return resp.res!.checkSigResult!.isValid;
}

export function get_address_category(address: string): proto.AddressCategory {
  const req = new proto.GetAddressCategoryRequest(address);
  const req_bytes = proto.encodeGetAddressCategoryRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_address_category(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "get_address_category" + resp.error!.message);
  assert(resp.res !== null, "get_address_category res null");
  assert(
    resp.res!.getAddressCategoryResult !== null,
    "getAddressCategoryResult null"
  );
  return resp.res!.getAddressCategoryResult!.category;
}

export function get_address_version(address: string): u64 {
  const req = new proto.GetAddressVersionRequest(address);
  const req_bytes = proto.encodeGetAddressVersionRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_address_version(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "get_address_version" + resp.error!.message);
  assert(resp.res !== null, "get_address_version res null");
  assert(
    resp.res!.getAddressVersionResult !== null,
    "getAddressVersionResult null"
  );
  return resp.res!.getAddressVersionResult!.version;
}

export function get_pubkey_version(address: string): u64 {
  const req = new proto.GetPubKeyVersionRequest(address);
  const req_bytes = proto.encodeGetPubKeyVersionRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_pubkey_version(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "get_pubkey_version" + resp.error!.message);
  assert(resp.res !== null, "get_pubkey_version res null");
  assert(
    resp.res!.getPubKeyVersionResult !== null,
    "getPubKeyVersionResult null"
  );
  return resp.res!.getPubKeyVersionResult!.version;
}

export function get_signature_version(address: string): u64 {
  const req = new proto.GetSignatureVersionRequest(address);
  const req_bytes = proto.encodeGetSignatureVersionRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_get_signature_version(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "get_signature_version" + resp.error!.message);
  assert(resp.res !== null, "get_signature_version res null");
  assert(
    resp.res!.getSignatureVersionResult !== null,
    "getSignatureVersionResult null"
  );
  return resp.res!.getSignatureVersionResult!.version;
}

export function checked_add_native_time(
  time1: proto.NativeTime,
  time2: proto.NativeTime
): proto.NativeTime {
  const req = new proto.CheckedAddNativeTimeRequest(time1, time2);
  const req_bytes = proto.encodeCheckedAddNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_checked_add_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "checked_add_native_time" + resp.error!.message);
  assert(resp.res !== null, "checked_add_native_time res null");
  assert(
    resp.res!.checkedAddNativeTimeResult !== null,
    "checkedAddNativeTimeResult null"
  );
  return assert(
    resp.res!.checkedAddNativeTimeResult!.sum,
    "checkedAddNativeTimeResult.sum null"
  );
}

export function checked_sub_native_time(
  left: proto.NativeTime,
  right: proto.NativeTime
): proto.NativeTime {
  const req = new proto.CheckedSubNativeTimeRequest(left, right);
  const req_bytes = proto.encodeCheckedSubNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_checked_sub_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "checked_sub_native_time" + resp.error!.message);
  assert(resp.res !== null, "checked_sub_native_time res null");
  assert(
    resp.res!.checkedSubNativeTimeResult !== null,
    "checkedSubNativeTimeResult null"
  );
  return assert(
    resp.res!.checkedSubNativeTimeResult!.difference,
    "checkedSubNativeTimeResult.difference null"
  );
}

export function checked_mul_native_time(
  time: proto.NativeTime,
  coefficient: u64
): proto.NativeTime {
  const req = new proto.CheckedScalarMulNativeTimeRequest(time, coefficient);
  const req_bytes = proto.encodeCheckedScalarMulNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_checked_mul_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "checked_mul_native_time" + resp.error!.message);
  assert(resp.res !== null, "checked_mul_native_time res null");
  assert(
    resp.res!.checkedScalarMulNativeTimeResult !== null,
    "checkedMulNativeTimeResult null"
  );
  return assert(
    resp.res!.checkedScalarMulNativeTimeResult!.product,
    "checkedMulNativeTimeResult.product null"
  );
}

// return quotient and remainder
// NativeTime quotient;
// NativeTime remainder;
// as an Array of NativeTime
export function checked_scalar_div_native_time(
  dividend: proto.NativeTime,
  divisor: u64
): proto.NativeTime[] {
  const req = new proto.CheckedScalarDivRemNativeTimeRequest(dividend, divisor);
  const req_bytes = proto.encodeCheckedScalarDivRemNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_checked_scalar_div_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "checked_scalar_div_native_time" + resp.error!.message
  );
  assert(resp.res !== null, "checked_scalar_div_native_time res null");
  assert(
    resp.res!.checkedScalarDivRemNativeTimeResult !== null,
    "checkedScalarDivRemNativeTimeResult null"
  );
  assert(
    resp.res!.checkedScalarDivRemNativeTimeResult!.quotient !== null,
    "checkedScalarDivRemNativeTimeResult.quotient null"
  );
  assert(
    resp.res!.checkedScalarDivRemNativeTimeResult!.remainder !== null,
    "checkedScalarDivRemNativeTimeResult.remainder null"
  );
  return [
    resp.res!.checkedScalarDivRemNativeTimeResult!.quotient!,
    resp.res!.checkedScalarDivRemNativeTimeResult!.remainder!,
  ];
}

// return quotient and remainder
// int64 quotient;
// NativeTime remainder;
export class DivRemNativeTime {
  public quotient: i64;
  public remainder: proto.NativeTime;

  constructor(quotient: i64, remainder: proto.NativeTime) {
    this.quotient = quotient;
    this.remainder = remainder;
  }
}

export function checked_div_native_time(
  dividend: proto.NativeTime,
  divisor: proto.NativeTime
): DivRemNativeTime {
  const req = new proto.CheckedDivRemNativeTimeRequest(dividend, divisor);
  const req_bytes = proto.encodeCheckedDivRemNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_checked_div_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(resp.error === null, "checked_div_native_time" + resp.error!.message);
  assert(resp.res !== null, "checked_div_native_time res null");
  assert(
    resp.res!.checkedDivRemNativeTimeResult !== null,
    "checkedDivRemNativeTimeResult null"
  );
  assert(
    resp.res!.checkedDivRemNativeTimeResult!.remainder !== null,
    "checkedDivRemNativeTimeResult.remainder null"
  );
  return new DivRemNativeTime(
    resp.res!.checkedDivRemNativeTimeResult!.quotient,
    resp.res!.checkedDivRemNativeTimeResult!.remainder!
  );
}

export function compare_address(
  left: string,
  right: string
): proto.ComparisonResult {
  const req = new proto.CompareAddressRequest(left, right);
  const req_bytes = proto.encodeCompareAddressRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_compare_address(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "abi_compare_address error: " + resp.error!.message
  );
  assert(resp.res !== null, "abi_compare_address res null");
  assert(resp.res!.compareAddressResult !== null, "compareAddressResult null");
  return resp.res!.compareAddressResult!.result;
}

export function compare_native_amount(
  left: proto.NativeAmount,
  right: proto.NativeAmount
): proto.ComparisonResult {
  const req = new proto.CompareNativeAmountRequest(left, right);
  const req_bytes = proto.encodeCompareNativeAmountRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_compare_native_amount(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "abi_compare_native_amount error: " + resp.error!.message
  );
  assert(resp.res !== null, "abi_compare_native_amount res null");
  assert(
    resp.res!.compareNativeAmountResult !== null,
    "compareNativeAmountResult null"
  );
  return resp.res!.compareNativeAmountResult!.result;
}

export function compare_native_time(
  left: proto.NativeTime,
  right: proto.NativeTime
): proto.ComparisonResult {
  const req = new proto.CompareNativeTimeRequest(left, right);
  const req_bytes = proto.encodeCompareNativeTimeRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_compare_native_time(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "abi_compare_native_time error: " + resp.error!.message
  );
  assert(resp.res !== null, "abi_compare_native_time res null");
  assert(
    resp.res!.compareNativeTimeResult !== null,
    "compareNativeTimeResult null"
  );
  return resp.res!.compareNativeTimeResult!.result;
}

export function compare_pub_key(
  left: string,
  right: string
): proto.ComparisonResult {
  const req = new proto.ComparePubKeyRequest(left, right);
  const req_bytes = proto.encodeComparePubKeyRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_compare_pub_key(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "abi_compare_pub_key error: " + resp.error!.message
  );
  assert(resp.res !== null, "abi_compare_pub_key res null");
  assert(resp.res!.comparePubKeyResult !== null, "comparePubKeyResult null");
  return resp.res!.comparePubKeyResult!.result;
}

export function myseed(): f64 {
  const random_bytes = unsafe_random(8);
  const seed_f64 = new DataView(random_bytes.buffer).getFloat64(0);
  return seed_f64;
}

export function verify_signature(
  sig: string,
  message: Uint8Array,
  pubKey: string
): bool {
  const req = new proto.VerifySigRequest(sig, message, pubKey);
  const req_bytes = proto.encodeVerifySigRequest(req);
  const resp_bytes = Uint8Array.wrap(
    abi_verify_signature(encode_length_prefixed(req_bytes).buffer)
  );
  const resp = proto.decodeAbiResponse(resp_bytes);
  assert(
    resp.error === null,
    "abi_verify_signature error: " + resp.error!.message
  );
  assert(resp.res !== null, "abi_verify_signature res null");
  assert(resp.res!.verifySigResult !== null, "verifySigResult null");
  return resp.res!.verifySigResult!.isVerified;
}
