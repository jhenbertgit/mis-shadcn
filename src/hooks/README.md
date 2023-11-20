
## Quickstart

Using the custom hook

```bash
const { data, isLoaded, error } = useFetch<DataType[]>({
    fetchFn: async () => {
      const response = await fetch(url);
      const data: DataType[] = await response.json();
      return data;
    },
    initialData: [],
  });
```

In the example above, I use the [fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). You can also use [Axios](https://axios-http.com/docs/intro) or any other [promise-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) http client.
