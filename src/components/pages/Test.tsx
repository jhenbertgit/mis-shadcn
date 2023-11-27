import { useFetch } from "@/hooks/use-fetch";

type Products = {
  name: string;
  price: number;
  image: string;
  type: string;
};

const Test = () => {
  const { data } = useFetch<Products[]>({
    fetchFn: async () => {
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
      );
      const result = await response.json();
      return result;
    },
    initData: [],
  });
  return (
    <>
      {data.map((product) => (
        <ul key={product.name}>
          <li>{product.name}</li>
          <li>{product.price}</li>
        </ul>
      ))}
    </>
  );
};

export default Test;
