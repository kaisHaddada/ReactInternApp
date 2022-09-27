import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { PER_PAGE } from "../helpers/constants";

export default function CustomPagination({ page, count, handleChange }) {
  return (
    <Grid
      style={{ position: "absolute", bottom: 0 }}
      justifyContent="center"
      alignContent="center"
      container
    >
      <Grid item xs={12}>
        <Pagination
          onChange={handleChange}
          page={page}
          count={Math.floor(count / PER_PAGE + 1)}
        />
      </Grid>
    </Grid>
  );
}
