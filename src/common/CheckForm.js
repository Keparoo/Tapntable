import React, { useState } from 'react';
// import './NewCheckForm.css';

/* Render New/Edit post form

    Call the parent (POST) on edit or cancel click
*/

const CheckForm = ({
  check = { tableNum: '', numGuests: '' },
  save,
  cancel
}) => {
  console.debug('NewCheckForm');

  const [ form, setForm ] = useState({
    tableNum: check.tableNum,
    numGuests: check.numGuests
  });

  // Handle changes in the form
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Handle submit: call parent function save
  function handleSubmit(e) {
    e.preventDefault();
    save({ ...form });
  }

  return (
    <form
      className="mb-4"
      style={{ width: 300, margin: 'auto', marginTop: '100px' }}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="tableNum">Table Number:</label>
        <input
          className="form-control"
          type="text"
          name="tableNum"
          id="tableNum"
          onChange={handleChange}
          value={form.tableNum}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numGuests">Number of Guests:</label>
        <input
          className="form-control"
          type="text"
          name="numGuests"
          id="numGuests"
          onChange={handleChange}
          value={form.numGuests}
        />
      </div>
      <button className="btn btn-primary mr-2">Save</button>
      <button onClick={cancel} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
};

export default CheckForm;
