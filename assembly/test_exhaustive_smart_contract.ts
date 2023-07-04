import { UInt64Value } from "massa-proto-as/assembly/google/protobuf/UInt64Value";
import * as env from "./env";
import * as proto from "massa-proto-as/assembly";
import { UInt32Value } from "massa-proto-as/assembly/google/protobuf/UInt32Value";

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

    // Define all the argument values:
    const optional_address = "optional_abcd";
    const to_address = "to_abcd";
    const sc_address = "sc_abcd";
    const public_key = "pub_key";
    const bytecode = new Uint8Array(1);
    bytecode[0] = 11;
    const arg = new Uint8Array(1);
    arg[0] = 22;
    const prefix = new Uint8Array(1);
    prefix[0] = 33;
    const key = new Uint8Array(1);
    key[0] = 44;
    const data = new Uint8Array(1);
    data[0] = 55;
    const amount1 = env.make_native_amount(100, 0);
    const amount2 = env.make_native_amount(100, 0);
    const str_amount = "1";
    const coefficient = 2;
    const divisor = 2;
    const empty_array = new Uint8Array(0);

    env.generate_event("Starting tests of wasmv1 ABIs");
    env.generate_event(" ");

    // ##############################
    // TESTS SMART CONTRACT
    // EXECUTION HELPERS
    // ##############################

    // Test .generate_event()
    env.generate_event("Calling generate_event(\"message\")");
    env.generate_event("message");
    env.generate_event("  > Ok: generate_event(\"message\") called");
    env.generate_event(" ");

    // Test .create_sc()
    env.generate_event("Calling create_sc(bytecode)");
    const ret_create_sc = env.create_sc(bytecode);
    env.generate_event("  > Ok: create_sc(bytecode) returns: " + ret_create_sc);
    env.generate_event(" ");

    // Test .get_remaining_gas()
    env.generate_event("Calling get_remaining_gas()");
    const ret_remaining_gas = assert(env.get_remaining_gas(), "  > Error: get_remaining_gas() returned null");
    const ret_remaining_gas_value = assert(ret_remaining_gas, "  > Error: get_remaining_gas().value returned null");
    env.generate_event("  > Ok: get_remaining_gas() returns: " + ret_remaining_gas_value.toString());
    env.generate_event(" ");

    // Test .get_call_coins()
    env.generate_event("Calling get_call_coins()");
    const ret_get_call_coins = env.get_call_coins();
    const ret_get_call_coins_mantissa = assert(ret_get_call_coins.mantissa, "  > Error: get_call_coins(null).scale returned null");
    const ret_get_call_coins_scale = assert(ret_get_call_coins.scale, "  > Error: get_call_coins(null).scale returned null");
    env.generate_event(
        "  > Ok: get_call_coins() returns: mantissa: " +
        ret_get_call_coins_mantissa.toString() +
        ", scale: " +
        ret_get_call_coins_scale.toString()
    );
    env.generate_event(" ");

    // Test .transfer_coins()
    env.generate_event("Calling transfer_coins(to_address, amount1, null)");
    env.transfer_coins(to_address, amount1, null);
    env.generate_event("  > Ok: transfer_coins(to_address, amount1, null) called");
    env.generate_event("Calling transfer_coins(to_address, amount1, optional_address)");
    env.transfer_coins(to_address, amount1, optional_address);
    env.generate_event("  > Ok: transfer_coins(to_address, amount1, optional_address) called");
    env.generate_event(" ");

    // Test .caller_has_write_access()
    // env.generate_event("Calling caller_has_write_access()");
    // const ret_caller_has_write_access = env.caller_has_write_access();
    // env.generate_event("  > Ok: caller_has_write_access() returns: " + ret_caller_has_write_access.toString());
    // env.generate_event(" ");

    // Test .get_call_stack()
    env.generate_event("Calling get_call_stack()");
    const ret_get_call_stack = env.get_call_stack();
    env.generate_event("  > Ok: get_call_stack() returns: " + ret_get_call_stack.toString());
    env.generate_event(" ");

    // Test .get_owned_addresses()
    env.generate_event("Calling get_owned_addresses()");
    const ret_get_owned_addresses = env.get_owned_addresses();
    env.generate_event("  > Ok: get_owned_addresses() returns: " + ret_get_owned_addresses.toString());
    env.generate_event(" ");

    // Test .call()
    // TODO
    /*env.generate_event("Calling call(sc_address, \"func\", arg, amount1)");
    const ret_call = env.call(sc_address, "func", arg, amount1);
    env.generate_event("  > Ok: call(sc_address, \"func\", arg, amount1) returns: " + ret_call.toString());
    env.generate_event(" ");*/

    // Test .local_call()
    // TODO
    /*env.generate_event("Calling local_call(sc_address, \"func\", arg, amount1)");
    const ret_local_call = env.local_call(sc_address, "func", arg, amount1);
    env.generate_event("  > Ok: local_call(sc_address, \"func\", arg, amount1) returns: " + ret_local_call.toString());
    env.generate_event(" ");*/

    // Test .local_execution()
    // THOMAS TODO
    // env.generate_event("Calling local_execution()");
    // env.local_execution(bytecode, "function_name", empty_array);
    // env.generate_event("  > Ok: local_execution() called");
    // env.generate_event(" ");

    // Test .unsafe_random()
    env.generate_event("Calling unsafe_random()");
    const ret_unsafe_random = env.unsafe_random(42);
    env.generate_event("  > Ok: unsafe_random() returns: " + ret_unsafe_random.toString());
    env.generate_event(" ");

    // Test .send_async_message()
    env.generate_event("Calling send_async_message()");
    let slot = new proto.Slot(0, 0);
    let message = new Uint8Array(0);
    let filter = new proto.SendAsyncMessageFilter("addr");
    env.send_async_message("addr", "func", slot, slot, 1_000_000, 0, 10, message, filter);
    env.generate_event("  > Ok: send_async_message() called");
    env.generate_event(" ");

    // ##############################
    // TESTS DATASTORE
    // ##############################

    // Test .get_balance()
    env.generate_event("Calling get_balance(null)");
    const ret_get_balance_null = env.get_balance(null);
    const ret_get_balance_null_mantissa = assert(ret_get_balance_null.mantissa, "  > Error: get_balance(null).scale returned null");
    const ret_get_balance_null_scale = assert(ret_get_balance_null.scale, "  > Error: get_balance(null).scale returned null");
    env.generate_event(
        "  > Ok: get_balance(null) returns: mantissa: " +
        ret_get_balance_null_mantissa.toString() +
        ", scale: " +
        ret_get_balance_null_scale.toString()
    );
    env.generate_event("Calling get_balance(optional_address)");
    const ret_get_balance_optional_address = env.get_balance(optional_address);
    const ret_get_balance_optional_address_mantissa = assert(ret_get_balance_optional_address.mantissa, "  > Error: get_balance(optional_address).scale returned null");
    const ret_get_balance_optional_address_scale = assert(ret_get_balance_optional_address.scale, "  > Error: get_balance(optional_address).scale returned null");
    env.generate_event(
        "  > Ok: get_balance(optional_address) returns: mantissa: " +
        ret_get_balance_optional_address_mantissa.toString() +
        ", scale: " +
        ret_get_balance_optional_address_scale.toString()
    );
    env.generate_event(" ");

    // Test .get_bytecode()
    env.generate_event("Calling get_bytecode(null)");
    const ret_get_bytecode_null = env.get_bytecode(null);
    env.generate_event("  > Ok: get_bytecode(null) returns: " + ret_get_bytecode_null.toString());
    env.generate_event("Calling get_bytecode(optional_address)");
    const ret_get_bytecode_optional_address = env.get_bytecode(optional_address);
    env.generate_event("  > Ok: get_bytecode(optional_address) returns: " + ret_get_bytecode_optional_address.toString());
    env.generate_event(" ");

    // Test .set_bytecode()
    env.generate_event("Calling set_bytecode(bytecode, null)");
    env.set_bytecode(bytecode, null);
    env.generate_event("  > Ok: set_bytecode(bytecode, null) called");
    env.generate_event("Calling set_bytecode(bytecode, optional_address)");
    env.set_bytecode(bytecode, optional_address);
    env.generate_event("  > Ok: set_bytecode(bytecode, optional_address) called");
    env.generate_event(" ");

    // Test .get_keys()
    env.generate_event("Calling get_keys(prefix, null)");
    const ret_get_keys_null = env.get_keys(prefix, null);
    env.generate_event("  > Ok: get_keys(prefix, null) returns: " + ret_get_keys_null.toString());
    env.generate_event("Calling get_keys(prefix, optional_address)");
    const ret_get_keys_optional_address = env.get_keys(prefix, optional_address);
    env.generate_event("  > Ok: get_keys(prefix, optional_address) returns: " + ret_get_keys_optional_address.toString());
    env.generate_event(" ");

    // Test .get_data()
    env.generate_event("Calling get_data(key, null)");
    const ret_get_data_null = env.get_data(key, null);
    env.generate_event("  > Ok: get_data(key, null) returns: " + ret_get_data_null.toString());
    env.generate_event("Calling get_data(key, optional_address)");
    const ret_get_data_optional_address = env.get_data(key, optional_address);
    env.generate_event("  > Ok: get_data(key, optional_address) returns: " + ret_get_data_optional_address.toString());
    env.generate_event(" ");

    // Test .set_data()
    env.generate_event("Calling set_data(key, data, null)");
    env.set_data(key, data, null);
    env.generate_event("  > Ok: set_data(key, data, null) called");
    env.generate_event("Calling set_data(key, data, optional_address)");
    env.set_data(key, data, optional_address);
    env.generate_event("  > Ok: set_data(key, data, optional_address) called");
    env.generate_event(" ");

    // Test .delete_data()
    env.generate_event("Calling delete_data(key, null)");
    env.delete_data(key, null);
    env.generate_event("  > Ok: delete_data(key, null) called");
    env.generate_event("Calling delete_data(key, optional_address)");
    env.delete_data(key, optional_address);
    env.generate_event("  > Ok: delete_data(key, optional_address) called");
    env.generate_event(" ");

    // Test .append_data()
    env.generate_event("Calling append_data(key, data, null)");
    env.append_data(key, data, null);
    env.generate_event("  > Ok: append_data(key, data, null) called");
    env.generate_event("Calling append_data(key, data, optional_address)");
    env.append_data(key, data, optional_address);
    env.generate_event("  > Ok: append_data(key, data, optional_address) called");
    env.generate_event(" ");

    // Test .has_data()
    env.generate_event("Calling has_data(key, null)");
    const ret_has_data_null = env.has_data(key, null);
    env.generate_event("  > Ok: has_data(key, null) returns: " + ret_has_data_null.toString());
    env.generate_event("Calling has_data(key, optional_address)");
    const ret_has_data_optional_address = env.has_data(key, optional_address);
    env.generate_event("  > Ok: has_data(key, optional_address) returns: " + ret_has_data_optional_address.toString());
    env.generate_event(" ");

    // ##############################
    // TEST OP DATASTORE
    // ##############################

    // Test .get_op_keys()
    env.generate_event("Calling get_op_keys(prefix)");
    const ret_get_op_keys = env.get_op_keys(prefix);
    env.generate_event("  > Ok: get_op_keys(prefix) returns: " + ret_get_op_keys.toString());
    env.generate_event(" ");

    // Test .get_op_data()
    env.generate_event("Calling get_op_data(key)");
    const ret_get_op_data = env.get_op_data(key);
    env.generate_event("  > Ok: get_op_data(key) returns: " + ret_get_op_data.toString());
    env.generate_event(" ");

    // Test .has_op_key()
    env.generate_event("Calling has_op_key(key)");
    const ret_has_op_key = env.has_op_key(key);
    env.generate_event("  > Ok: has_op_key(key) returns: " + ret_has_op_key.toString());
    env.generate_event(" ");

    // ##############################
    // TESTS HASHES / SIGNATURES
    // ##############################

    // Test .hash_keccak256()
    env.generate_event("Calling hash_keccak256(data)");
    const ret_hash_keccak256 = env.hash_keccak256(data);
    env.generate_event("  > Ok: hash_keccak256(data) returns: " + ret_hash_keccak256.toString());
    env.generate_event(" ");

    // Test .hash_sha256()
    env.generate_event("Calling hash_sha256(data)");
    const ret_hash_sha256 = env.hash_sha256(data);
    env.generate_event("  > Ok: hash_sha256(data) returns: " + ret_hash_sha256.toString());
    env.generate_event(" ");

    // Test .blake3_hash()
    env.generate_event("Calling blake3_hash(data)");
    const ret_blake3_hash = env.blake3_hash(data);
    env.generate_event("  > Ok: blake3_hash(data) returns: " + ret_blake3_hash.toString());
    env.generate_event(" ");

    // Test .verify_evm_signature()
    // THOMAS TODO
    // env.generate_event("Calling verify_evm_signature()");
    // const ret_verify_evm_signature = env.verify_evm_signature(empty_array, empty_array, empty_array);
    // env.generate_event("  > Ok: verify_evm_signaturereturns: " + ret_verify_evm_signature.toString());
    // env.generate_event(" ");

    // Test .address_from_public_key()
    // TODO
    env.generate_event("Calling address_from_public_key(public_key)");
    const ret_address_from_public_key = env.address_from_public_key(public_key);
    env.generate_event("  > Ok: address_from_public_key(public_key) returns: " + ret_address_from_public_key.toString());
    env.generate_event(" ");

    // ##############################
    // TESTS SLOT / TIME GETTERS
    // ##############################

    // Test .get_current_slot()
    env.generate_event("Calling get_current_slot()");
    const ret_get_current_slot = env.get_current_slot();
    env.generate_event("  > Ok: get_current_slot() returns: period: " +
        ret_get_current_slot.period.toString() +
        ", thread: " +
        ret_get_current_slot.thread.toString());
    env.generate_event(" ");

    // Test .get_native_time()
    env.generate_event("Calling get_native_time()");
    const ret_get_native_time = env.get_native_time();
    env.generate_event("  > Ok: get_native_time() returns: milliseconds: " + ret_get_native_time.milliseconds.toString());
    env.generate_event(" ");

    // ##############################
    // TESTS NATIVE_AMOUNT_ARITHMETIC
    // ##############################

    // Test .check_native_amount()
    env.generate_event("Calling check_native_amount(amount1)");
    const ret_check_native_amount = env.check_native_amount(amount1);
    env.generate_event("  > Ok: check_native_amount(amount1) returns: " + ret_check_native_amount.toString());
    env.generate_event(" ");

    // Test .add_native_amounts()
    env.generate_event("Calling add_native_amounts(amount1, amount2)");
    const ret_add_native_amounts = env.add_native_amounts(amount1, amount2);
    const ret_add_native_amounts_mantissa = assert(ret_add_native_amounts.mantissa, "  > Error: check_native_amount(amount1, amount2).scale returned null");
    const ret_add_native_amounts_scale = assert(ret_add_native_amounts.scale, "  > Error: check_native_amount(amount1, amount2).scale returned null");
    env.generate_event(
        "  > Ok: add_native_amounts(amount1, amount2) returns: mantissa: " +
        ret_add_native_amounts_mantissa.toString() +
        ", scale: " +
        ret_add_native_amounts_scale.toString()
    );
    env.generate_event(" ");

    // Test .sub_native_amounts()
    env.generate_event("Calling sub_native_amounts(amount1, amount2)");
    const ret_sub_native_amounts = env.sub_native_amounts(amount1, amount2);
    const ret_sub_native_amounts_mantissa = assert(ret_sub_native_amounts.mantissa, "  > Error: sub_native_amounts(amount1, amount2).scale returned null");
    const ret_sub_native_amounts_scale = assert(ret_sub_native_amounts.scale, "  > Error: sub_native_amounts(amount1, amount2).scale returned null");
    env.generate_event(
        "  > Ok: sub_native_amounts(amount1, amount2) returns: mantissa: " +
        ret_sub_native_amounts_mantissa.toString() +
        ", scale: " +
        ret_sub_native_amounts_scale.toString()
    );
    env.generate_event(" ");

    // Test .mul_native_amount()
    env.generate_event("Calling mul_native_amount(amount1, coefficient)");
    const ret_mul_native_amount = env.mul_native_amount(amount1, coefficient);
    const ret_mul_native_amount_mantissa = assert(ret_mul_native_amount.mantissa, "  > Error: mul_native_amount(amount1, coefficient).scale returned null");
    const ret_mul_native_amount_scale = assert(ret_mul_native_amount.scale, "  > Error: mul_native_amount(amount1, coefficient).scale returned null");
    env.generate_event(
        "  > Ok: mul_native_amount(amount1, coefficient) returns: mantissa: " +
        ret_mul_native_amount_mantissa.toString() +
        ", scale: " +
        ret_mul_native_amount_scale.toString()
    );
    env.generate_event(" ");

    // Test .div_rem_native_amount()
    env.generate_event("Calling div_rem_native_amounts(amount1, divisor)");
    const ret_div_rem_native_amount = env.div_rem_native_amount(amount1, divisor);
    assert(ret_div_rem_native_amount.length == 2, "  > Error: div_rem_native_amount(amount1, divisor) should return a 2 element array");
    const ret_div_rem_native_amount_quotient = ret_div_rem_native_amount.at(0);
    const ret_div_rem_native_amount_quotient_mantissa = assert(ret_div_rem_native_amount_quotient.mantissa, "  > Error: div_rem_native_amount(amount1, divisor).quotient.mantissa returned null");
    const ret_div_rem_native_amount_quotient_scale = assert(ret_div_rem_native_amount_quotient.scale, "  > Error: div_rem_native_amount(amount1, divisor).quotient.scale returned null");
    const ret_div_rem_native_amount_remainder = ret_div_rem_native_amount.at(1);
    const ret_div_rem_native_amount_remainder_mantissa = assert(ret_div_rem_native_amount_remainder.mantissa, "  > Error: div_rem_native_amount(amount1, divisor).remainder.mantissa returned null");
    const ret_div_rem_native_amount_remainder_scale = assert(ret_div_rem_native_amount_remainder.scale, "  > Error: div_rem_native_amount(amount1, divisor).remainder.scale returned null");
    env.generate_event(
        "  > Ok: div_rem_native_amount(amount1, divisor) returns: quotient.mantissa: " +
        ret_div_rem_native_amount_quotient_mantissa.toString() +
        ", quotient.scale: " +
        ret_div_rem_native_amount_quotient_scale.toString() +
        ", remainder.mantissa: " +
        ret_div_rem_native_amount_remainder_mantissa.toString() +
        ", remainder.scale: " +
        ret_div_rem_native_amount_remainder_scale.toString()
    );
    env.generate_event(" ");

    // Test .div_rem_native_amounts()
    env.generate_event("Calling div_rem_native_amounts(amount1, amount2)");
    const ret_div_rem_native_amounts = env.div_rem_native_amounts(amount1, amount2);
    const ret_div_rem_native_amounts_remainder = ret_div_rem_native_amounts.remainder;
    const ret_div_rem_native_amounts_remainder_mantissa = assert(ret_div_rem_native_amounts_remainder.mantissa, "  > Error: div_rem_native_amounts(amount1, amount2).remainder.mantissa returned null");
    const ret_div_rem_native_amounts_remainder_scale = assert(ret_div_rem_native_amounts_remainder.scale, "  > Error: div_rem_native_amounts(amount1, amount2).remainder.scale returned null");
    env.generate_event(
        "  > Ok: div_rem_native_amounts(amount1, amount2) returns: quotient: " +
        ret_div_rem_native_amounts.quotient.toString() +
        ", remainder.mantissa: " +
        ret_div_rem_native_amounts_remainder_mantissa.toString() +
        ", remainder.scale: " +
        ret_div_rem_native_amounts_remainder_scale.toString()
    );
    env.generate_event(" ");

    // Test .native_amount_to_string()
    env.generate_event("Calling native_amount_to_string(amount1)");
    const ret_native_amount_to_string = env.native_amount_to_string(amount1);
    env.generate_event("  > Ok: native_amount_to_string(amount1) returns: " + ret_native_amount_to_string.toString());
    env.generate_event(" ");

    // Test .native_amount_from_string()
    env.generate_event("Calling native_amount_from_string(str_amount)");
    const ret_native_amount_from_string = env.native_amount_from_string(str_amount);
    const ret_native_amount_from_string_mantissa = assert(ret_native_amount_from_string.mantissa, "  > Error: native_amount_from_string(str_amount).mantissa returned null");
    const ret_native_amount_from_string_scale = assert(ret_native_amount_from_string.scale, "  > Error: native_amount_from_string(str_amount).scale returned null");
    env.generate_event(
        "  > Ok: native_amount_from_string(str_amount) returns: mantissa: " +
        ret_native_amount_from_string_mantissa.toString() +
        ", scale: " +
        ret_native_amount_from_string_scale.toString()
    );
    env.generate_event(" ");

    // ##############################
    // END TESTS
    // ##############################

    shared_mem = env.encode_length_prefixed(new Uint8Array(0)).buffer;
    return shared_mem;
}

