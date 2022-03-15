/* eslint-disable jsx-a11y/anchor-is-valid */

import PageHeader from './components/PageHeader';
import UsersList from './components/UsersList';

const UsersPage = () => {
  return (
    <>
      <div className='card card-xl-stretch mb-xl-9'>
        <PageHeader title='Danh sách công dân' />
        <UsersList />
      </div>
    </>
  );
};

export default UsersPage;
