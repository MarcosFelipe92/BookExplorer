import { z } from "zod";
import { schemaLogin } from "./schema";

export type LoginProps = z.infer<typeof schemaLogin>;
