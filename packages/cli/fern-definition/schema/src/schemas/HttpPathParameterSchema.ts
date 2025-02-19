import { z } from "zod";
import { TypeReferenceSchema } from "./TypeReferenceSchema";
import { VariableReferenceSchema } from "./VariableReferenceSchema";

export const HttpPathParameterSchema = z.union([
    TypeReferenceSchema,
    // pathParam: $myVariable
    z.string(),
    VariableReferenceSchema
]);

export type HttpPathParameterSchema = z.infer<typeof HttpPathParameterSchema>;
