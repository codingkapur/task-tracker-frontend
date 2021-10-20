const Header = ({ toggle, btnText}) => {
  return (
    <header className="header">
      <h1 className="app-title">Task Tracker</h1>
      <button className="btn btn__add-task" onClick={toggle}>{btnText}</button>
    </header>
  );
};

export default Header;
