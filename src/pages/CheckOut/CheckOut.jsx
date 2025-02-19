import { TextField, Card, CardContent, Grid, Typography } from "@mui/material";
import Payment from "./Payment";
import { useAuth } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";

function CheckOut() {
  const { user } = useAuth();
  const location = useLocation();
  location.state;

  const { BioId } = location.state || {};

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <Card style={{ maxWidth: 450, margin: "20px auto", padding: "20px" }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* First Input Field */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Biodata ID
              </Typography>
              <TextField
                disabled
                id="outlined-basic-1"
                variant="outlined"
                value={BioId}
                fullWidth
              />
            </Grid>

            {/* Second Input Field */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Email
              </Typography>
              <TextField
                disabled
                id="outlined-basic-2"
                label="Enter Email"
                variant="outlined"
                value={user?.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Payment bioObj={location.state} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckOut;
