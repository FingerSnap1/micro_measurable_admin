import { Wrapper } from "@googlemaps/react-wrapper";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import googleMapID from 'src/config/googleMapId';

import GoogleMap from 'src/components/map/googleMap';

import AppWidget from "../app-website-visits";
import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        

        <Grid xs={12} md={6} lg={8}>
          <Wrapper apiKey={googleMapID}>
            <GoogleMap options={{ disableDefaultUI: true, zoomControl: false }}/>
          </Wrapper>
        </Grid>

        <Grid container direction="column" spacing={3} xs={12} md={6} lg={4}>
          <Grid item>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>
          <Grid item>
            <AppWidget
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>
        </Grid>

        

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
