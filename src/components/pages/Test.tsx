import { useFetch } from "@/hooks/use-fetch";

const Test = () => {
  const { data } = useFetch({
    fetchFn: async () => {
      const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
      const result = await response.json();
      return result;
    },
    initData: [],
  });
  return (
    <ul>
      {data.map((product) => (
        <li key={product.name}>{product.name}</li>
      ))}
    </ul>
  );
};

export default Test;
