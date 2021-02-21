import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions/";

class StreamCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="hedaer">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div style={{ color: "#808080" }}>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.createStream(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title " />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

const formWrapper = reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapper);
