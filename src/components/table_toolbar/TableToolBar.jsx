const TableToolBar = ({ children, title }) => {
  return (
    <header className="table-toolbar">
      {title && <h2 className="title">{title}</h2>} {children}
    </header>
  );
};

export default TableToolBar;
