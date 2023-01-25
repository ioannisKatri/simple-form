import { ValidationError } from 'yup'
import { getEnvironment } from './helpers'

// export declare class ErrorBagSDK {
//     private errors;
//     constructor(error?: Error);
//     addFieldError: (subject: string, type: string, description?: string, args?: {}) => ErrorBagSDK;
//     addGeneralError: (type: string, description?: string, args?: {}) => ErrorBagSDK;
//     addError: (error: Error) => void;
//     getErrors: () => Error[];
//     hasErrors: () => boolean;
// }

export interface CustomError {
  type: string;
  subject: string | null;
  description?: string;
  args?: Record<string, unknown>;
}

abstract class AbstractErrorBag {
  private errors: CustomError[] = []

  constructor(error?: CustomError) {
    if(error) {
      this.addError(error)
    }
  }

  public addFieldError(subject: string, type: string, description?: string, args?: {}): AbstractErrorBag {
    this.addError({
      subject,
      type,
      description,
      args,
    })
    return this
  };

  public addGeneralError(type: string, description?: string, args?: {}): AbstractErrorBag {
    this.addError({
      subject: '_',
      type,
      description,
      args,
    })
    return this
  }

  public addError (error: CustomError): void {
    this.errors.push(error)
  }

  public getErrors = () => {
    return this.errors
  }
  public hasErrors (): boolean {
    return this.errors.length > 0
  }
}

export class ErrorBag extends AbstractErrorBag {
  public toJSON(): CustomError[] {
    return this.getErrors()
  }

  public static fromError(e: Error): ErrorBag {
    return new ErrorBag({
      type: 'server_error',
      subject: e.name,
      description: e.message,
      args: getEnvironment() !== 'production' ? { stack: e?.stack?.split('\n') } : undefined,
    })
  }

  public static fromYupValidationError(err: ValidationError): ErrorBag {
    const bag = new ErrorBag()

    const addValidationErrorToBag = (e: ValidationError) => {
      console.log(e.message)
      if (e.inner?.length) {
        e.inner.forEach((vErr: ValidationError) => {
          addValidationErrorToBag(vErr)
        })
      } else {
        e.errors?.forEach((description: string) => {
          bag.addFieldError(e.path ?? '', e.type ?? '', description)
        })
      }
    }

    addValidationErrorToBag(err)
    return bag
  }
}
