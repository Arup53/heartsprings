import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxiosSecure from "../../../../hooks/useAxios";
import { useAuth } from "../../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function MyFavourite() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending, refetch, isSuccess } = useQuery({
    queryKey: [user?.email, "myfavourite"],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecure.get(`/myfavourite/${user?.email}`);
      return data.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await axiosSecure.delete(`/myfavourite/${id}`);
    result;
    refetch();
  };

  if (isSuccess) {
    toast.success("Operation Successful");
  }

  data;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Permanent Address</TableCell>
              <TableCell align="right">Occupation</TableCell>

              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data?.name}
                  </TableCell>
                  <TableCell align="right">{data.bioId}</TableCell>
                  <TableCell align="right">{data.permanent_division}</TableCell>
                  <TableCell align="right">{data.occupation}</TableCell>

                  <TableCell align="right">
                    <button onClick={() => handleDelete(data._id)}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyFavourite;
