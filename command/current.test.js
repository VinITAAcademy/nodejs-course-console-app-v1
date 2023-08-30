import test, { describe } from "node:test";
import { validate } from "./current.js";
import assert from "node:assert/strict";

describe("validate()", () => {
  test("should not throw an error if city is passed", () => {
    assert.doesNotThrow(() => validate({ city: "Vinnytsia" }));
  });

  test("should not throw an error if lat and long are passed", () => {
    assert.doesNotThrow(() => validate({ lat: "49.2328", long: "28.4816" }));
  });

  test("should not throw an error if both city and lat/long are passed", () => {
    assert.doesNotThrow(() =>
      validate({ city: "Vinnytsia", lat: "49.2328", long: "28.4816" }),
    );
  });

  test("should throw an error if only lat is passed", () => {
    assert.throws(() => validate({ lat: "49.2328" }), {
      message: "Either city or lat and long should be present",
    });
  });

  test("should throw an error if only long is passed", () => {
    assert.throws(() => validate({ long: "28.4816" }), {
      message: "Either city or lat and long should be present",
    });
  });

  test("should throw an error if neither city nor lat and long are passed", () => {
    assert.throws(() => validate({}), {
      message: "Either city or lat and long should be present",
    });
  });
});
