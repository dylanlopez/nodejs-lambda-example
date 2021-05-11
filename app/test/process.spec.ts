import { validateEmpty } from '../src/process';

let request = [];
let response = [];
let isError = false;

jest.setTimeout(30000);

describe("Test Proccess", () => {
  it("Validando si es lista vacía", () => {
    request = [];
    isError = validateEmpty(request);
    expect(isError).toEqual(true);
  });
});
