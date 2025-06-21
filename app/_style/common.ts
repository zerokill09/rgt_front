import { Box, Button, ButtonProps, styled, TableCell, TextareaAutosize, TextField } from "@mui/material";

const tableBorderStyle = "1px solid #ddd";
const inputBorderStyle = "1px solid #777";
const innputFontSize = 13;

/* 테이블셀 스타일 */
const getStyledCompo2Style = {
  fontSize: 13,
  borderBottom: tableBorderStyle,
  padding: "8px 10px",
  "& label": {
    margin: 0,
  },
};
export const StyledTableCellHead = styled(TableCell)(() => ({
  ...getStyledCompo2Style,
  background: "#eee",
  fontWeight: "bold",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  ...getStyledCompo2Style,
}));

/* 데이터 리스트 영역 */
export const DataListBox = styled(Box)(() => ({
  "& .MuiTableContainer-root": {
    width: "100%",
    overflowX: "auto",
    marginBottom: 8,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  table: {
    width: "max-content",
    minWidth: "100%",
    "&.full-width": {
      tableLayout: "fixed",
      width: "100%",
    },
  },
  "th, td": {
    padding: "5px 10px",
    input: {
      margin: 0,
    },
  },
  "tr:hover td": {
    background: "#f2f7ff",
  },
  td: {
    border: tableBorderStyle,
    "&:first-child": {
      borderLeft: 0,
    },
    "&:last-child": {
      borderRight: 0,
    },
  },
  nav: {
    display: "flex",
    WebkitBoxPack: "center",
    justifyContent: "center",
    marginTop: 10,
  },
}));

/* 버튼 스타일 */
export const StyledButton = styled(Button)<ButtonProps>(() => ({
  fontSize: 12,
}));

/* input 스타일 */
export const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  padding: 0,

  "& .MuiInputBase-root": {
    "&:before": {
      borderBottom: inputBorderStyle,
    },
  },

  "& .MuiInputBase-input": {
    padding: 0,
    paddingBottom: 5,
    fontSize: innputFontSize,
  },
}));

export const StyledTextArea = styled(TextareaAutosize)(() => ({
  width: "100%",
  fontSize: innputFontSize,
  border: 0,
  borderBottom: inputBorderStyle,
  padding: "5px",
}));
