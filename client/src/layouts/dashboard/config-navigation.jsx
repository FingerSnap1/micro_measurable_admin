import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'node',
    path: '/node',
    icon: icon('ic_node'),
  },
  {
    title: 'manager',
    path: '/manager',
    icon: icon('ic_user'),
  },
  {
    title: 'raw data',
    path: '/rawData',
    icon: icon('ic_data'),
  },
  {
    title: 'error data',
    path: '/errorData',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
