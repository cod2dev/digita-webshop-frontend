import Addresses from "../../../../Components/Settings/Addresses/Addresses";
import { useAppSelector } from "../../../../store";

function AddressesPage() {
  const { user } = useAppSelector((state) => state.reducer.auth);

  return <Addresses user={user!} />;
}

export default AddressesPage;
