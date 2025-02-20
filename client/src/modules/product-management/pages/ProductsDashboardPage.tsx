import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import BoughtProductList from '../components/BoughtProductList';
import SoldProductList from '../components/SoldProductList';
import BorrowedProductList from '../components/BorrowedProductList';
import LentProductList from '../components/LentProductList';

export default function ProductsDashboardPage() {
  return (
    <div className="flex w-full flex-col items-center justify-start p-6">
      <Tabs defaultValue="bought" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bought">Bought</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="lent">Lent</TabsTrigger>
        </TabsList>
        <TabsContent value={'bought'}>
          <BoughtProductList />
        </TabsContent>
        <TabsContent value="sold">
          <SoldProductList />
        </TabsContent>
        <TabsContent value="borrowed">
          <BorrowedProductList />
        </TabsContent>
        <TabsContent value="lent">
          <LentProductList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
