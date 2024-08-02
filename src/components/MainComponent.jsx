import React, { useState, useEffect } from 'react';
import CountInventoryTable from './CountInventoryTable';
import ReportTable from './ReportTable';
import { apiSystem } from "@/api";

export default function MainComponent() {
  const [countInventorys, setCountInventorys] = useState([]);
  const [countReports, setCountReports] = useState([]);

  useEffect(() => {
    fetchCountInventorys();
    fetchCountReports();
  }, []);

  const fetchCountInventorys = async () => {
    const response = await apiSystem.get('/countInventory');
    setCountInventorys(response.data);
  };

  const fetchCountReports = async () => {
    const response = await apiSystem.get('/countReport');
    setCountReports(response.data);
  };

  const updateInventoryAmount = async (pk_countinventory, amount_unit) => {
    const inventory = countInventorys.find(item => item.pk_countinventory === pk_countinventory);
    if (inventory) {
      const updatedAmount = inventory.amount - amount_unit;
      const updatedInventory = { ...inventory, amount: updatedAmount };

      await apiSystem.put(`/countInventory/${pk_countinventory}`, updatedInventory);

      setCountInventorys(prevState => prevState.map(item =>
        item.pk_countinventory === pk_countinventory ? updatedInventory : item
      ));
    }
  };

  return (
    <div>
      <CountInventoryTable
        countInventorys={countInventorys}
        onRefetch={fetchCountInventorys}
        onUpdateInventory={updateInventoryAmount}
      />
      <ReportTable
        countReports={countReports}
        onRefetch={fetchCountReports}
        onUpdateInventory={updateInventoryAmount}
      />
    </div>
  );
}
