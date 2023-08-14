import { Typography } from "@mui/material";
import React from "react";
import EnhancedTable from "../EnhancedTable/EnhancedTable";

const Panels = () => {


  return (
    <>
      <Typography variant="h3" textAlign={'center'} py={5} pb={5}>
        Panels
      </Typography>
      <EnhancedTable />
    </>
  )
}

export default Panels;