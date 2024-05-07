import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import { bgGradient } from 'src/theme/css';


// ----------------------------------------------------------------------

export default function ErrorDataModifyView()  {
  const theme = useTheme();

  const { updateNodeMutation } = useNodeInfo();

  const router = useRouter();
  const routerLocation = useLocation();

  const { id,
    date,
    done,
    errorMsg,
    loraContent,
    errorCause,
    solution } = routerLocation.state || {};

  const [doneState, setDoneState] = useState(done);
  const [errorMsgState, setErrorMsgState] = useState(errorMsg);
  const [loraContentState, setLoraContentState] = useState(loraContent);
  const [errorCauseState, setErrorCauseState] = useState(errorCause);
  const [solutionState, setSolutionState] = useState(solution);
  
  const handleBackButton = () => {
    router.back();
  };


  const handleCompleteButton = () => {

    const newNode = {
        id,
        // nodeAddress,
        // location: locationState,
        // latitude: latitudeState,
        // longitude: longitudeState,
      };

    updateNodeMutation.mutate(newNode);
    router.back();
  };

  const handleChange = (event) => {
    const { name, value, checked} = event.target;
    switch(name) {
        case 'errorCause':
            setErrorCauseState(value);
            break;
        case 'errorMsg':
            setErrorMsgState(value);
            break;
        case 'loraContent':
            setLoraContentState(value);
            break;
        case 'solution':
            setSolutionState(value);
            break;
        case 'done':
            setDoneState(checked);
            break;
        default:
            break;
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>

      <Typography variant="body2" align="right">{ date }</Typography>
      

        <TextField name="errorCause" label="에러 원인" value={errorCauseState} onChange={handleChange}/>
         
        <TextField name="errorMsg" label="에러 메시지" value={errorMsgState} onChange={handleChange}/>
         
        <TextField name="loraContent" label="로라 메시지" value={loraContentState} onChange={handleChange}/>

        <TextField name="solution" label="해결책" value={solutionState} onChange={handleChange}/>

        <Stack direction="row" spacing={2} alignItems="center">
        <Checkbox
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            name="done"
            checked={doneState}
            onChange={handleChange}
        />
          <Typography>파악 완료</Typography>
        
      </Stack>

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
          <Typography variant="h4">에러데이터 수정</Typography>

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