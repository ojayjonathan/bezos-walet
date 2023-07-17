import { Transaction, Merchant, Tag } from "./../../shared/types";

/**
 * Fetch array of transactions from back-end.
 * @param lastID (Optional) Query parameter, returned transactions will all have an id greater than lastID.
 */
export async function fetchTransactions(
  lastID?: number
): Promise<Transaction[] | null> {
  let URL = "/api/transactions";

  if (lastID) URL += `?lastID=${lastID}`;

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const transactions: Transaction[] | { error: string } = await response.json();

  if (response.status !== 200 || "error" in transactions) {
    console.error((transactions as { error: string }).error);
    return null;
  }

  // Sanitize received data
  const sanitizedTransactions = transactions.filter((transaction) =>
    isValidTransaction(transaction)
  );
  sanitizedTransactions.forEach(
    (transaction) => (transaction.date = new Date(transaction.date))
  );

  if (sanitizedTransactions.length !== transactions.length) {
    console.error(
      "Some of the received transactions were in an invalid format."
    );
  }

  return sanitizedTransactions;
}

/**
 * Verify a transaction contains all properties of a Transaction.
 * @param transaction Transaction object
 */
function isValidTransaction(transaction: Transaction): boolean {
  return (
    typeof transaction.id === "number" &&
    typeof transaction.merchantName === "string" &&
    typeof transaction.date === "string" &&
    typeof transaction.amount === "number"
  );
}

/**
 * Fetch array of companies from back-end.
 */
export async function fetchMerchants(): Promise<Merchant[] | null> {
  const response = await fetch("/api/merchants", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const companies: Merchant[] | { error: string } = await response.json();

  if (response.status !== 200 || "error" in companies) {
    console.error((companies as { error: string }).error);
    return null;
  }

  // Sanitize received data
  const sanitizedMerchants = companies.filter((merchant) =>
    isValidMerchant(merchant)
  );

  if (sanitizedMerchants.length !== companies.length) {
    console.error("Some of the received companies were in an invalid format.");
  }

  return sanitizedMerchants;
}

function isValidMerchant(merchant: Merchant): boolean {
  return typeof merchant.name === "string";
}

/**
 * Add companies to back-end as Bezos owned.
 * @param companies Array of Bezos owned companies.
 */
export async function addMerchants(companies: Merchant[]): Promise<boolean> {
  const response = await fetch("/api/merchants", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companies),
  });

  const result = await response.json();

  if (response.status !== 200) {
    console.error(result.error);
    return false;
  }

  return true;
}

/**
 * Delete companies from back-end.
 * @param companies Array of companies to be removed.
 */
export async function deleteMerchants(companies: Merchant[]): Promise<boolean> {
  const response = await fetch("/api/merchants", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companies),
  });

  const result = await response.json();

  if (response.status !== 200) {
    console.error(result.error);
    return false;
  }

  return true;
}

export const fetchTags = async (): Promise<Tag[] | null> => {
  const response = await fetch("/api/tags");
  if (response.ok) {
    return await response.json();
  } else {
    console.error("Failed to fetch tags:", response.statusText);
    return null;
  }
};

export const createTag = async (newTagName: string): Promise<Tag | null> => {
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newTagName }),
  });
  if (response.ok) {
    console.log("Created tag");
    return await response.json();
  } else {
    console.error("Failed to create tag:", response.statusText);
    return null;
  }
};
export const removeMerchantFromTag = async (
  name: string
): Promise<Tag | null> => {
  const response = await fetch(`/api/tags/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.error("Failed to remove merchant from  tag:", response.statusText);
    return null;
  }
};

export const changeMerchantTag = async (
  name: string,
  tagId: number
): Promise<Tag | null> => {
  const response = await fetch(`/api/tags/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, tagId }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.error("Failed to remove merchant from  tag:", response.statusText);
    return null;
  }
};
