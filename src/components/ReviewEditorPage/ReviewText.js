import {
  Box,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useReviewAppDispatch } from "../../services/hooks";
import {
  insertImages,
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  TableBubbleMenu,
} from "mui-tiptap";
import { useCallback, useEffect, useRef, useState } from "react";
import useExtensions from "../../hooks/useExtensions";
import EditorMenuControls from "./EditorMenuControls";
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import useDisableScrollLock from "./useDisableScrollLock";

function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) =>
    (file.type || "").toLowerCase().startsWith("image/")
  );
}

function ReviewText() {
  useDisableScrollLock(); // Prevents RichTextEditor from shifting
  const text = useSelector((state) => state.review.text);
  const { updateText } = useReviewAppDispatch();

  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const handleNewImageFiles = useCallback((files, insertPosition) => {
    if (!rteRef.current?.editor) return;

    const attributesForImageFiles = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));

    insertImages({
      images: attributesForImageFiles,
      editor: rteRef.current.editor,
      insertPosition,
    });
  }, []);

  const handleDrop = useCallback(
    (view, event) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) return false;

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        const insertPosition = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        handleNewImageFiles(imageFiles, insertPosition);
        event.preventDefault();
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  const handlePaste = useCallback(
    (_view, event) => {
      if (!event.clipboardData) return false;

      const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
      if (pastedImageFiles.length > 0) {
        handleNewImageFiles(pastedImageFiles);
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  useEffect(() => {
    if (rteRef.current?.editor && text !== rteRef.current.editor.getHTML()) {
      rteRef.current.editor.commands.setContent(text);
    }
  }, [text]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      console.log("Body styles changed:", {
        overflow: document.body.style.overflow,
        marginRight: document.body.style.marginRight,
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box
        sx={{
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={text}
          editable={isEditable}
          editorProps={{ handleDrop, handlePaste }}
          onUpdate={({ editor }) => {
            updateText(editor.getHTML());
          }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: { hide: !showMenuBar },
            footer: (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() => setShowMenuBar((prev) => !prev)}
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                <MenuButton
                  value="formatting"
                  tooltipLabel={isEditable ? "Prevent edits" : "Allow edits"}
                  size="small"
                  onClick={() => setIsEditable((prev) => !prev)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                />

                {/* <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    updateText(rteRef.current?.editor?.getHTML() || "");
                  }}
                >
                  Save
                </Button> */}
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    </>
  );
}

export default ReviewText;
