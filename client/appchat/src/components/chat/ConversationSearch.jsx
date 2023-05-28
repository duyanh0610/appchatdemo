import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { baseUrl, getRequest } from "../../utils/Service";

const ConversationSearch = () => {
  const { setSearchTerm } = useContext("");
  const handleSearchChange = (e) => {
    updateSearch(e.target.value);
  };
  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="m-2 "
          aria-label="Search"
          onChange={(e) => handleSearchChange(e)}
        />
      </Form>
    </>
  );
};

export default ConversationSearch;
