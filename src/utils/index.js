import { ref } from "vue";

export const GET = (filePath) => {
  let loading = ref(true);
  let data = ref(null);
  let error = ref(null);
  let success = ref(false);
  let status = ref(404);

  (async () => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
      status.value = response.status;

      const jsonData = await response.json();
      data.value = jsonData;
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
