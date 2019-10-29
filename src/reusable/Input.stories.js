import React from "react";
import Input from "./Input";
import { text } from "@storybook/addon-knobs";

//this lables our story
export default { title: "Input" };

function ExampleInput(props) {
  const [value, setValue] = React.useState("");

  return (
    <Input
      id="firstName"
      //enable a knob for a label with a default value of First Name
      label={text("label", "First Name")}
      name="firstName"
      onChange={event => setValue(event.target.value)}
      value={value}
      error={text("error", value)}
      //assign any props passed in to this Input
      {...props}
    />
  );
}

export const defaultExample = () => <ExampleInput />;

export const error = () => <ExampleInput error="First Name is required." />;
