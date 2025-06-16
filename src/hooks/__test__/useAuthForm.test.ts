import { renderHook, act } from "@testing-library/react";
import { useAuthForm } from "../useAuthForm.hook";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { mocked } from "jest-mock";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe("useAuthForm", () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    mocked(useRouter).mockReturnValue(mockRouter);
    (global.fetch as jest.Mock).mockClear();
    mockRouter.push.mockClear();
  });

  it("should initialize without an error and not be loading", () => {
    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
      })
    );

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set an error message if validation fails", async () => {
    const validate = (values: { email: string; password: string }) => {
      if (!values.email) return "Email is required";
      return null;
    };

    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
        validate,
      })
    );

    const mockEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: [
          { name: "email", value: "" },
          { name: "password", value: "test" },
        ],
      },
    } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe("Email is required");
    expect(result.current.loading).toBe(false);
  });

  it("should call fetch with the correct parameters and redirect on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
      })
    );

    const mockEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: [
          { name: "email", value: "test@example.com" },
          { name: "password", value: "test" },
        ],
      },
    } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "test" }),
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/success");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set an error if the fetch request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Fetch failed" }),
    });

    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
      })
    );

    const mockEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: [
          { name: "email", value: "test@example.com" },
          { name: "password", value: "test" },
        ],
      },
    } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe("Fetch failed");
    expect(result.current.loading).toBe(false);
  });

  it("should set a network error if the fetch throws an exception", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
      })
    );

    const mockEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: [
          { name: "email", value: "test@example.com" },
          { name: "password", value: "test" },
        ],
      },
    } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe("Error de red");
    expect(result.current.loading).toBe(false);
  });

  it("should use the transform function if provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const transform = (values: { email: string; password: string }) => ({
      transformedEmail: values.email,
      transformedPassword: values.password,
    });

    const { result } = renderHook(() =>
      useAuthForm({
        endpoint: "/api/test",
        onSuccessRedirect: "/success",
        transform,
      })
    );

    const mockEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: [
          { name: "email", value: "test@example.com" },
          { name: "password", value: "test" },
        ],
      },
    } as unknown as FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transformedEmail: "test@example.com",
        transformedPassword: "test",
      }),
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/success");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
