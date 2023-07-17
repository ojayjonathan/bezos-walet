import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import Header from "./wallet/Header";
import Stats from "./wallet/Stat";
import TransactionList from "./wallet/TransactionList";
import Splash from "./shared/Splash";
import { Merchant, Tag, Transaction } from "./../shared/types";
import {
  fetchTransactions,
  fetchMerchants,
  fetchTags,
  removeMerchantFromTag,
  changeMerchantTag,
  createTag,
} from "./utils/fetch";
import { OwnableTransaction } from "utils/types.ts";

const POLL_FREQUENCY_MS = 10000;

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  /**
   * @param name Name of merchant
   */
  const updateMerchantTag = useCallback(
    async (name: string, tag: number | null) => {
      console.log(name, tag);

      if (!tag) {
        const res = await removeMerchantFromTag(name);
        if (!res) {
          console.error("Unable to delete merchant.");
        } else {
          setMerchants(
            merchants.map((merchant) => {
              if (merchant.name === name) {
                merchant.tagId = null;
              }
              return merchant;
            })
          );
        }
      } else if (tag) {
        const res = await changeMerchantTag(name, tag);
        if (res) {
          const isNewMerchant = !merchants.find(
            (merchant) => merchant.name === name
          );
          if (isNewMerchant) {
            setMerchants([
              ...merchants,
              {
                tagId: tag,
                name: name,
              },
            ]);
          } else {
            setMerchants(
              merchants.map((merchant) => {
                if (merchant.name === name) {
                  merchant.tagId = tag;
                }
                return merchant;
              })
            );
          }
        }
      }
    },
    [merchants]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await fetchTransactions();
        setTransactions(transactions);

        const companies = await fetchMerchants();
        if (companies) {
          setMerchants(companies);
          const tags = await fetchTags();
          if (tags && tags.length > 0) {
            setTags(tags as any);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Set up and tear down update polling as transactions update
  useEffect(() => {
    if (!transactions) return;

    const maxTransactionID: number = transactions.reduce(
      (max, transaction) => Math.max(max, transaction.id),
      -1
    );

    const intervalID = setInterval(async () => {
      const newTransactions: Transaction[] | null = await fetchTransactions(
        maxTransactionID
      );
      if (!newTransactions || newTransactions.length === 0) return;

      setTransactions((transactions) =>
        !transactions ? transactions : [...transactions, ...newTransactions]
      );
    }, POLL_FREQUENCY_MS);

    // Teardown function
    return () => clearInterval(intervalID);
  }, [transactions]);

  const handleCreateTag = async (name: string) => {
    const res = await createTag(name);

    if (res) {
      const newTag = {
        id: res.id,
        name: name,
      };
      setTags([...tags, newTag]);
    }
  };
  const ownableTransactions: OwnableTransaction[] =
    transactions?.map((t) => {
      return {
        ...t,
        merchant: merchants?.find(
          (merchant) =>
            merchant.name.toLowerCase() === t.merchantName.toLowerCase()
        ),
      };
    }) ?? [];
  const total =
    transactions?.reduce(
      (total, transaction) => total + transaction.amount,
      0
    ) ?? 0;
  return (
    <div id="app">
      <Paper sx={{ padding: 2, borderRadius: 3 }}>
        <Stack spacing={4}>
          <Header createTag={handleCreateTag} tags={tags} />
          {!transactions ? (
            <Splash />
          ) : (
            <>
              <Stats
                tags={tags}
                transactions={ownableTransactions}
                total={total}
              />
              <TransactionList
                tags={tags}
                transactions={ownableTransactions}
                updateMerchantTag={updateMerchantTag}
              />
            </>
          )}
        </Stack>
      </Paper>
    </div>
  );
}
