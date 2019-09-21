import "bootstrap/dist/css/bootstrap.min.css";
import "./style";
import "./style/prism-theme.css";
import App from "./components/app";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Nunito:400,700", "sans-serif"]
  }
});

export default App;
