import React from "react";
import styled from "styled-components";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import InstagramEmbed from 'react-instagram-embed'

const P = styled.p`
  margin: 8px;
`;

function Contact() {
 
  const containerStyle = {
    width: "250px",
    height: "250px",
  };

  const center = {
    lat: 1.3812997,
    lng: 103.7255819,
  };

  const position = {
    lat: 1.3812997,
    lng: 103.7255819,
  };

  return (
    <>
      <h1>Contact us!</h1>
      <P>We are located at The Animal Lodge @ 59 Sungei Tengah Road, Singapore 699014</P>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
      <P>Interested in volunteering? Check out our Instagram <a href = "https://www.instagram.com/theshelterpeople_sg/" target="_blank">@theshelterpeople_sg</a> </P>
      {/* <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}
    </>
  );
}

export default Contact;