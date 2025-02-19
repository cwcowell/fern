import { z } from "zod";
import { RawSchemas } from "@fern-api/fern-definition-schema";

/*********** OpenAPI Spec ***********/

export const OpenAPISettingsSchema = z.strictObject({
    "title-as-schema-name": z.optional(z.boolean()),
    "optional-additional-properties": z.optional(z.boolean())
});

export type OpenAPISettingsSchema = z.infer<typeof OpenAPISettingsSchema>;

export const OpenAPISpecSchema = z.strictObject({
    openapi: z.string(),
    overrides: z.string().optional(),
    namespace: z.string().optional(),
    settings: z.optional(OpenAPISettingsSchema)
});

export type OpenAPISpecSchema = z.infer<typeof OpenAPISpecSchema>;

/*********** AsyncAPI Spec ***********/

export const AsyncAPISettingsSchema = z.strictObject({
    "title-as-schema-name": z.optional(z.boolean()),
    "optional-additional-properties": z.optional(z.boolean())
});

export type AsyncAPISettingsSchema = z.infer<typeof AsyncAPISettingsSchema>;

export const AsyncAPISchema = z.strictObject({
    asyncapi: z.string(),
    overrides: z.string().optional(),
    namespace: z.string().optional(),
    settings: z.optional(AsyncAPISettingsSchema)
});

export type AsyncAPISchema = z.infer<typeof AsyncAPISchema>;

export const SpecSchema = z.union([OpenAPISpecSchema, AsyncAPISchema]);

export type SpecSchema = z.infer<typeof SpecSchema>;

export const APIConfigurationV2Schema = z
    .object({
        auth: z.optional(RawSchemas.ApiAuthSchema),
        specs: z.array(SpecSchema)
    })
    .extend(RawSchemas.WithHeadersSchema.shape)
    .extend(RawSchemas.WithEnvironmentsSchema.shape);
