"use client";

import { useEffect, useState } from "react";
import { Book, SearchParam } from "../_interface/book";
import { useBookListQuery } from "../_query/book";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Box,
  Button,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import {
  DataListBox,
  StyledButton,
  StyledTableCell,
  StyledTableCellHead,
  StyledTextField,
} from "../_style/common";

export default function BookList() {
  const defaultParam = new SearchParam();
  const [searchParam, setSearchParam] = useState(defaultParam);
  const { data } = useBookListQuery(searchParam);

  const methods = useForm<Book>();
  const { register, handleSubmit, reset } = methods;

  const handlePage = (event: unknown, value: number) => {
    setSearchParam((searchParam) => ({
      ...searchParam,
      page: value,
    }));
  };

  const onSubmit = (inputData: Book) => {
    setSearchParam({
      ...inputData,
      page: 1,
    });
  };

  useEffect(() => {
    reset(searchParam);
  }, [reset, searchParam]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "10px 0px",
        }}
      >
        <StyledButton
          variant="outlined"
          size="small"
          onClick={() => setSearchParam({ ...defaultParam })}
        >
          전체
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          component={Link}
          href="/books/new"
        >
          추가
        </StyledButton>
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TableContainer sx={{ margin: "10px 0px" }}>
            <Table sx={{ border: "1px solid #ddd" }}>
              <TableBody>
                <TableRow>
                  <StyledTableCellHead>제목</StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      {...register("bookName")}
                    ></StyledTextField>
                  </StyledTableCell>
                  <StyledTableCellHead>저자</StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      {...register("bookAuthor")}
                    ></StyledTextField>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: 80 }}>
                    <Button variant="outlined" size="small" type="submit">
                      검색
                    </Button>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </FormProvider>
      <DataListBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCellHead sx={{ width: 50 }}>ID</StyledTableCellHead>
                <StyledTableCellHead>제목</StyledTableCellHead>
                <StyledTableCellHead sx={{ width: 200 }}>
                  저자
                </StyledTableCellHead>
                <StyledTableCellHead sx={{ width: 80 }}>
                  상세
                </StyledTableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.contents.map((book: Book) => (
                <TableRow key={book.bookId}>
                  <StyledTableCell>{book.bookId}</StyledTableCell>
                  <StyledTableCell>{book.bookName}</StyledTableCell>
                  <StyledTableCell>{book.bookAuthor}</StyledTableCell>
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    <StyledButton
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={`/books/${book.bookId}/`}
                    >
                      보기
                    </StyledButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={data?.totalPages}
          page={searchParam.page}
          siblingCount={3}
          onChange={handlePage}
        />
      </DataListBox>
    </>
  );
}
