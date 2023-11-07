import DataTable from "./components/DataTable";
import { Events, columns } from "./components/Columns";
import { useEffect, useState } from "react";
import { dummy } from "./dummy";

function App() {
  const [data, setData] = useState<Events[]>([]);

  useEffect(() => {
    const getData = async (): Promise<Events[]> => {
      return dummy;
    };

    const fData = async () => {
      const data = await getData();
      setData(data);
    };
    fData();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default App;
