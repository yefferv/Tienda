import React from 'react';
import CrNavbar from '../components/CrNavbar';

interface Props {
  children: React.ReactNode;
  handlePayment: () => void;
  onSearch: (searchText: string) => void;
}

const HomeLayaout: React.FC<Props> = ({ children, handlePayment, onSearch }) => {
  return (
    <>
      <CrNavbar handlePayment={handlePayment} setSearchText={onSearch} />
      {children}
    </>
  );
};

export default HomeLayaout;
