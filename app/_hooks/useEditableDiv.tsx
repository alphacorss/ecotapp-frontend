import React from 'react';

const useEditableDiv = (title: string, titleRef: React.MutableRefObject<null>) => {
  React.useEffect(() => {
    // Move the cursor to the end of the contentEditable div
    if (titleRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};

export default useEditableDiv;
