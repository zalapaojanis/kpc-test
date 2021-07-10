import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import userFormActions from './actions/userFormActions';
import UserForm from './components/UserForm/UserForm';
import StoreTable from './components/StoreTable/StoreTable';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);

  useEffect(() => {
    dispatch(userFormActions.fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const propsUserForm = {
    dispatch,
    userFormActions,
    user,
  }

  return (
    <div className="App">
      <h2>Form</h2>
      <UserForm {...propsUserForm} />
      <StoreTable users={user?.userData} />
    </div>
  );
}

export default App;
