"use client";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Book } from "../_interface/book";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { useBookWriteMutation } from "../_query/book";
import {
  StyledButton,
  StyledTableCell,
  StyledTableCellHead,
  StyledTextField,
} from "../_style/common";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";

export default function BookFormClient({
  bookId,
  bookData,
}: {
  bookId?: string;
  bookData?: Book;
}) {
  const router = useRouter();

  const methods = useForm<Book>({
    mode: "onChange",
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const { mutateAsync: executeBookWrite } = useBookWriteMutation();
  const onSubmit: SubmitHandler<Book> = (inputData, e) => {
    if (e) {
      e.preventDefault();
    }

    executeBookWrite({ bookId, bookData: inputData })
      .then(() => {
        alert("저장 완료");
        router.push("/books");
      })
      .catch((e) => {
        alert("에러가 발생했습니다. : " + e.response?.data.message);
      });
  };

  useEffect(() => {
    if (bookId) {
      reset(bookData);
    }
  }, [reset, bookId, bookData]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
              sx={{ marginRight: 1 }}
              component={Link}
              href="/books"
            >
              취소
            </StyledButton>
            <StyledButton variant="outlined" size="small" type="submit">
              저장
            </StyledButton>
          </Box>
          <TableContainer>
            <Table sx={{ border: "1px solid #ddd" }}>
              <TableBody>
                {bookId && (
                  <TableRow>
                    <StyledTableCellHead sx={{ width: 200 }}>
                      번호
                    </StyledTableCellHead>
                    <StyledTableCell>{bookData?.bookId}</StyledTableCell>
                  </TableRow>
                )}
                <TableRow>
                  <StyledTableCellHead className="require">
                    제목
                  </StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      required={true}
                      {...register("bookName", {
                        maxLength: {
                          value: 100,
                          message: "최대 100자까지 입력할 수 있습니다.",
                        },
                      })}
                      error={!!errors["bookName"]}
                      helperText={"최대 100자까지 입력할 수 있습니다."}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellHead className="require">
                    저자
                  </StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      required={true}
                      {...register("bookAuthor", {
                        maxLength: {
                          value: 50,
                          message: "최대 50자까지 입력할 수 있습니다.",
                        },
                      })}
                      error={!!errors["bookAuthor"]}
                      helperText={"최대 50자까지 입력할 수 있습니다."}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellHead>출판사</StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      {...register("bookPublisher", {
                        maxLength: {
                          value: 50,
                          message: "최대 50자까지 입력할 수 있습니다.",
                        },
                      })}
                      error={!!errors["bookPublisher"]}
                      helperText={"최대 50자까지 입력할 수 있습니다."}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellHead>설명</StyledTableCellHead>
                  <StyledTableCell>
                    <StyledTextField
                      variant="standard"
                      multiline
                      minRows={3}
                      {...register("bookDescription", {
                        maxLength: {
                          value: 1000,
                          message: "최대 1000자까지 입력할 수 있습니다.",
                        },
                      })}
                      error={!!errors["bookDescription"]}
                      helperText={"최대 1000자까지 입력할 수 있습니다."}
                    />
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCellHead>수량</StyledTableCellHead>
                  <StyledTableCell>
                    <Controller
                      control={control}
                      name={"stockQuantity"}
                      defaultValue={bookData?.stockQuantity || 0}
                      rules={{
                        min: {
                          value: 0,
                          message: "0 이상만 입력 가능합니다.",
                        },
                      }}
                      render={({ field: { onChange } }) => {
                        return (
                          <NumericFormat
                            value={bookData?.stockQuantity || 0}
                            onValueChange={(v) => {
                              onChange(v.value);
                            }}
                            customInput={StyledTextField}
                            variant="standard"
                            thousandSeparator={true}
                            required={true}
                            decimalScale={0}
                            error={!!errors["stockQuantity"]}
                            helperText={"수량은 0 이상이어야 합니다."}
                          />
                        );
                      }}
                    ></Controller>
                  </StyledTableCell>
                </TableRow>
                {bookId && (
                  <>
                    <TableRow>
                      <StyledTableCellHead>생성일시</StyledTableCellHead>
                      <StyledTableCell>
                        {bookData &&
                          format(
                            new Date(bookData?.creationDateTime),
                            "yyyy-MM-dd HH:ii"
                          )}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCellHead>최근 수정일시</StyledTableCellHead>
                      <StyledTableCell>
                        {bookData &&
                          format(
                            new Date(bookData?.updateDateTime),
                            "yyyy-MM-dd HH:ii"
                          )}
                      </StyledTableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </FormProvider>
    </>
  );
}
