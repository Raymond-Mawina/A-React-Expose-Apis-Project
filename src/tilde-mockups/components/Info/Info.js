/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const Info = (props) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetchCommits();
  }, [setCommits]);

  const fetchCommits = async () => {
    const repoCommits = [];
    for (const repo of props.repositories) {
      await axios({
        method: "get",
        url: `https://api.github.com/repos/${props.user}/${repo.name}/commits`,
      }).then((response) => {
        repoCommits.push(response.data);
      });
    }
    setCommits(repoCommits);
  };

  return (
    <Box>
      <Typography textAlign={"center"} fontSize={20} fontWeight={"bold"}>
        {props.user}'s Commit History
      </Typography>

      <Typography textAlign={"center"} fontSize={12} fontWeight={"bold"}>
        These are public commits. Private commits are not part of this
        collection
      </Typography>

      {props.repositories.map((repo) => (
        <Accordion key={repo.name}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container>
              <Grid item xs={4}>
                <Typography sx={{ margin: "auto" }}>{repo.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ margin: "auto" }}>
                  Created On: {repo.created_at.slice(0, 10)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ margin: "auto" }}>
                  Last Pushed On: {repo.pushed_at.slice(0, 10)}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <br />

          <AccordionDetails>
            <Grid container gap={0.9} sx={{ placeContent: "center" }}>
              {commits.map((commit) =>
                commit.map((data) => {
                  return data.comments_url.includes(repo.name) ? (
                    <Grid
                      item
                      xs={3}
                      key={data.comments_url}
                      sx={{ border: "solid" }}
                    >
                      <Typography>
                        Commit Link:
                        <a href={data.html_url}>LINK</a>
                      </Typography>

                      <Typography>
                        Commit Message: {data.commit.message}
                      </Typography>

                      <Typography>
                        Commit By: {data.commit.author.name}
                      </Typography>

                      <Typography>
                        Commit Date: {data.commit.author.date.slice(0, 10)}
                      </Typography>
                    </Grid>
                  ) : undefined;
                })
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Info;
