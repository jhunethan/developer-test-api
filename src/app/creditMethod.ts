const axios = require("axios");

export async function apiRequest(endpoint, method, body, callback) {
  const url = `https://developer-test-service-2vfxwolfiq-nw.a.run.app${endpoint}`;
  let response;
  switch (method) {
    case "get":
      response = await axios.get(url, body);

      break;
    case "post":
      response = await axios.post(url, body);
      break;

    default:
      break;
  }

  callback(response);
}

export async function getCreditor(body) {
  let totals = { secured: 0, unsecured: 0, total: 0 };
  let numberOfUnsecuredCreditors = 0;
  let qualifies = false;

  await apiRequest("/creditors", "get", body, (response) => {
    const creditors = response.data;

    for (const creditor of creditors) {
      if (creditor.surname === body.surname) {
        totals.total += creditor.value;
        totals[creditor.secured ? "secured" : "unsecured"] += creditor.value;

        if (!creditor.secured) numberOfUnsecuredCreditors += 1;
      }
    }
  });

  if (numberOfUnsecuredCreditors >= 2 && totals.unsecured >= 500000) qualifies = true;

  return {
    totalCreditorValue: totals.total,
    securedCreditorValue: totals.secured,
    unsecuredCreditorValue: totals.unsecured,
    qualifies,
  };
}
