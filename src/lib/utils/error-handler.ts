export type AppError = {
  message: string;
  code?: string;
  details?: any;
};

export class AppErrorBase extends Error {
  constructor(public message: string, public code = 'INTERNAL_ERROR', public details?: any) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleActionError = (error: unknown) => {
  if (error instanceof AppErrorBase) {
    return {
      success: false,
      error: { message: error.message, code: error.code, details: error.details },
    };
  }

  console.error('Unexpected Error:', error);
  return {
    success: false,
    error: { message: 'An unexpected error occurred. Please try again.', code: 'INTERNAL_ERROR' },
  };
};
