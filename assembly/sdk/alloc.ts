import { shared_mem } from "./shared_mem";

export function __alloc(size: i32): ArrayBuffer {
  shared_mem = new ArrayBuffer(size);
  return shared_mem;
}
