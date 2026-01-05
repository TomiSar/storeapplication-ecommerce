import type { AxiosError } from 'axios';
import type { ActionResult } from './types';

export type ApiError<T> = AxiosError<T>;

function getErrorMessage(status?: number): string {
  switch (status) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Invalid username or password';
    case 403:
      return 'Invalid credentials to perform this action';
    case 404:
      return 'Resource Not Found';
    case 500:
      return 'Internal Server Error. Please try again';
    default:
      return 'Something went wrong. Please try again';
  }
}

export function mapApiError<TSuccess, TErrors extends object>(
  error: unknown,
  fallbackMessage?: string,
): ActionResult<TSuccess, TErrors> {
  const err = error as ApiError<TErrors>;

  type BackendErrorMessage = {
    errorMessage?: string;
  };

  // Validation errors (400) backend field errors
  if (err.response?.status === 400 && err.response.data) {
    return {
      success: false,
      errors: err.response.data,
    } as ActionResult<TSuccess, TErrors>;
  }

  // Backend-provided error message (optional)
  const backendMessage =
    err.response?.data &&
    typeof err.response?.data === 'object' &&
    'errorMessage' in (err.response.data as Record<string, unknown>)
      ? String((err.response.data as BackendErrorMessage).errorMessage)
      : undefined;

  return {
    success: false,
    errors: {} as TErrors,
    message: backendMessage ?? fallbackMessage ?? getErrorMessage(err.response?.status),
  } as ActionResult<TSuccess, TErrors>;
}
