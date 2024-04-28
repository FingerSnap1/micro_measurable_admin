import {useState} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useManagerInfo } from 'src/hooks/useManagerInfo';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function ManagerAddView() {
  const theme = useTheme();

  const { addManagerMutation } = useManagerInfo();

  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const [managerNameState, setManagerNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [nodeAddressState, setNodeAddressState] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch(name) {
        case 'nodeAddress':
            setNodeAddressState(value);
            break;
        case 'managerName':
            setManagerNameState(value);
            break;
        case 'email':
          setEmailState(value);
            break;
        default:
          break;
    }
  };

  const handleCompleteButton = () => {

    const newManager = {
      nodeAddress: nodeAddressState,
      email: emailState,
      managerName: managerNameState,
    };

    addManagerMutation.mutate(newManager);
    router.back();
  };

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>

        <TextField name="managerName" label="관리자 이름" value={managerNameState} onChange={handleChange}/>

        <TextField name="email" label="이메일" value={emailState} onChange={handleChange} />

        <TextField name="nodeAddress" label="노드 번호" value={nodeAddressState} onChange={handleChange} />

      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleBackButton}
        >
            취소
        </LoadingButton>

        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleCompleteButton}
        >
            완료
        </LoadingButton>

        </Stack>

      
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        //   imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">관리자 정보 추가</Typography>

          <Divider sx={{ my: 3 }}>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography> */}
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
