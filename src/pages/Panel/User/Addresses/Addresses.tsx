import Addresses from "../../../../components/Settings/Components/Addresses/Addresses";
import { useAppSelector } from "../../../../redux/store";

function AddressesPage() {
  const { user } = useAppSelector((state) => state.reducer.auth);

  return <Addresses user={user!} />;
}

export default AddressesPage;
