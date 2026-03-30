export const editorHeader = (
  <>
    <span className="ql-formats">
      <select className="ql-header" defaultValue="">
        <option value=""></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
    </span>

    <span className="ql-formats">
      <select className="ql-color"></select>
      <select className="ql-background"></select>
    </span>

    <span className="ql-formats">
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
    </span>

    <span className="ql-formats">
      <button className="ql-direction" value="rtl"></button>
      <select className="ql-align"></select>
    </span>

    <span className="ql-formats">
      <button className="ql-link"></button>
      <button className="ql-clean"></button>
    </span>
  </>
);
