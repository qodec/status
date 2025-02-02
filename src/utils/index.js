import { ref } from "vue";

export const siteURL = (import.meta.env.MODE === "production" ? "/status" : "") + "/sites.json";

// constants
export const sURL = "https://p8877.pettyprice.com?url=";

export const GET = (url, file = false, local = false) => {
  let loading = ref(true);
  let data = ref(null);
  let error = ref(null);
  let success = ref(false);
  let status = ref(null);

  (async () => {
    try {
      // const response = await fetch(url, { method: "GET", mode: "no-cors" });
      let url_ = file || local ? url : sURL + url;
      const response = await fetch(url_, { method: "GET", ...(local ? { mode: "no-cors" } : {}) });
      // console.log({ response, url_, local });
      if (file) {
        data.value = await response.json();
      } else {
        data.value = await response.text();
        status.value = response.status || 200;
        // if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        // status.value = response.status;
      }
      success.value = true;
    } catch (err) {
      // console.log({ err }, err.message);
      error.value = err;
      status.value = 500;
      success.value = false;
    } finally {
      loading.value = false;
    }
  })();

  return { loading, data, error, success, status };
};

const abc = (url) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    console.log({ xhr });
    if (xhr.status !== 200) {
      console.log("Error: HTTP Status:", xhr.status);
    } else {
      console.log("Success:", xhr.responseText);
    }
  };

  xhr.onerror = function () {
    console.log("Network error occurred or request was aborted");
  };

  xhr.send();
};
