// import AccountRoundedIcon from "@mui/icons-material/AccountCircle";
// import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SchoolIcon from '@mui/icons-material/School';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    id: 1,
    icon: <PersonIcon />,
    label: "Users",
    route: "dashboard-users",
  },
  {
    id: 2,
    icon: <VolunteerActivismIcon />,
    label: "Donations",
    route: "dashboard-donations",
  },
  {
    id: 3,
    icon: <BookIcon />,
    label: "Books",
    route: "dashboard-books",
  },
  {
    id: 4,
    icon: <SchoolIcon />,
    label: "Universities",
    route: "dashboard-universities",
  },
  // {
  //   id: 5,
  //   icon: <CategoryRoundedIcon />,
  //   label: "Categories",
  //   route: "dashboard-categories",
  // },
];
