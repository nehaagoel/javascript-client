import React from 'react';
import { Div } from '../../components/TextField/style';
import TextField from '../../components/TextField/TextField';
import Slider from '../../components/Slider/Slider';

export const banners = [
  // ('../../../public/images/default.png'),
  ('../../../public/images/cloud.jpg'),
  ('../../../public/images/dns-server.png'),
  ('../../../public/images/full-stack-web-development.jpg'),
  ('../../../public/images/load-balancer.png'),
];
export const properties = {
  duration: 2000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

function TextFieldDemo() {
  return (
    <>
      <Div>
        {/* <Slider src={banners[0]} altText="Default Banner" /> */}
        <Slider src={banners[0]} altText="Cloud Banner" />
        <Slider src={banners[1]} altText="Dns Server Banner" />
        <Slider src={banners[2]} altText="Full stack web development Banner" />
        <Slider src={banners[3]} altText="Load Balancer Banner" />
        <p><b>This is a Disabled input</b></p>
        <TextField dis arg="Disabled Input" />
        <p><b>A valid input</b></p>
        <TextField arg="Accessible" />
        <p><b>An input with errors</b></p>
        <TextField error arg="101" />
      </Div>
    </>
  );
}
export default TextFieldDemo;
