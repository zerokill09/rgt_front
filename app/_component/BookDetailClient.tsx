"use client";
import { useBookDeleteMutaion, useBookDetailQuery } from "@/app/_query/book";
import { Box, Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { format } from "date-fns";
import {
  StyledButton,
  StyledTableCell,
  StyledTableCellHead,
} from "../_style/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";

export default function BookDetailClient({ bookId }: { bookId: string }) {
  const router = useRouter();

  const { data } = useBookDetailQuery(bookId);
  const { mutateAsync: bookDelete } = useBookDeleteMutaion();

  if (!data) {
    return <></>;
  }

  function handleEvent(): void {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    bookDelete({ bookId })
      .then(() => {
        alert("삭제 완료");
        router.push("/books");
      })
      .catch((e) => {
        alert("에러가 발생했습니다. : " + e.response?.data.message);
      });
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          margin: "10px 0px",
          textAlign: "right",
        }}
      >
        <StyledButton
          variant="outlined"
          size="small"
          component={Link}
          href="/books"
          sx={{ marginRight: 1 }}
        >
          목록
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          component={Link}
          href={`/books/${bookId}/edit`}
          sx={{ marginRight: 1 }}
        >
          수정
        </StyledButton>
        <StyledButton variant="outlined" size="small" onClick={handleEvent}>
          삭제
        </StyledButton>
      </Box>
      <TableContainer>
        <Table sx={{ border: "1px solid #ddd" }}>
          <TableBody>
            <TableRow>
              <StyledTableCellHead sx={{ width: 200 }}>
                번호
              </StyledTableCellHead>
              <StyledTableCell>{data?.bookId}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>제목</StyledTableCellHead>
              <StyledTableCell>{data?.bookName}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>저자</StyledTableCellHead>
              <StyledTableCell>{data?.bookAuthor}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>출판사</StyledTableCellHead>
              <StyledTableCell>{data?.bookPublisher}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>설명</StyledTableCellHead>
              <StyledTableCell>{data?.bookDescription}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>수량</StyledTableCellHead>
              <StyledTableCell>
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator=","
                  displayType="text"
                  value={data?.stockQuantity}
                  decimalScale={0}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>생성일시</StyledTableCellHead>
              <StyledTableCell>
                {format(new Date(data?.creationDateTime), "yyyy-MM-dd HH:ii")}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCellHead>최근 수정일시</StyledTableCellHead>
              <StyledTableCell>
                {format(new Date(data?.updateDateTime), "yyyy-MM-dd HH:ii")}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
