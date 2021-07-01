import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
// import { useHistory, useParams } from "react-router-dom";
// import JoditEditor from "jodit-react";
import "draft-js/dist/Draft.css";
import "../../stylesheets/Editor.css";
// import "draft-js/dist/Draft.css";

import UserContext from "../contexts/UserContext";
import { submitBlog, fetchBlog, editBlog, setImageUrls } from "../../utils/blog";

import "../../stylesheets/Blog.css";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const Editor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };
  console.log(editorState);
  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleDroppedFiles = (selection, files) => {
    console.log("files", files);
  };

  return (
    <div className={"RichEditor-root"}>
      <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />

      <div className={"RichEditor-editor"}>
        <DraftEditor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder={"Type bitch"}
          handleDroppedFiles={handleDroppedFiles}
        />
      </div>
    </div>
  );
};

export default Editor;

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const StyleButton = ({ onToggle, style, label, active }) => {
  const handleToggle = e => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "RichEditor-styleButton";
  if (active) className += " RichEditor-activeButton";

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};
