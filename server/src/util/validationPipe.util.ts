import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationErrorException } from "../exception/ValidationError.exception";

export const validationPipe = async (schema: new () => {}, requestObject: object) => {
  const transformedClass: any = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return new ValidationErrorException("Errors were found during data validation", errors, requestObject)
  }
  return transformedClass;
};