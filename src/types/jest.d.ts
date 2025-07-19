import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: string | Record<string, any>): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveAttribute(attribute: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveDisplayValue(value: string | string[]): R;
      toHaveFormValues(expectedValues: Record<string, any>): R;
      toHaveFocus(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveDescription(text?: string | RegExp): R;
      toHaveAccessibleDescription(text?: string | RegExp): R;
      toHaveAccessibleName(text?: string | RegExp): R;
      toBeRequired(): R;
      toBeInvalid(): R;
      toBeValid(): R;
    }
  }
}