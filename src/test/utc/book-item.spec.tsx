import { render, screen } from "@testing-library/react";
import BookItem from "../../components/book-item";
import React, { Component } from "react";
test("renders learn react link", () => {
  const bookProp = {
    _id: "31324125",
    name: "Minimalism",
  };
  render(<BookItem book={bookProp} />);
  console.log(screen);
});
