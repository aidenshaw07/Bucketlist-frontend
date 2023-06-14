import { BucketListItems } from "../components/BucketListItems";

const LoggedInPage = ({ onLogout }: any) => {
  return (
    <div>
      <h1>Welcome to the Logged In Page!</h1>
      <button onClick={onLogout}>Logout</button>
      <BucketListItems />
    </div>
  );
};

export default LoggedInPage;
