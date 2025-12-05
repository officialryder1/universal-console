import { describe, it, expect, beforeEach } from "vitest";
import { disableConsole, enableConsole, initConsole, logOnce, resetConsoleState, isDisabled } from "../src";
import { vi } from "vitest";

describe("universal-consolejs", () => {
  beforeEach(() => {
    resetConsoleState();
  });

  it("disables and enables", () => {
    initConsole({ env: "production" });
    expect(isDisabled()).toBe(true);
    enableConsole();
    expect(isDisabled()).toBe(false);
  });

  it("logOnce works", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logOnce("a", "log", "hello");
    logOnce("a", "log", "hello again");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

});
