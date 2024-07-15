import Cart from "./Cart";

const Header = () => {
  return (
    <header className='relative border-2 border-emerald-600 rounded-md flex w-full justify-end items-center py-2 px-36 mb-8 h-12'>
      <div>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
