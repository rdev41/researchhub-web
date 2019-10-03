import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import Plain from "slate-plain-serializer";

import ReadOnlyEdtior from "./ReadOnlyEditor";
import RichTextEditor from "./RichTextEditor";

const TextEditor = (props) => {
  const {
    canEdit,
    canCancel,
    canSubmit,
    cancelButtonStyles,
    submitButtonStyles,
    cancelButtonText,
    submitButtonText,
    onCancel,
    onSubmit,
    initialValue,
    placeholder,
    readOnly,
  } = props;

  const defaultPlaceholder = "Enter some text...";
  const defaultInitialValue = Plain.deserialize(
    placeholder || defaultPlaceholder
  );

  const [value, setValue] = useState(initialValue || defaultInitialValue);

  function cancel() {
    onCancel && onCancel();
  }

  function submit() {
    onSubmit && onSubmit(JSON.stringify(value.toJSON()));
  }

  const Editor = canEdit ? RichTextEditor : ReadOnlyEdtior;

  return (
    <Fragment>
      <Editor
        readOnly={readOnly || false}
        onChange={setValue}
        initialValue={value}
      />
      <div className={css(styles.buttonContainer)}>
        {canCancel && (
          <button className={css(cancelButtonStyles)} onClick={cancel}>
            {cancelButtonText || "Cancel"}
          </button>
        )}
        {canSubmit && (
          <button className={css(submitButtonStyles)} onClick={submit}>
            {submitButtonText || "Submit"}
          </button>
        )}
      </div>
    </Fragment>
  );
};

TextEditor.propTypes = {
  canEdit: PropTypes.bool,
  canCancel: PropTypes.bool,
  canSubmit: PropTypes.bool,
  cancelButtonStyles: PropTypes.object,
  submitButtonStyles: PropTypes.object,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  initialValue: PropTypes.object,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
  },
});

export default TextEditor;