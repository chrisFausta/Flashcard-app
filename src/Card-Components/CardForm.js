import React from "react";
const CardForm = ({
  handleChange,
  handleSubmit,
  formData,
  cancelLabel,
  submitLabel,
  goToDeck,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
            className="form-control"
            id="front"
            name="front"
            rows="5"
            onChange={handleChange}
            value={formData.front}
            required
          />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
            className="form-control"
            id="back"
            name="back"
            rows="5"
            onChange={handleChange}
            value={formData.back}
            required
          />
      </div>
      <br />
      <button className="btn btn-secondary" onClick={goToDeck}>
        {cancelLabel}
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        {submitLabel}
      </button>
    </form>
  );
};

export default CardForm;
