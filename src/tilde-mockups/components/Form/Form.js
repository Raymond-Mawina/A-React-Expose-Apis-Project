import { useState } from "react";
import Info from "../Info/Info";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const Form = () => {
  const [tempUserName, setTempUserName] = useState("");
  const [username, setUsername] = useState("");
  const [formSubmitted, setFormsubmitted] = useState(false);
  const [userExists, setUserExists] = useState(undefined);
  const [repositories, setRepositories] = useState([]);

  const checkIfUserExists = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/users/${username}`,
    })
      .then(() => {
        setUserExists(true);
      })
      .catch((error) => {
        if (error.response && error.response.data.message === "Not Found") {
          setUserExists({ value: false, message: "Not Found" });
        } else {
          setUserExists({
            value: false,
            message: "An Error has occured, try again",
          });
        }
      });
  };

  const fetchRepositories = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/search/repositories?q=user:${username}`,
    }).then((response) => {
      setRepositories(response.data.items);
    });
  };

  return (
    <Box textAlign={"center"}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setFormsubmitted(true);
          setTempUserName(username);
          checkIfUserExists();
          fetchRepositories();
        }}
      >
        <TextField
          type={"text"}
          value={username}
          placeholder="GitHub Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          sx={{ margin: 3 }}
          required
        />

        <Button
          sx={{ margin: 3, padding: 1.77 }}
          variant="contained"
          type="submit"
        >
          Check Repository Progress
        </Button>

        {userExists !== undefined &&
          userExists.value === false &&
          userExists.message === "Not Found" && (
            <Typography sx={{ fontWeight: "bold", color: "blue" }}>
              Error: User {username} does not exist
            </Typography>
          )}

        {formSubmitted && userExists !== undefined && userExists === true && (
          <Info user={tempUserName} repositories={repositories} />
        )}
      </form>
    </Box>
  );
};

export default Form;
