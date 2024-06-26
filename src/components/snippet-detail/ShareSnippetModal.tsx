import {Autocomplete, Box, Button, Divider, TextField, Typography} from "@mui/material";
import {ModalWrapper} from "../common/ModalWrapper.tsx";
import {useGetUsers} from "../../utils/queries.tsx";
import {useState} from "react";

type ShareSnippetModalProps = {
  open: boolean
  onClose: () => void
  onShare: (userId: string) => void
  loading: boolean
}
export const ShareSnippetModal = (props: ShareSnippetModalProps) => {
  const {open, onClose, onShare, loading} = props
  const {data, isLoading} = useGetUsers(0, 5)
  const [selectedUser, setSelectedUser] = useState<string>()

  function handleSelectUser(newValue: string | null) {
    newValue && setSelectedUser(newValue)
  }
    console.log(data?.content)
  return (
      <ModalWrapper open={open} onClose={onClose}>
        <Typography variant={"h5"}>Share your snippet</Typography>
        <Divider/>
        <Box mt={2}>
          <Autocomplete
              renderInput={(params) => <TextField {...params} label="Type the user's name"/>}
              options={data?.content ?? []}
              getOptionLabel={(option) => option}
              loading={isLoading}
              value={selectedUser}
              onInputChange={(_: unknown, newValue: string | null) => newValue}
              onChange={(_: unknown, newValue: string | null) => handleSelectUser(newValue)}
          />
          <Box mt={4} display={"flex"} width={"100%"} justifyContent={"flex-end"}>
            <Button onClick={onClose} variant={"outlined"}>Cancel</Button>
            <Button disabled={!selectedUser || loading} onClick={() => selectedUser && onShare(selectedUser)} sx={{marginLeft: 2}} variant={"contained"}>Share</Button>
          </Box>
        </Box>
      </ModalWrapper>
  )
}
