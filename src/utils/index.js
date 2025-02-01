import { ref } from "vue";

export const GET = (url, file = false) => {
  let loading = ref(true);
  let data = ref(null);
  let error = ref(null);
  let success = ref(false);
  let status = ref(404);

  (async () => {
    try {
      const response = await fetch(url, { method: "GET", mode: "no-cors" });
      // console.log({ response, url });
      if (file) {
        data.value = await response.json();
      } else {
        status.value = 200;
        // if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        // status.value = response.status;
      }
      success.value = true;
    } catch (err) {
      error.value = err;
      success.value = false;
    } finally {
      loading.value = false;
    }
  })();

  return { loading, data, error, success, status };
};
