import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { PER_PAGE } from "../helpers/constants";
import { decodeUser } from "../helpers/decoders";
import {
  createIntern,
  deleteUserById,
  getAllInterns,
} from "../services/interns";
import CustomPagination from "./customPagination.component";
import DataTable from "./table.component";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Intetns() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState(1);
  const [university, setUniversity] = useState("");
  console.log(count);
  const getInterns = async (page, _, search) => {
    setLoading(true);
    const data = await getAllInterns(page, PER_PAGE, search);
    setLoading(false);
    setData(data.data.map((user) => decodeUser(user)));

    setCount(data.recordsFiltered);
  };

  const refreshPage = () => {
    if (data.length === 1 && page > 1) return setPage(page - 1);

    setRefresh(!refresh);
  };

  useEffect(() => {
    getInterns(page, PER_PAGE, search);
  }, [page, search, refresh]);
  const handlePaginationChange = (_, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleDeleteUserById = (id) => {
    return async (_) => {
      setLoading(true);
      await deleteUserById(id);
      setLoading(false);
      refreshPage();
    };
  };
  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      await createIntern({
        firstName,
        lastName,
        email,
        university,
        level,
      });
      setShowCreateModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setUniversity("");
      setLevel(1);

      refreshPage();
    } catch (err) {
      // show snack bar
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            style={{
              marginTop: "20px",
            }}
            fullWidth
            label="search"
            id="fullWidth"
            onChange={handleSearchChange}
            value={search}
          />
        </Grid>
        <Grid
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          item
          xs={4}
        >
          <Fab
            onClick={() => setShowCreateModal(true)}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid xs={12}>
          <DataTable
            loading={loading}
            headers={[
              { name: "First Name" },
              { name: "Last Name" },
              { name: "University" },
              { name: "Level" },
            ]}
            rows={data.map((element) => [
              { content: <p>{element.firstName}</p> },
              { content: <p>{element.lastName}</p> },
              { content: <p>{element.university}</p> },
              { content: <p>{element.level}</p> },
              {
                content: (
                  <Grid spacing={4} container>
                    <Grid item>
                      <IconButton onClick={handleDeleteUserById(element.id)}>
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <EditIcon style={{ color: "orange" }} />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ),
              },
            ])}
          />
        </Grid>
      </Grid>
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,

            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFF",
              borderRadius: 5,
              boxShadow: " 0 0 2em black",
            }}
          >
            <form onSubmit={handleCreateSubmit}>
              <Grid
                alignItems="center"
                justifyContent="center"
                spacing={4}
                style={{
                  padding: 20,
                }}
                container
              >
                <Grid xs={12} item>
                  <Typography variant="h4"> Create intern: </Typography>
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    style={{ width: "100%" }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label="First Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="e-mail"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="University"
                    variant="outlined"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Select
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <MenuItem value={1}>level 1</MenuItem>
                    <MenuItem value={2}>level 2</MenuItem>
                    <MenuItem value={3}>level 3</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{
                      width: "100%",
                    }}
                    variant="contained"
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Modal>
      <CustomPagination
        count={count}
        page={page}
        handleChange={handlePaginationChange}
      />
    </>
  );
}
