import { z } from "zod";
import { schemaRegister } from "./schema";

export type RegisterProps = z.infer<typeof schemaRegister>;
