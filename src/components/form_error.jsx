const FormError = (props) => {
  const {
    error = null,
    errors = [],
    iconClassName,
    margin,
    textClassName,
    type,
  } = props;

  // look for the first truthy error to display
  let message = error;

  if (!message) {
    for (const err of errors) {
      if (err) {
        message = err;
      }
    }
  }

  if (!message) {
    return null;
  }

  if (type === "modal") {
    return (
      <div className="form-group">
        <label className="col-sm-12 has-error">{message}</label>
      </div>
    );
  }

  if (type === "backstage") {
    return (
      <div className="pull-left has-error">
        <label className="control-label">{message}</label>
      </div>
    );
  }

  if (margin) {
    return (
      <div className="form-group has-error">
        <label className="control-label">{message}</label>
      </div>
    );
  }

  return (
    <div className={`col-sm-12 ${textClassName || "has-error"}`}>
      <label className="control-label">
        <i className={`fa ${iconClassName || "fa-exclamation-circle"}`} />{" "}
        {message}
      </label>
    </div>
  );
};

export default FormError;
