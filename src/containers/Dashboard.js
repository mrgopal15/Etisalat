import "date-fns";
import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Slider from "@material-ui/core/Slider";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import { ProductData } from "../config";
import TextField from "@material-ui/core/TextField";
import expirygreen from "../assets/images/icons/expirygreen.svg";
import expiryred from "../assets/images/icons/expiryred.svg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FilterIcon from "../assets/images/icons/filter.svg";
import AdminIcon from "../assets/images/icons/admin.svg";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const drawerWidth = 240;

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: "#f3f3f3",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#f3f3f3",
    marginLeft: 0,
  },
}));
// Styles

export default function PersistentDrawerLeft() {
  let history = useHistory();
  useEffect(() => {
    var token = localStorage.getItem("authtoken");
    if (token !== "1") {
      history.push("/");
    }
  }, [history]);

  var productdata = _.sortBy(ProductData, ["price"]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const minPrice = Math.min(...ProductData.map(({ price }) => price));
  const maxPrice = Math.max(...ProductData.map(({ price }) => price));
  const [pricevalue, setPriceValue] = React.useState([minPrice, maxPrice]);
  const [selectedExpiryDate, setselectedExpiryDate] = React.useState(null);

  // Local State Declaration
  const [state, setState] = React.useState({
    data: productdata,
    filterdata: "",
    expiryradio: "all",
  });

  // Local State Declaration

  // Sidebar Section
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Sidebar Section

  // Filter : Product Title Based
  function titleSearchChange(e) {
    const { value } = e.target;
    const lowercasedValue = value.toLowerCase();
    if (
      lowercasedValue !== "" &&
      lowercasedValue !== undefined &&
      lowercasedValue !== null
    ) {
      const filteredData = state.data.filter((el) =>
        el.title.toLowerCase().includes(lowercasedValue)
      );
      setState({ ...state, filterdata: filteredData });
    } else {
      const filteredData = state.data;
      setState({ ...state, filterdata: filteredData });
    }
  }
  // Filter : Product Title Based

  // Filter : Price Based
  const priceChange = (event, newValue) => {
    setPriceValue(newValue);

    const PricefilteredData = _.filter(ProductData, function (item) {
      return item.price >= newValue[0] && item.price <= newValue[1];
    });
    setState({
      ...state,
      filterdata: _.sortBy(PricefilteredData, ["price"]),
      expiryradio: "all",
    });
    setselectedExpiryDate(null);
  };
  // Filter : Price Based

  // Filter : Expiry Date Based
  function expirydatechange(date) {
    setselectedExpiryDate(date);
    const DatefilteredData = _.filter(ProductData, function (item) {
      return _.toString(item.timestamp) <= _.toString(moment(date).format("x"));
    });
    setState({
      ...state,
      filterdata: _.sortBy(DatefilteredData, ["price"]),
      expiryradio: "all"
    });
  }
  // Filter : Expiry Date Based

  function expirycheck(event) {
    if (event.target.value === "all") {
      setState({
        ...state,
        filterdata: "",
        expiryradio: event.target.value,
      });
    } else if (event.target.value === "unexpired") {
      const expiredfilteredData = _.filter(ProductData, function (item) {
        return item.isexpired === 0;
      });
      setState({
        ...state,
        filterdata: _.sortBy(expiredfilteredData, ["price"]),
        expiryradio: event.target.value,
      });
    } else {
      const validfilteredData = _.filter(ProductData, function (item) {
        return item.isexpired === 1;
      });
      setState({
        ...state,
        filterdata: _.sortBy(validfilteredData, ["price"]),
        expiryradio: event.target.value,
      });
    }

  }

  // Sort: Price based Sort
  function pricesorttoggle(event) {
    if (event.target.checked === true) {
      var filterproductdata = _.sortBy(ProductData, ["price"]);
      setState({ ...state, data: _.reverse(filterproductdata) });
    } else {
      var filterproduct = _.sortBy(ProductData, ["price"]);
      setState({ ...state, data: filterproduct });
    }
  }
  // Sort: Price based Sort

  // Filter Clear All Function

  function clearall() {
    setState({ ...state, filterdata: "", expiryradio: "all" });
    setPriceValue([minPrice, maxPrice]);
    setselectedExpiryDate(null);
  }
  // Filter Clear All Function

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="header">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Product Dashboard
          </Typography>
          <Link to="/" className="btn btn-label-brand btn-sm btn-bold">
            <Tooltip title="Logout">
              <ExitToAppIcon />
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="company_info">
            <img src={AdminIcon} alt="company logo" />
            <span className="company_name">Company Logo</span>
          </div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div>
          <div className="filter_div filter_text">
            <span className="filter_head">
              <img src={FilterIcon} alt="filter" />
              Filter
            </span>
            {state.filterdata !== "" &&
            state.filterdata !== undefined &&
            state.filterdata !== null ? (
              <span className="clearalltext" onClick={clearall}>
                Clear All
              </span>
            ) : (
              ""
            )}
          </div>
          <Divider />

          {/* Filter by title */}
          <div className="filter_div">
            <span className="product_head">Filter by Product Title</span>
            <TextField
              id="standard-basic"
              onChange={titleSearchChange}
              label="Filter by Name"
            />
          </div>
          {/* Filter by title */}

          {/* Filter by Price */}
          <div className="filter_div">
            <>
              <span className="product_head">Filter by Price(in AED)</span>
              <Slider
                value={pricevalue}
                onChange={priceChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                className="priceslider"
              />
              <div className="price_notify">
                <span>Min: {pricevalue[0]}</span>
                <span>Max: {pricevalue[1]}</span>
              </div>
            </>
          </div>
          {/* Filter by Price */}

          {/* Filter by Expiry Date */}

          <div className="filter_div">
            <span className="product_head">Filter by Expiry Date</span>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                clearable
                value={selectedExpiryDate}
                placeholder="Select Expiry Date"
                onChange={expirydatechange}
                minDate={new Date()}
                format="dd/MM/yyyy"
              />
            </MuiPickersUtilsProvider>
          </div>
          {/* Filter by Expiry Date */}

          {/* Filter by Expiry Category */}
          <div className="filter_div">
            <span className="product_head">Filter by Expiry Category</span>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={state.expiryradio}
                onChange={expirycheck}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Products"
                />
                <FormControlLabel
                  value="unexpired"
                  control={<Radio />}
                  label="Un Expired Products"
                />
                <FormControlLabel
                  value="expired"
                  control={<Radio />}
                  label="Expired Products"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {/* Filter by Expiry Category */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* Sort Section */}
        <div className="sort_header">
          <div className="text_bold">
            Availble Products{" "}
            {state.filterdata !== "" &&
            state.filterdata !== undefined &&
            state.filterdata !== null
              ? state.filterdata.length
              : state.data.length}{" "}
            of {state.data.length}
          </div>
          <FormControl className="price_toggle">
            <label className="pull-left">Price Low to High</label>
            <Switch
              className="pull-left"
              onChange={pricesorttoggle}
              color="primary"
              value={state.name}
            />
            <label className="pull-left">Price High to Low</label>
            <span className="text_bold">Sort: &nbsp;</span>
          </FormControl>
        </div>
        {/* Sort Section */}
        <Grid container spacing={3}>
          {state.filterdata !== "" &&
          state.filterdata !== undefined &&
          state.filterdata !== null
            ? state.filterdata.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <div className="productarea">
                      <img
                        src={
                          require("../assets/images/" + `${item.filename}`)
                            .default
                        }
                        alt="product_image"
                      />
                      <div className="product_section">
                        <div className="product_title">{item.title}</div>
                        <div className="price_tag">
                          <span>AED: </span>
                          <span>{item.price}</span>
                        </div>
                        <div className="line_through_text">
                          <span className="info_text">AED: </span>
                          <span className="text_bold">
                            {item.originalprice}
                          </span>
                        </div>
                        <div className="expiry_section">
                          <span className="info_text">Expiry Date: </span>
                          <span className="text_bold">{item.ExpiryDate} </span>
                          {item.isexpired === 0 ? (
                            <Tooltip title="Product Unexpired" placement="top">
                              <img src={expirygreen} alt="" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Product Expired" placement="top">
                              <img src={expiryred} alt="" />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : state.data !== "" &&
              state.data !== undefined &&
              state.data !== null
            ? state.data.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <div className="productarea">
                      <img
                        src={
                          require("../assets/images/" + `${item.filename}`)
                            .default
                        }
                        alt="product_image"
                      />
                      <div className="product_section">
                        <div className="product_title">{item.title}</div>
                        <div className="price_tag">
                          <span>AED: </span>
                          <span>{item.price}</span>
                        </div>
                        <div className="line_through_text">
                          <span className="info_text">AED: </span>
                          <span className="text_bold">
                            {item.originalprice}
                          </span>
                        </div>
                        <div className="expiry_section">
                          <span className="info_text">Expiry Date: </span>
                          <span className="text_bold">{item.ExpiryDate} </span>
                          {item.isexpired === 0 ? (
                            <Tooltip title="Product Unexpired" placement="top">
                              <img src={expirygreen} alt="" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Product Expired" placement="top">
                              <img src={expiryred} alt="" />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </main>
    </div>
  );
}
