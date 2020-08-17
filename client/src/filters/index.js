import Vue from "vue";
import { format, parseJSON } from "date-fns";

Vue.filter("dateTime", val => {
  return format(parseJSON(val), "iii, LLL do h:mm aaaa");
});

Vue.filter("capitalize", s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
});
