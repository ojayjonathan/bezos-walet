import { Transaction } from './../../shared/types';

export type OwnableTransaction = Transaction & { isOwnedByBezos: boolean }
