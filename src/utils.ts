import { Ref } from "preact/hooks";

export type Entity = { [key: string]: string | undefined }

export const getFormField = (fieldName: string, ref: Ref<HTMLFormElement>) => (ref.current?.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement).value

export const camelCaseToWords = (s: string) => {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }