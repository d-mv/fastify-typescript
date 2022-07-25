import { FromSchema, JSONSchema7 } from 'json-schema-to-ts';

export const UserSchema = {
  $id: 'schema-user',
  type: 'object',
  required: ['firstName','lastName'],
  additionalProperties: false,
  properties: {
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    status: { type: 'string' },
  },
} as const;

export type User = FromSchema<typeof UserSchema>;