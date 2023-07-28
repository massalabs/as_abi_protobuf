import { assert_args_addr, encode_result } from "./sdk/shared_mem";
import * as env from "./env";
import * as proto from "massa-proto-as/assembly";

// Exhaustive test of all the ABIs exposed
// Note: createSC, call, localCall and localExecution are tested in the index / main workflow, not here.

export function main(args: ArrayBuffer): ArrayBuffer {
  assert_args_addr(args);

  // The following bool should be set to:
  // - true when running the tests in a sandbox node
  // - false when running the tests in the runtime test interface
  const sandbox = true;

  // Define all the argument values:
  const optional_address =
    "AU1HcvsjYY8CWwbPacRSCqrTyp9np4TcDECQYHvdH3s9WDZuDYo9";
  const to_address = "AU12ZXAfMgcLCRFDWR3fpJ7RoMYnEsmbFSgLvB5UGDJGYfYUtinem";
  const address = "AU1HcvsjYY8CWwbPacRSCqrTyp9np4TcDECQYHvdH3s9WDZuDYo9";

  // When decoding the following public keys to bytes, public_key should be greater than public_key2
  const public_key = "P12DbeG1P23wTYmBwabfGJquGRwWFWgQumFL6Gi1ChAfyE7pNYdG";
  const public_key2 = "P1axamMNLNFXyfxdWNyFUEVJr6JoMbtfcSgRK1LZR6eurA6nyBQ";
  const signature =
    "1PnULu1Lrnk1AVHBLusghJ79wxV8VRyFua5p97SLi6zES5FmbMd7u6hEehveUCwYiJiHXP3kxPHQgyUr7a4zwtbEvaZLmT";
  let message = new Uint8Array(4);
  message.set([116, 101, 115, 116]);
  const bytecode = new Uint8Array(1);
  bytecode[0] = 11;
  const arg = new Uint8Array(1);
  arg[0] = 22;
  const prefix = new Uint8Array(1);
  prefix[0] = 33;
  const key = new Uint8Array(1);
  key[0] = 33;
  const data = new Uint8Array(1);
  data[0] = 44;
  const amount1 = env.make_native_amount(1, 0);
  const amount2 = env.make_native_amount(100, 0);
  const str_amount = "1";
  const coefficient = 2;
  const divisor = 2;
  const time1 = new proto.NativeTime(100);
  const time2 = new proto.NativeTime(100);
  let evm_message = new Uint8Array(4);
  evm_message.set([116, 101, 115, 116]);
  let evm_hash = env.hash_keccak256(evm_message);
  let evm_signature = new Uint8Array(65);
  evm_signature.set([208, 208, 92, 53, 8, 6, 53, 181, 232, 101, 0, 108, 108, 79, 91, 93, 69, 126, 195, 66, 86,
    77, 143, 198, 124, 228, 14, 220, 38, 76, 205, 171, 63, 47, 54, 107, 91, 209, 227, 133, 130,
    83, 143, 237, 127, 166, 40, 33, 72, 232, 106, 249, 121, 112, 161, 12, 179, 48, 40, 150,
    245, 214, 142, 245, 27]);
  let evm_public_key = new Uint8Array(65);
  evm_public_key.set([4, 242, 192, 4, 239, 171, 3, 90, 235, 89, 176, 251, 75, 242, 14, 65, 253, 71, 177, 105, 0,
    111, 117, 57, 248, 100, 223, 210, 100, 6, 122, 58, 123, 252, 232, 199, 170, 56, 251, 37,
    74, 97, 93, 193, 95, 18, 147, 233, 195, 248, 196, 141, 114, 17, 114, 13, 138, 233, 242,
    105, 9, 142, 173, 144, 14]);

  env.generate_event("Starting tests of wasmv1 ABIs");
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS LAST REMAINING ABIS
  // ##############################

  // Test .myseed()
  env.generate_event(
    "Calling myseed() through Math.random() calling env.seed()"
  );
  const ret_random = Math.random();
  env.generate_event("  > Ok: Math.random() returns: " + ret_random.toString());
  if (!sandbox) { env.generate_event(" "); }

  // Test .verify_signature()
  env.generate_event("Calling verify_signature()");
  const ret_verify_signature = env.verify_signature(
    signature,
    message,
    public_key2
  );
  env.generate_event(
    "  > Ok: verify_signature() returns: " + ret_verify_signature.toString()
  );
  if (sandbox) {
    assert(
      ret_verify_signature === true,
      "verify signature returned false on a valid signature"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS SMART CONTRACT
  // EXECUTION HELPERS
  // ##############################

  // Test .generate_event()
  env.generate_event('Calling generate_event("message")');
  env.generate_event("message");
  env.generate_event('  > Ok: generate_event("message") called');
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_remaining_gas()
  env.generate_event("Calling get_remaining_gas()");
  const ret_remaining_gas = assert(
    env.get_remaining_gas(),
    "  > Error: get_remaining_gas() returned null"
  );
  const ret_remaining_gas_value = assert(
    ret_remaining_gas,
    "  > Error: get_remaining_gas().value returned null"
  );
  env.generate_event(
    "  > Ok: get_remaining_gas() returns: " + ret_remaining_gas_value.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_call_coins()
  env.generate_event("Calling get_call_coins()");
  const ret_get_call_coins = env.get_call_coins();
  env.generate_event(
    "  > Ok: get_call_coins() returns: mantissa: " +
      ret_get_call_coins.mantissa.toString() +
      ", scale: " +
      ret_get_call_coins.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .transfer_coins()
  env.generate_event("Calling transfer_coins(to_address, amount1, null)");
  env.transfer_coins(to_address, amount1, null);
  env.generate_event(
    "  > Ok: transfer_coins(to_address, amount1, null) called"
  );
  env.generate_event(
    "Calling transfer_coins(to_address, amount1, optional_address)"
  );
  env.transfer_coins(to_address, amount1, optional_address);
  env.generate_event(
    "  > Ok: transfer_coins(to_address, amount1, optional_address) called"
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .caller_has_write_access()
  env.generate_event("Calling caller_has_write_access()");
  const ret_caller_has_write_access = env.caller_has_write_access();
  env.generate_event("  > Ok: caller_has_write_access() returns: " + ret_caller_has_write_access.toString());
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_call_stack()
  env.generate_event("Calling get_call_stack()");
    const ret_get_call_stack = env.get_call_stack();
    env.generate_event("  > Ok: get_call_stack() returns: " + ret_get_call_stack.toString());
    if (!sandbox) { env.generate_event(" "); }

  // Test .get_owned_addresses()
  env.generate_event("Calling get_owned_addresses()");
    const ret_get_owned_addresses = env.get_owned_addresses();
    env.generate_event("  > Ok: get_owned_addresses() returns: " + ret_get_owned_addresses.toString());
    if (!sandbox) { env.generate_event(" "); }

  // Test .unsafe_random()
  env.generate_event("Calling unsafe_random()");
  const byteLength = 42;
  const ret_unsafe_random = env.unsafe_random(byteLength);
  env.generate_event("  > Ok: unsafe_random() returns: " + ret_unsafe_random.toString());
  if (sandbox) {
    assert(
      ret_unsafe_random.byteLength === byteLength,
      "unsafe_random() returned a buffer of the wrong size"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // Test .send_async_message()
  env.generate_event("Calling send_async_message()");
  let slot = new proto.Slot(0, 0);
  let async_message = new Uint8Array(0);
  let filter = new proto.SendAsyncMessageFilter("addr");
  env.send_async_message("addr", "func", slot, slot, 1_000_000, 0, 10, async_message, filter);
  env.generate_event("  > Ok: send_async_message() called");
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS DATASTORE
  // ##############################

  // Test .get_balance()
  env.generate_event("Calling get_balance(null)");
  const ret_get_balance_null = env.get_balance(null);
  env.generate_event(
    "  > Ok: get_balance(null) returns: mantissa: " +
      ret_get_balance_null.mantissa.toString() +
      ", scale: " +
      ret_get_balance_null.scale.toString()
  );
  env.generate_event("Calling get_balance(optional_address)");
  const ret_get_balance_optional_address = env.get_balance(optional_address);
  env.generate_event(
    "  > Ok: get_balance(optional_address) returns: mantissa: " +
      ret_get_balance_optional_address.mantissa.toString() +
      ", scale: " +
      ret_get_balance_optional_address.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .set_bytecode()
  env.generate_event("Calling set_bytecode(bytecode, null)");
  env.set_bytecode(bytecode, null);
  env.generate_event("  > Ok: set_bytecode(bytecode, null) called");
  env.generate_event("Calling set_bytecode(bytecode, optional_address)");
  env.set_bytecode(bytecode, optional_address);
  env.generate_event("  > Ok: set_bytecode(bytecode, optional_address) called");
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_bytecode()
  env.generate_event("Calling get_bytecode(null)");
  const ret_get_bytecode_null = env.get_bytecode(null);
  env.generate_event(
    "  > Ok: get_bytecode(null) returns: " + ret_get_bytecode_null.toString()
  );
  env.generate_event("Calling get_bytecode(optional_address)");
  const ret_get_bytecode_optional_address = env.get_bytecode(optional_address);
  env.generate_event(
    "  > Ok: get_bytecode(optional_address) returns: " +
      ret_get_bytecode_optional_address.toString()
  );
  // TODO: try to fix this test
  // We need for set_bytecode to succeed (not an UserAddress, but an address that has write access)
  /*if (sandbox) { 
    assert(
      ret_get_bytecode_optional_address.toString() === bytecode.toString(),
      "get_bytecode() did not returned the bytecode set with set_bytecode"
    );
  }*/
  if (!sandbox) { env.generate_event(" "); }

  // Test .set_ds_value()
  env.generate_event("Calling set_ds_value(key, data, null)");
  env.set_ds_value(key, data, null);
  env.generate_event("  > Ok: set_ds_value(key, data, null) called");
  env.generate_event("Calling set_ds_value(key, data, optional_address)");
  env.set_ds_value(key, data, optional_address);
  env.generate_event(
    "  > Ok: set_ds_value(key, data, optional_address) called"
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_ds_keys()
  env.generate_event("Calling get_ds_keys(prefix, null)");
  const ret_get_ds_keys_null = env.get_ds_keys(prefix, null);
  env.generate_event(
    "  > Ok: get_ds_keys(prefix, null) returns: " +
      ret_get_ds_keys_null.toString()
  );
  env.generate_event("Calling get_ds_keys(prefix, optional_address)");
  const ret_get_ds_keys_optional_address = env.get_ds_keys(
    prefix,
    optional_address
  );
  env.generate_event(
    "  > Ok: get_ds_keys(prefix, optional_address) returns: " +
      ret_get_ds_keys_optional_address.toString()
  );
  if (sandbox) {
    let in_array = false;
    for (let i = 0; i < ret_get_ds_keys_optional_address.length; i++) {
      in_array = in_array || (ret_get_ds_keys_optional_address[i].toString() === key.toString());
    }
    assert(
      in_array,
      "get_ds_keys() did not include the key set with set_ds_value"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_ds_value()
  env.generate_event("Calling get_ds_value(key, null)");
  const ret_get_ds_value_null = env.get_ds_value(key, null);
  env.generate_event(
    "  > Ok: get_ds_value(key, null) returns: " +
      ret_get_ds_value_null.toString()
  );
  env.generate_event("Calling get_ds_value(key, optional_address)");
  const ret_get_ds_value_optional_address = env.get_ds_value(
    key,
    optional_address
  );
  env.generate_event(
    "  > Ok: get_ds_value(key, optional_address) returns: " +
      ret_get_ds_value_optional_address.toString()
  );
  if (sandbox) { 
    assert(
      ret_get_ds_value_optional_address.toString() === data.toString(),
      "get_ds_value() did not return the value set with set_ds_value"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // Test .ds_entry_exists()
  env.generate_event("Calling ds_entry_exists(key, null)");
  const ret_ds_entry_exists_null = env.ds_entry_exists(key, null);
  env.generate_event(
    "  > Ok: ds_entry_exists(key, null) returns: " +
      ret_ds_entry_exists_null.toString()
  );
  env.generate_event("Calling ds_entry_exists(key, optional_address)");
  const ret_ds_entry_exists_optional_address = env.ds_entry_exists(
    key,
    optional_address
  );
  env.generate_event(
    "  > Ok: ds_entry_exists(key, optional_address) returns: " +
      ret_ds_entry_exists_optional_address.toString()
  );
  if (sandbox) { 
    assert(
      ret_ds_entry_exists_optional_address === true,
      "ds_entry_exists() did not return true with the key set with set_ds_value()"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // Test .delete_ds_entry()
  env.generate_event("Calling delete_ds_entry(key, null)");
  env.delete_ds_entry(key, null);
  env.generate_event("  > Ok: delete_ds_entry(key, null) called");
  env.generate_event("Calling delete_ds_entry(key, optional_address)");
  env.delete_ds_entry(key, optional_address);
  env.generate_event("  > Ok: delete_ds_entry(key, optional_address) called");
  if (!sandbox) { env.generate_event(" "); }

  // Test .append_ds_value()
  env.generate_event("Calling append_ds_value(key, data, null)");
  env.append_ds_value(key, data, null);
  env.generate_event("  > Ok: append_ds_value(key, data, null) called");
  env.generate_event("Calling append_ds_value(key, data, optional_address)");
  env.append_ds_value(key, data, optional_address);
  env.generate_event(
    "  > Ok: append_ds_value(key, data, optional_address) called"
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TEST OP DATASTORE
  // ##############################

  // Test .get_op_keys()
  env.generate_event("Calling get_op_keys(prefix)");
  const ret_get_op_keys = env.get_op_keys(prefix);
  env.generate_event(
    "  > Ok: get_op_keys(prefix) returns: " + ret_get_op_keys.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .has_op_key()
  env.generate_event("Calling has_op_key(key)");
  const ret_has_op_key = env.op_entry_exists(key);
  env.generate_event(
    "  > Ok: has_op_key(key) returns: " + ret_has_op_key.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_op_data()
  if (env.op_entry_exists(key)) {
    env.generate_event("Calling get_op_data(key)");
    const ret_get_op_data = env.get_op_data(key);
    env.generate_event(
      "  > Ok: get_op_data(key) returns: " + ret_get_op_data.toString()
    );
    if (!sandbox) { env.generate_event(" "); }
  } else {
    env.generate_event(
      "Can't call Calling get_op_data(key), because has_op_key(key) returns false"
    );
    if (!sandbox) { env.generate_event(" "); }
  }

  // ##############################
  // TESTS HASHES / SIGNATURES
  // ##############################

  // Test .hash_keccak256()
  env.generate_event("Calling hash_keccak256(data)");
  const ret_hash_keccak256 = env.hash_keccak256(data);
  env.generate_event(
    "  > Ok: hash_keccak256(data) returns: " + ret_hash_keccak256.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .hash_sha256()
  env.generate_event("Calling hash_sha256(data)");
  const ret_hash_sha256 = env.hash_sha256(data);
  env.generate_event(
    "  > Ok: hash_sha256(data) returns: " + ret_hash_sha256.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .hash_blake3()
  env.generate_event("Calling hash_blake3(data)");
  const ret_hash_blake3 = env.hash_blake3(data);
  env.generate_event(
    "  > Ok: hash_blake3(data) returns: " + ret_hash_blake3.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .evm_verify_signature()
  env.generate_event("Calling evm_verify_signature()");
  const ret_evm_verify_signature = env.evm_verify_signature(evm_message, evm_signature, evm_public_key);
  env.generate_event("  > Ok: evm_verify_signature returns: " + ret_evm_verify_signature.toString());
  if (sandbox) { 
    assert(
      ret_evm_verify_signature === true,
      "evm_verify_signature() did not return true with a valid evm signature"
    );
  }
  if (!sandbox) { env.generate_event(" "); }

  // Test .evm_get_pubkey_from_signature()
  env.generate_event("Calling evm_get_pubkey_from_signature(evm_hash, evm_signature)");
  const ret_evm_get_pubkey_from_signature = env.evm_get_pubkey_from_signature(evm_hash, evm_signature);
  env.generate_event("  > Ok: evm_get_pubkey_from_signature returns: " + ret_evm_get_pubkey_from_signature.toString());
  if (!sandbox) { env.generate_event(" "); }
  
  // Test .evm_get_address_from_pubkey()
  env.generate_event("Calling evm_get_address_from_pubkey(evm_public_key)");
  const ret_evm_get_address_from_pubkey = env.evm_get_address_from_pubkey(evm_public_key);
  env.generate_event("  > Ok: evm_evm_get_address_from_pubkey returns: " + ret_evm_get_address_from_pubkey.toString());
  if (!sandbox) { env.generate_event(" "); }

  // Test .is_address_eoa()
  env.generate_event("Calling is_address_eoa()");
  const ret_is_address_eoa = env.is_address_eoa(address);
  env.generate_event("  > Ok: is_address_eoa returns: " + ret_is_address_eoa.toString());
  if (!sandbox) { env.generate_event(" "); }

  // Test .address_from_public_key()
  env.generate_event("Calling address_from_public_key(public_key)");
  const ret_address_from_public_key = env.address_from_public_key(public_key);
  env.generate_event(
    "  > Ok: address_from_public_key(public_key) returns: " +
      ret_address_from_public_key.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS SLOT / TIME GETTERS
  // ##############################

  // Test .get_current_slot()
  env.generate_event("Calling get_current_slot()");
  const ret_get_current_slot = env.get_current_slot();
  env.generate_event(
    "  > Ok: get_current_slot() returns: period: " +
      ret_get_current_slot.period.toString() +
      ", thread: " +
      ret_get_current_slot.thread.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_native_time()
  env.generate_event("Calling get_native_time()");
  const ret_get_native_time = env.get_native_time();
  env.generate_event(
    "  > Ok: get_native_time() returns: milliseconds: " +
      ret_get_native_time.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS NATIVE_AMOUNT_ARITHMETIC
  // ##############################

  // Test .check_native_amount()
  env.generate_event("Calling check_native_amount(amount1)");
  const ret_check_native_amount = env.check_native_amount(amount1);
  env.generate_event(
    "  > Ok: check_native_amount(amount1) returns: " +
      ret_check_native_amount.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .add_native_amount()
  env.generate_event("Calling add_native_amount(amount1, amount2)");
  const ret_add_native_amount = env.add_native_amount(amount1, amount2);
  env.generate_event(
    "  > Ok: add_native_amount(amount1, amount2) returns: mantissa: " +
      ret_add_native_amount.mantissa.toString() +
      ", scale: " +
      ret_add_native_amount.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .sub_native_amount()
  env.generate_event("Calling sub_native_amount(amount1, amount2)");
  const ret_sub_native_amount = env.sub_native_amount(amount1, amount2);
  env.generate_event(
    "  > Ok: sub_native_amount(amount1, amount2) returns: mantissa: " +
      ret_sub_native_amount.mantissa.toString() +
      ", scale: " +
      ret_sub_native_amount.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .scalar_mul_native_amount()
  env.generate_event("Calling scalar_mul_native_amount(amount1, coefficient)");
  const ret_scalar_mul_native_amount = env.scalar_mul_native_amount(
    amount1,
    coefficient
  );
  env.generate_event(
    "  > Ok: scalar_mul_native_amount(amount1, coefficient) returns: mantissa: " +
      ret_scalar_mul_native_amount.mantissa.toString() +
      ", scale: " +
      ret_scalar_mul_native_amount.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .div_rem_native_amount()
  {
    env.generate_event("Calling div_rem_native_amount(amount1, divisor)");
    const scalar_ret_div_rem_native_amount = env.scalar_div_rem_native_amount(
      amount1,
      divisor
    );
    assert(
      scalar_ret_div_rem_native_amount.length == 2,
      "  > Error: div_rem_native_amount(amount1, divisor) should return a 2 element array"
    );
    const ret_div_rem_native_amount_quotient =
      scalar_ret_div_rem_native_amount.at(0);
    const ret_div_rem_native_amount_remainder =
      scalar_ret_div_rem_native_amount.at(1);
    env.generate_event(
      "  > Ok: div_rem_native_amount(amount1, divisor) returns: quotient.mantissa: " +
        ret_div_rem_native_amount_quotient.mantissa.toString() +
        ", quotient.scale: " +
        ret_div_rem_native_amount_quotient.scale.toString() +
        ", remainder.mantissa: " +
        ret_div_rem_native_amount_remainder.mantissa.toString() +
        ", remainder.scale: " +
        ret_div_rem_native_amount_remainder.scale.toString()
    );
    if (!sandbox) { env.generate_event(" "); }
  }

  // Test .div_rem_native_amount()
  env.generate_event("Calling div_rem_native_amount(amount1, amount2)");
  const ret_div_rem_native_amount = env.div_rem_native_amount(amount1, amount2);
  const ret_div_rem_native_amount_remainder =
    ret_div_rem_native_amount.remainder;
  env.generate_event(
    "  > Ok: div_rem_native_amount(amount1, amount2) returns: quotient: " +
      ret_div_rem_native_amount.quotient.toString() +
      ", remainder.mantissa: " +
      ret_div_rem_native_amount_remainder.mantissa.toString() +
      ", remainder.scale: " +
      ret_div_rem_native_amount_remainder.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .native_amount_to_string()
  env.generate_event("Calling native_amount_to_string(amount1)");
  const ret_native_amount_to_string = env.native_amount_to_string(amount1);
  env.generate_event(
    "  > Ok: native_amount_to_string(amount1) returns: " +
      ret_native_amount_to_string.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .native_amount_from_string()
  env.generate_event("Calling native_amount_from_string(str_amount)");
  const ret_native_amount_from_string =
    env.native_amount_from_string(str_amount);
  env.generate_event(
    "  > Ok: native_amount_from_string(str_amount) returns: mantissa: " +
      ret_native_amount_from_string.mantissa.toString() +
      ", scale: " +
      ret_native_amount_from_string.scale.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS TO FROM BS58
  // ##############################

  const buf = new Uint8Array(4);
  buf[0] = 0x31;
  buf[1] = 0x32;
  buf[2] = 0x33;
  buf[3] = 0x34;

  const hash_blake3 = env.hash_blake3(buf);
  const bs58_hash = env.bytes_to_base58_check(hash_blake3);
  const hash_form_bs58 = env.base58_check_to_bytes(bs58_hash);

  env.generate_event("hash_blake3: " + hash_blake3.toString());
  env.generate_event("bs58_hash: " + bs58_hash);
  env.generate_event("hash_form_bs58: " + hash_form_bs58.toString());

  if (sandbox) {
    assert(
      hash_blake3.toString() === hash_form_bs58.toString(),
      "encode to base58 -> decode from base58 changed data"
    );
  }

  // ##############################
  // TESTS STRUCTS CHECKS AND GET VERSIONS
  // ##############################

  // Test .check_address()
  env.generate_event("Calling check_address(address)");
  const res_check_address = env.check_address(address);
  env.generate_event(
    "  > Ok: check_address(address) returns: " + res_check_address.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .check_pubkey()
  env.generate_event("Calling check_pubkey(public_key)");
  const res_check_pubkey = env.check_pubkey(public_key);
  env.generate_event("result: " + res_check_pubkey.toString());
  env.generate_event(
    "  > Ok: check_pubkey(public_key) returns: " + res_check_pubkey.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .check_signature()
  env.generate_event("Calling check_signature(signature)");
  const res_check_signature = env.check_signature(signature);
  env.generate_event("result: " + res_check_signature.toString());
  env.generate_event(
    "  > Ok: check_signature(signature) returns: " +
      res_check_signature.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_address_category()
  env.generate_event("Calling get_address_category(address)");
  const res_get_address_category = env.get_address_category(address);
  env.generate_event("result: " + res_get_address_category.toString());
  env.generate_event(
    "  > Ok: get_address_category(address) returns: " +
      res_get_address_category.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_address_version()
  env.generate_event("Calling get_address_version(address)");
  const res_get_address_version = env.get_address_version(address);
  env.generate_event("result: " + res_get_address_version.toString());
  env.generate_event(
    "  > Ok: get_address_version(address) returns: " +
      res_get_address_version.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_pubkey_version()
  env.generate_event("Calling get_pubkey_version(public_key)");
  const res_get_pubkey_version = env.get_pubkey_version(public_key);
  env.generate_event("result: " + res_get_pubkey_version.toString());
  env.generate_event(
    "  > Ok: get_pubkey_version(public_key) returns: " +
      res_get_pubkey_version.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .get_signature_version()
  env.generate_event("Calling get_signature_version(signature)");
  const res_get_signature_version = env.get_signature_version(signature);
  env.generate_event("result: " + res_get_signature_version.toString());
  env.generate_event(
    "  > Ok: get_signature_version(signature) returns: " +
      res_get_signature_version.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS NATIVE TIME ARITHMETICS
  // ##############################

  // Test .checked_add_native_time()
  env.generate_event("Calling checked_add_native_time(time1, time2)");
  const ret_checked_add_native_time = env.checked_add_native_time(time1, time2);
  env.generate_event(
    "  > Ok: checked_add_native_time(time1, time2) returns: milliseconds: " +
      ret_checked_add_native_time.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .checked_sub_native_time()
  env.generate_event("Calling checked_sub_native_time(time1, time2)");
  const ret_checked_sub_native_time = env.checked_sub_native_time(time1, time2);
  env.generate_event(
    "  > Ok: checked_sub_native_time(time1, time2) returns: milliseconds: " +
      ret_checked_sub_native_time.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .checked_mul_native_time()
  env.generate_event("Calling checked_mul_native_time(time1, coefficient)");
  const ret_checked_mul_native_time = env.checked_mul_native_time(
    time1,
    coefficient
  );
  env.generate_event(
    "  > Ok: checked_mul_native_time(time1, coefficient) returns: milliseconds: " +
      ret_checked_mul_native_time.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .checked_scalar_div_native_time()
  env.generate_event("Calling checked_scalar_div_native_time(time1, divisor)");
  const ret_checked_scalar_div_native_time = env.checked_scalar_div_native_time(
    time1,
    divisor
  );
  assert(
    ret_checked_scalar_div_native_time.length == 2,
    "  > Error: checked_scalar_div_native_time(time1, divisor) should return a 2 element array"
  );
  const ret_checked_scalar_div_native_time_quotient =
    ret_checked_scalar_div_native_time.at(0);
  const ret_checked_scalar_div_native_time_remainder =
    ret_checked_scalar_div_native_time.at(1);
  env.generate_event(
    "  > Ok: checked_scalar_div_native_time(time1, divisor) returns: quotient.milliseconds: " +
      ret_checked_scalar_div_native_time_quotient.milliseconds.toString() +
      ", remainder.milliseconds: " +
      ret_checked_scalar_div_native_time_remainder.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // Test .checked_div_native_time()
  env.generate_event("Calling checked_div_native_time(time1, time2)");
  const ret_checked_div_native_time = env.checked_div_native_time(time1, time2);
  const ret_checked_div_native_time_remainder =
    ret_checked_div_native_time.remainder;
  env.generate_event(
    "  > Ok: checked_div_native_time(time1, time2) returns: quotient: " +
      ret_checked_div_native_time.quotient.toString() +
      ", remainder.milliseconds: " +
      ret_checked_div_native_time_remainder.milliseconds.toString()
  );
  if (!sandbox) { env.generate_event(" "); }

  // ##############################
  // TESTS COMPARISONS ABIS
  // ##############################

  // address
  {
    const cmp_res = env.compare_address(to_address, to_address);
    env.generate_event("compare_address: " + cmp_res.toString());
    assert(
      cmp_res == proto.ComparisonResult.COMPARISON_RESULT_EQUAL,
      "  > Error: compare_address(to_address, to_address) should return EQUAL"
    );

    const cmp_res1 = env.compare_address(to_address, optional_address);
    env.generate_event(
      "compare_address(to_address, optional_address):" + cmp_res1.toString()
    );

    const cmp_res2 = env.compare_address(optional_address, to_address);
    env.generate_event(
      "compare_address(optional_address, to_address):" + cmp_res2.toString()
    );

    if (cmp_res1 == proto.ComparisonResult.COMPARISON_RESULT_LOWER) {
      assert(
        cmp_res2 == proto.ComparisonResult.COMPARISON_RESULT_GREATER,
        "  > Error: compare_address(optional_address, to_address) should return GREATER"
      );
    } else if (cmp_res1 == proto.ComparisonResult.COMPARISON_RESULT_GREATER) {
      assert(
        cmp_res2 == proto.ComparisonResult.COMPARISON_RESULT_LOWER,
        "  > Error: compare_address(optional_address, to_address) should return LOWER"
      );
    } else {
      assert(
        cmp_res1 == cmp_res2,
        "  > Error: compare_address(optional_address, to_address) should return EQUAL"
      );
    }
  }

  //amount
  {
    const amount1 = env.native_amount_from_string("1");
    const amount2 = env.native_amount_from_string("2");
    env.generate_event("do some compare with amount1 = 1" + ", amount2 = 2");
    {
      const cmp_res = env.compare_native_amount(amount1, amount1);
      env.generate_event(
        "compare_native_amount(amount1, amount1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_EQUAL,
        "  > Error: compare_native_amount(amount1, amount1) should return EQUAL"
      );
    }
    {
      const cmp_res = env.compare_native_amount(amount1, amount2);
      env.generate_event(
        "compare_native_amount(amount1, amount2): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_LOWER,
        "  > Error: compare_native_amount(amount1, amount2) should return LOWER"
      );
    }
    {
      const cmp_res = env.compare_native_amount(amount2, amount1);
      env.generate_event(
        "compare_native_amount(amount2, amount1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_GREATER,
        "  > Error: compare_native_amount(amount2, amount1) should return GREATER"
      );
    }
  }

  //time
  {
    const time1 = env.get_native_time();
    const time2 = env.checked_add_native_time(time1, time1);
    env.generate_event(
      "do some compare with time1 = " +
        time1.milliseconds.toString() +
        ", time2 = " +
        time2.milliseconds.toString()
    );
    {
      const cmp_res = env.compare_native_time(time1, time1);
      env.generate_event(
        "compare_native_time(time1, time1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_EQUAL,
        "  > Error: compare_native_time(time1, time1) should return EQUAL"
      );
    }
    {
      const cmp_res = env.compare_native_time(time1, time2);
      env.generate_event(
        "compare_native_time(time1, time2): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_LOWER,
        "  > Error: compare_native_time(time1, time2) should return LOWER"
      );
    }
    {
      const cmp_res = env.compare_native_time(time2, time1);
      env.generate_event(
        "compare_native_time(time2, time1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_GREATER,
        "  > Error: compare_native_time(time2, time1) should return GREATER"
      );
    }
  }

  //pub_key
  {
    const pub_key1 = public_key;
    const pub_key2 = public_key2;
    env.generate_event(
      "do some compare with pub_key1 = " +
        pub_key1 +
        ", pub_key2 = " +
        pub_key2
    );
    {
      const cmp_res = env.compare_pub_key(pub_key1, pub_key1);
      env.generate_event(
        "compare_pub_key(pub_key1, pub_key1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_EQUAL,
        "  > Error: compare_pub_key(pub_key1, pub_key1) should return EQUAL"
      );
    }
    {
      const cmp_res = env.compare_pub_key(pub_key1, pub_key2);
      env.generate_event(
        "compare_pub_key(pub_key1, pub_key2): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_GREATER,
        "  > Error: compare_pub_key(pub_key1, pub_key2) should return GREATER"
      );
    }
    {
      const cmp_res = env.compare_pub_key(pub_key2, pub_key1);
      env.generate_event(
        "compare_pub_key(pub_key2, pub_key1): " + cmp_res.toString()
      );
      assert(
        cmp_res == proto.ComparisonResult.COMPARISON_RESULT_LOWER,
        "  > Error: compare_pub_key(pub_key2, pub_key1) should return LOWER"
      );
    }
  }

  // ##############################
  // END TESTS
  // ##############################

  return encode_result(new Uint8Array(0));
}
