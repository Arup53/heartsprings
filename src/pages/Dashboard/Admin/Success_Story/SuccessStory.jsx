import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

function SuccessStory() {
  const axiosSecure = useAxiosSecure();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isPending, refetch, isSuccess } = useQuery({
    queryKey: ["successStory"],

    queryFn: async () => {
      const data = await axiosSecure.get(`/success_story`);

      return data.data;
    },
  });

  if (isSuccess) {
    toast.success("Data Fetching Successful");
  }

  data;

  // success_story

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Success Stories</h1>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-white">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Male Biodata Id
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Female Biodata Id
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((story, idx) => (
              <tr
                key={story._id}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b text-sm text-gray-800">
                  {story.self_bioid}
                </td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">
                  {story.partner_bioid}
                </td>
                <td className="py-2 px-4 border-b text-sm">
                  <div>
                    <button
                      onClick={handleOpen}
                      className="px-2 py-1 bg-blue-400 text-white"
                    >
                      View Details
                    </button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="overflow-hidden h-[60vh]  " sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Success Story
                        </Typography>
                        <Typography
                          className="break-words"
                          id="modal-modal-description"
                          sx={{ mt: 2 }}
                        >
                          {story?.story}
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SuccessStory;
