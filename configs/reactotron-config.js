import Reactotron from "reactotron-react-native";
import reactotronZustand from 'reactotron-plugin-zustand';
import { useProductStore } from "@/store/product/product-store";

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronZustand({
    stores: [
      { name: 'productStore', store: useProductStore }],
    omitFunctionKeys: true
  }))
  .connect(); // let's connect!