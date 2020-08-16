import Vue from "vue";
import { format, parseJSON } from "date-fns";

Vue.filter("dateTime", val => {
  return format(parseJSON(val), "iii, LLL do h:mm aaaa");
});
