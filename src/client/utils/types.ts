import { Merchant, Transaction } from "./../../shared/types";

export type OwnableTransaction = Transaction & { merchant?: Merchant | null };
