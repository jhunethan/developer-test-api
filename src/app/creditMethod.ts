import axios from "axios";

export async function apiRequest(
  endpoint: string,
  method: string,
  body: Record<string, unknown>
): Promise<{ data: [] }> {
  const url = `https://developer-test-service-2vfxwolfiq-nw.a.run.app${endpoint}`;
  let response;
  switch (method) {
    case "get":
      response = await axios.get(url, body);

      break;
    case "post":
      response = await axios.post(url, body);
      break;
  }

  return response;
}

export async function getCreditorInfo(
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const totals = { secured: 0, unsecured: 0, total: 0 };
  let numberOfUnsecuredCreditors = 0;
  let qualifies = false;

  const response = await apiRequest("/creditors", "get", body);

  const creditors: [] = response.data;

  for (const creditor of creditors) {
    if (creditor["surname"] === body["surname"]) {
      totals.total += creditor["value"];
      totals[creditor["secured"] ? "secured" : "unsecured"] +=
        creditor["value"];

      if (!creditor["secured"]) numberOfUnsecuredCreditors += 1;
    }
  }

  if (numberOfUnsecuredCreditors >= 2 && totals.unsecured >= 500000)
    qualifies = true;

  return {
    totalCreditorValue: totals.total,
    securedCreditorValue: totals.secured,
    unsecuredCreditorValue: totals.unsecured,
    qualifies,
  };
}
