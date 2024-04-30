import { z } from "zod";
import { schemaSearch } from "./schema";

export type SearchProps = z.infer<typeof schemaSearch>;
